import requests
from datetime import date, datetime
from prefect import flow, task, get_run_logger
from prefect.blocks.system import Secret
import json


@task
def get_bamboo_credentials():
    """Loads credentials securely from Prefect Blocks."""
    logger = get_run_logger()
    logger.info("Loading credentials from Prefect Blocks...")

    api_key_block = Secret.load("pto-patrol")

    # Return the actual values stored in the blocks
    return {
        "api_key": api_key_block.get(),
    }


@task
def get_employee_departments(api_key: str) -> dict:
    """
    Fetches all employees and returns a mapping of employee ID to department.
    """
    logger = get_run_logger()
    logger.info("Fetching employee directory...")

    url = "https://stears.bamboohr.com/api/v1/employees/directory"
    headers = {
        "Accept": "application/json"
    }
    response = requests.get(url, headers=headers, auth=(api_key, 'x'))
    response.raise_for_status()
    employees_data = response.json()

    department_mapping = {}
    for employee in employees_data.get('employees', []):
        department_mapping[employee['id']] = employee.get('department', 'N/A')

    return department_mapping


@task
def get_leave_types(api_key: str, department_mapping: dict) -> list:
    """
    Fetches the leave type for each leave request and includes the department.
    """
    logger = get_run_logger()
    logger.info("Fetching leave types...")

    today = date.today()
    start_date = today
    end_date = today

    url = f"https://stears.bamboohr.com/api/v1/time_off/requests/?start={start_date}&end={end_date}"
    headers = {
        "Accept": "application/json"
    }
    response = requests.get(url, headers=headers, auth=(api_key, 'x'))
    response.raise_for_status()
    time_off_requests = response.json()
    leave_details = {}
    for request in time_off_requests:
        if request['status']['status'] == 'approved':
            request_id = request['id']
            if request_id not in leave_details:
                leave_details[request_id] = []

            employee_id = str(request['employeeId'])
            department = department_mapping.get(employee_id, 'Unknown Department')

            leave_details[request_id].append({
                "name": request['name'],
                "start": request['start'],
                "end": request['end'],
                "type": request['type']['name'],
                "employee_id": employee_id,
                "department": department
            })
    print(json.dumps(leave_details, indent=4))
    return leave_details


@task
def format_leave_message(leave_details: dict) -> str:
    """Formats the leave data into a readable message for Google Chat."""
    logger = get_run_logger()

    if not leave_details:
        logger.info("No one is on leave today.")
        return "Who's Out Today?\n\nAll hands on deck! No one is on leave today."

    message_lines = ["Who's Out Today?"]
    today = date.today().isoformat()

    on_leave_today = []
    for employee_id, leaves in leave_details.items():
        # Iterate over each leave entry for an employee
        for entry in leaves:
            # Check if the leave period includes today
            if entry.get('start') and entry.get('end') and entry['start'] <= today <= entry['end']:
                entry['employee_id'] = employee_id  # Adding employee_id to entry for reference
                on_leave_today.append(entry)

    if not on_leave_today:
        logger.info("Found leave entries, but no one is out today.")
        return "Who's Out Today?\n\nAll hands on deck! No one is on leave today."

    # Formatting the message for each person on leave
    for entry in on_leave_today:
        employee_name = entry.get('name', 'Unknown Employee')  # Placeholder if ID is not available
        leave_type = entry.get('type', 'Unknown Leave Type')  # Leave type (e.g., Annual Leave)
        department = entry.get('department', 'N/A')

        start_date_str = entry.get('start')
        end_date_str = entry.get('end')

        # Convert date strings to the desired format
        try:
            # New format: '%A, %d %B %Y' (e.g., Friday, 15 August 2025)
            formatted_start_date = datetime.strptime(start_date_str, '%Y-%m-%d').strftime('%A, %d %B %Y')
            formatted_end_date = datetime.strptime(end_date_str, '%Y-%m-%d').strftime('%A, %d %B %Y')
        except (ValueError, TypeError):
            # Fallback to original format if parsing fails
            formatted_start_date = start_date_str
            formatted_end_date = end_date_str

        message_lines.append(f"\n- {employee_name} ({department} - {leave_type})")
        message_lines.append(f"  - Period: {formatted_start_date} to {formatted_end_date}")

    logger.info(f"Formatted message for {len(on_leave_today)} people on leave.")
    return "\n".join(message_lines)


@task
def post_to_google_chat(message: str, webhook_name: str):
    """Posts the formatted message to a Google Chat webhook loaded from a Prefect Block."""
    logger = get_run_logger()

    try:
        webhook_block = Secret.load(webhook_name)
        webhook_url = webhook_block.get()

        headers = {"Content-Type": "application/json; charset=UTF-8"}
        payload = {"text": message}

        response = requests.post(webhook_url, json=payload, headers=headers)
        response.raise_for_status()
        logger.info(f"Successfully posted message to '{webhook_name}'.")
    except Exception as e:
        logger.error(f"Failed to post to '{webhook_name}': {e}", exc_info=True)
        raise


@flow(name="Test Whos Out Function", log_prints=True)
def whos_out_flow():
    """
    A flow to test fetching 'Who's Out' data from BambooHR.
    """
    print("--- Starting the test flow ---")

    try:
        # Step 1: Get the credentials
        credentials = get_bamboo_credentials()
        api_key = credentials["api_key"]

        # Step 2: Get the employee to department mapping
        department_mapping = get_employee_departments(api_key=api_key)

        # Step 3: Get the leave types, now with department info
        leave_data_with_types = get_leave_types(api_key=api_key, department_mapping=department_mapping)

        # Step 4: Format the message
        message = format_leave_message(leave_data_with_types)

        # Step 5: Print the result for verification and post
        print("\n--- Successfully retrieved data ---")
        print(message)
        print("\n--- Test flow finished ---")
        general_webhook_name = "whos-out-general"
        post_to_google_chat(message, general_webhook_name)
        stakeholders_webhook_name = "whos-out-stakeholders"
        post_to_google_chat(message, stakeholders_webhook_name)

    except Exception as e:
        print(f"\n--- An error occurred during the test flow ---")
        print(f"Error: {e}")


whos_out_deployment = whos_out_flow.to_deployment(
    name='Report Who is Out of Office FLow', cron="00 10 * * 1-5")

if __name__ == "__main__":
    # This will run the Prefect flow
    whos_out_flow()