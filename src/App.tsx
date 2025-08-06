import "./App.css";
import RecursiveMenu from "./component/RecursiveMenu";
import menu from "./data/menu";

function App() {
  return (
    <>
      <div className="bg-gray-900 fixed top-0 bottom-0 left-0 w-[20%]">
        {menu.map((item, idx) => (
          <RecursiveMenu key={idx} item={item} />
        ))}
      </div>
      {/* <div className="fixed top-0 bottom-0 left-[20%] w-[80%] text-white">
        <Yolo />
      </div> */}
    </>
  );
}

export default App;
