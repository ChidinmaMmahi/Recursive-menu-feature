import { BrowserRouter as Router } from "react-router-dom";
import Header from "./component/Header";
import RecursiveMenu from "./component/RecursiveMenu";
import menu from "./component/RecursiveMenu/menu";
import ProjectRouter from "./routes/ProjectRouter";
import { useTheme } from "./shared/useTheme";

function App() {
  const { darkMode, toggleTheme } = useTheme();
  const sideBarWidth = "20%";
  return (
    <Router>
      <div
        className={`hidden md:block bg-secondary fixed top-0 bottom-0 left-0 border-r border-primary overflow-y-scroll`}
        style={{ width: sideBarWidth }}
      >
        {menu.map((item, idx) => (
          <RecursiveMenu key={idx} item={item} />
        ))}
      </div>
      <div className={`md:ml-[20%] md:w-[80%] text-primary`}>
        <div className={`fixed top-0 right-0 left-0 md:left-[20%]`}>
          <Header toggleTheme={toggleTheme} darkMode={darkMode} />
        </div>
        <div className="mt-16 py-10 px-2">
          <ProjectRouter />
        </div>
      </div>
    </Router>
  );
}

export default App;
