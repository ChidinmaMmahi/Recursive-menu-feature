type SearchInputProps = {
  id?: string;
  placeholder?: string;
  value: string;
  buttonLabel: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onFocus?: () => void;
  disabled?: boolean;
  inputMode?:
    | "search"
    | "email"
    | "tel"
    | "text"
    | "url"
    | "none"
    | "numeric"
    | "decimal";
  pattern?: string;
  extraClassNameInput?: string;
  extraClassNameButton?: string;
};

export const SearchInput = ({
  id,
  value,
  placeholder,
  onChange,
  onKeyDown,
  disabled,
  buttonLabel,
  inputMode,
  pattern,
  extraClassNameInput,
  extraClassNameButton,
}: SearchInputProps) => {
  return (
    <div className="w-full flex border border-green-800 rounded-full">
      <input
        type="text"
        placeholder={placeholder}
        id={id}
        value={value}
        onChange={onChange}
        onKeyDown={onKeyDown}
        inputMode={inputMode}
        pattern={pattern}
        className={`w-full focus:border-0 outline-0 px-3 rounded-l-full ${extraClassNameInput}`}
      />
      <button
        type="submit"
        disabled={value === "" || disabled}
        className={`accordion-button rounded-r-full ${extraClassNameButton}`}
      >
        {buttonLabel}
      </button>
    </div>
  );
};
