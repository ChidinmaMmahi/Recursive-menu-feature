import { BrowserRouter as Router } from "react-router-dom";
import Header from "./component/Header";
import RecursiveMenu from "./component/RecursiveMenu";
import menu from "./component/RecursiveMenu/menu";
import ProjectRouter from "./routes/ProjectRouter";
import { useTheme } from "./shared/useTheme";

function App() {
  const { darkMode, toggleTheme, toggleDark, toggleLight } = useTheme();
  const sideBarWidth = "20%";
  return (
    <Router>
      <div
        className={`hidden md:block bg-secondary fixed top-16 bottom-0 left-0 border-r border-primary overflow-y-scroll`}
        style={{ width: sideBarWidth }}
      >
        {menu.map((item, idx) => (
          <RecursiveMenu key={idx} item={item} />
        ))}
      </div>
      
      <div className={`text-primary`}>
        <div className={`fixed top-0 right-0 left-0`}>
          <Header toggleTheme={toggleTheme} toggleDark={toggleDark} toggleLight={toggleLight} darkMode={darkMode} />
        </div>
        <div className="md:ml-[20%] md:w-[80%]  mt-16 py-10 px-2">
          <ProjectRouter />
        </div>
      </div>
    </Router>
  );
}

export default App;
