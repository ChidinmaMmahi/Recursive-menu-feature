import { useState } from "react";
import { team } from "./data/team";

const LoadMore = () => {
  const minimumContentLength = 3;
  const [visibleContent, setVisibleContent] = useState(minimumContentLength);
  const contentArray = team.slice(0, visibleContent);

  const randomColor = () => {
    const hexLetters = "0123456789abcdef";
    let hexCode = "#";
    for (let i = 0; i < 6; i++) {
      const letter = hexLetters[Math.floor(Math.random() * hexLetters.length)];
      hexCode += letter;
    }
    return hexCode;
  };

  const handleLoadMore = () => {
    if (visibleContent <= team.length - minimumContentLength) {
      setVisibleContent((prev) => prev + minimumContentLength);
    } else {
      setVisibleContent(team.length);
    }
  };

  const handleShowLess = () => {
    setVisibleContent(minimumContentLength);
  };

  return (
    <div className="">
      <div className="w-full lg:w-[80%] xl:w-[70%] 2xl:[60%] mx-auto flex flex-col items-center">
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-6">
          {contentArray.map((item, i) => (
            <div
              className="bg-white border border-gray-100 shadow-lg rounded-md flex flex-col justify-center 
            items-center px-4 py-6 w-full max-w-[450px]"
              key={i}
            >
              <div
                className="size-24 border border-black/50 rounded-full mb-6 flex justify-center items-center 
                text-3xl text-white text-shadow-2xs"
                style={{ backgroundColor: randomColor() }}
              >
                {item.name[0].toUpperCase()}
              </div>
              <h1 className="text-lg font-bold text-gray-700 mb-2">
                {item.name}
              </h1>
              <h2 className="text-xs font-semibold text-gray-700 mb-1">
                {item.role}
              </h2>
              <p className="text-center text-gray-500 text-sm">{item.about}</p>
              <button
                className="w-full bg-gray-300 py-2.5 rounded mt-4 text-white border border-red-950 
                text-shadow-2xs hover:scale-[1.04] transition-all duration-500 ease-in-out cursor-pointer"
              >
                Connect
              </button>
            </div>
          ))}
        </div>

        <div className="flex justify-center mt-6 space-x-2">
          <button
            onClick={handleLoadMore}
            className={`${
              visibleContent < team.length
                ? " bg-blue-500  cursor-pointer hover:bg-blue-600 transition-all delay-100"
                : "bg-gray-300 opacity-50 cursor-not-allowed"
            } text-sm text-white px-5 py-2.5 rounded `}
          >
            Load More
          </button>
          <button
            onClick={handleShowLess}
            className={`${
              visibleContent <= minimumContentLength
                ? "bg-gray-300 opacity-50 cursor-not-allowed"
                : "bg-green-500 cursor-pointer hover:bg-green-600 transition-all delay-100"
            }  text-sm text-white px-5 py-2.5 rounded `}
          >
            Show Less
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoadMore;
