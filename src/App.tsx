import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Header from "./component/Header";
import NotFoundPage from "./component/NotFoundPage";
import QrCodeGenerator from "./component/QRCodeGenerator/QRCodeGenerator";
import RecursiveMenu from "./component/RecursiveMenu";
import Yolo from "./component/Yolo";
import menu from "./data/menu";

function App() {
  return (
    <Router>
      <div className="bg-gray-900 fixed top-0 bottom-0 left-0 w-[20%] border-r border-r-black">
        {menu.map((item, idx) => (
          <RecursiveMenu key={idx} item={item} />
        ))}
      </div>
      <div className="ml-[20%] w-[80%] text-white">
        <Header />
        <div className="py-10 px-2 ">
          <Routes>
            <Route path="/QRCodeGenerator.tsx" element={<QrCodeGenerator />} />
            <Route path="/Yolo.tsx" element={<Yolo />} />
            <Route path="/NotFoundPage.tsx" element={<NotFoundPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
