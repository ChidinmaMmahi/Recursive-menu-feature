import { useState } from "react";
import { FaStar } from "react-icons/fa6";

const StarRating = () => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <main className="flex flex-col justify-center items-center">
      <div className="sm:bg-gray-100 rounded-md flex flex-col gap-y-4 sm:border py-10 sm:px-16">
        <div className="flex gap-x-1.5 ">
          {[1, 2, 3, 4, 5].map((star) => (
            <span
              key={star}
              className={`cursor-pointer text-3xl ${
                rating >= star
                  ? "text-yellow-500"
                  : hoverRating >= star
                  ? "text-yellow-500/40"
                  : "text-gray-300"
              }`}
              onClick={() => setRating(star)}
              onMouseEnter={() => setHoverRating(star)}
              onMouseLeave={() => setHoverRating(0)}
            >
              <FaStar />
            </span>
          ))}
        </div>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm mt-4 cursor-pointer hover:bg-blue-600 transition-all duration-300"
          onClick={() => {
            setRating(0);
            setHoverRating(0);
          }}
        >
          Reset Rating
        </button>
      </div>
    </main>
  );
};

export default StarRating;
