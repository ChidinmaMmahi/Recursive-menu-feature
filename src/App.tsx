import { BrowserRouter as Router } from "react-router-dom";
import Header from "./component/Header";
import RecursiveMenu from "./component/RecursiveMenu";
import menu from "./data/menu";
import ProjectRouter from "./routes/ProjectRouter";

function App() {
  const sideBarWidth = "20%";
  return (
    <Router>
      <div
        className={`hidden md:block bg-gray-900 fixed top-0 bottom-0 left-0 w-[${sideBarWidth}] border-r border-r-black overflow-y-scroll`}
      >
        {menu.map((item, idx) => (
          <RecursiveMenu key={idx} item={item} />
        ))}
      </div>
      <div className={`md:ml-[${sideBarWidth}] md:w-[80%] text-white`}>
        <div className={`fixed top-0 right-0 left-0 md:left-[${sideBarWidth}]`}>
          <Header />
        </div>
        <div className="mt-16 py-10 px-2 ">
          <ProjectRouter />
        </div>
      </div>
    </Router>
  );
}

export default App;
