import { useState } from "react";

const getRandomColor = () => {
  const letters = "0123456789ABCDEF";
  let color = "#";
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const RandomColorGenerator = () => {
  const [color, setColor] = useState(getRandomColor());

  const handleGenerate = () => {
    setColor(getRandomColor());
  };
  return (
    <div
      className="flex flex-col items-center justify-center max-w-md  mx-auto p-10 rounded-lg"
      style={{ backgroundColor: color }}
    >
      <div className="bg-white/80 rounded-2xl shadow-md p-6 text-center">
        <h1 className="text-xl sm:text-2xl font-semibold mb-4 text-black">
          🎨 Random Color Generator
        </h1>
        <div
          className="w-48 h-24 rounded-lg mx-auto border border-black"
          style={{ backgroundColor: color }}
        ></div>
        <p className="mt-4 text-lg font-mono text-black">{color}</p>
        <button
          onClick={handleGenerate}
          className="mt-6 px-6 py-2 text-sm sm:text-base cursor-pointer rounded-full bg-black text-white hover:bg-gray-800 transition"
        >
          Generate New Color
        </button>
      </div>
    </div>
  );
};

export default RandomColorGenerator;
