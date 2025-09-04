import { Route, Routes } from "react-router-dom";
import NotFoundPage from "../component/NotFoundPage";
import Yolo from "../component/Yolo";
import { Accordion } from "../projects/Accordion/AccordionProto";
import { MathTrivia } from "../projects/Accordion/MathTrivia";
import ImageSlider from "../projects/ImageSlider";
import LoadMoreFeature from "../projects/LoadMoreFeature";
import QRCodeGenerator from "../projects/QRCodeGenerator/";
import RandomColorGenerator from "../projects/RandomColorGenerator";
import StarRating from "../projects/StarRatingSystem";
import ScrollIndicator from "../projects/ScrollIndicator";

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
      <Route path="/AccordionSample" element={<Accordion />} />
      <Route path="/MathTrivia" element={<MathTrivia />} />
      <Route path="/ScrollIndicator" element={<ScrollIndicator />} />
    </Routes>
  );
};

export default ProjectRouter;
