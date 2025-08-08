import { useState } from "react";

const ImageSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  const images = ["red", "blue", "green", "yellow", "purple", "pink", "orange"];

  return (
    <div className="flex justify-center items-center">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-full max-w-md h-[300px] overflow-hidden rounded-lg shadow-lg">
          <div
            className="flex w-full h-full transition-transform duration-700 ease-in-out"
            style={{ transform: `translateX(-${currentIndex * 100}%)` }}
          >
            {images.map((color, i) => (
              <div
                key={i}
                className="w-full h-full flex-shrink-0 flex items-center justify-center text-white font-bold text-2xl"
                style={{ backgroundColor: color }}
              >
                Slide {i + 1}
              </div>
            ))}
          </div>

          <button
            onClick={handlePrev}
            className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full w-10 h-10 flex 
            items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
          >
            ←
          </button>
          <button
            onClick={handleNext}
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full w-10 h-10 flex 
            items-center justify-center shadow-lg transition-all duration-200 hover:scale-110"
          >
            →
          </button>
        </div>

        <div className="flex gap-2">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrentIndex(i)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                i === currentIndex
                  ? "bg-blue-500 scale-125"
                  : "bg-gray-300 hover:bg-gray-400"
              }`}
            />
          ))}
        </div>

        <div className="text-sm text-gray-600">
          {currentIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
};

export default ImageSlider;
