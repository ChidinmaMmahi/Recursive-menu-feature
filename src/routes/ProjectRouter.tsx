import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../component/NotFoundPage";
import Yolo from "../component/Yolo";
import ImageSlider from "../projects/ImageSlider";
import LoadMoreFeature from "../projects/LoadMoreFeature";
import QRCodeGenerator from "../projects/QRCodeGenerator/";
import RandomColorGenerator from "../projects/RandomColorGenerator";
import StarRating from "../projects/StarRatingSystem";

const ProjectRouter = () => {
  return (
    <Routes>
      <Route path="/QRCodeGenerator" element={<QRCodeGenerator />} />
      <Route path="/Yolo" element={<Yolo />} />
      <Route path="/NotFoundPage" element={<NotFoundPage />} />
      <Route path="/RandomColorGenerator" element={<RandomColorGenerator />} />
      <Route path="/StarRatingSystem" element={<StarRating />} />
      <Route path="/LoadMoreFeature" element={<LoadMoreFeature />} />
      <Route path="/ImageSlider" element={<ImageSlider />} />
    </Routes>
  );
};

export default ProjectRouter;
