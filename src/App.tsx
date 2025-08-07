import { BrowserRouter as Router } from "react-router-dom";
import Header from "./component/Header";
import RecursiveMenu from "./component/RecursiveMenu";
import menu from "./data/menu";
import ProjectRouter from "./routes/ProjectRouter";

function App() {
  return (
    <Router>
      <div className="hidden md:block bg-gray-900 fixed top-0 bottom-0 left-0 w-[20%] border-r border-r-black overflow-y-scroll">
        {menu.map((item, idx) => (
          <RecursiveMenu key={idx} item={item} />
        ))}
      </div>
      <div className="md:ml-[20%] md:w-[80%] text-white">
        <Header />
        <div className="py-10 px-2 ">
          <ProjectRouter />
        </div>
      </div>
    </Router>
  );
}

export default App;
