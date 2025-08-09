import type { ChangeEvent, FormEvent, KeyboardEvent } from "react";
import { useEffect, useState } from "react";
import { GoHeart, GoHeartFill } from "react-icons/go";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { IoWarning } from "react-icons/io5";
import "../Accordion.css";

type MathFact = {
  text: string;
  number: number;
  found: boolean;
  type: string;
};

export const MathTrivia = () => {
  const [isOpen, setIsOpen] = useState<boolean>(true);
  const [fact, setFact] = useState<MathFact | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [theValue, setTheValue] = useState<string>("1");
  const [isWrongInput, setIsWrongInput] = useState<boolean>(false);
  const [isFavourite, setIsFavourite] = useState<boolean>(false);
  const [showFavourite, setShowFavourite] = useState<boolean>(false);
  const [favouriteFacts, setFavouriteFacts] = useState<MathFact[]>([]);

  const Icon = isFavourite ? GoHeartFill : GoHeart;

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value)) {
      if (value === "" || (Number(value) >= 0 && Number(value) <= 1000)) {
        setInputValue(value);
        setIsWrongInput(false);
      } else {
        setIsWrongInput(true);
      }
    }
  };

  const handleSave = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue === "") {
      setIsWrongInput(true);
      return;
    }

    setTheValue(inputValue);
    setInputValue("");
  };

  const handleKeydown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      if (inputValue === "") {
        setIsWrongInput(true);
        return;
      }
      setTheValue(inputValue);
      setInputValue("");
    }
  };

  const toggleFavorite = (factItem: MathFact) => {
    const isAlreadySaved = favouriteFacts.some(
      (item) => item.text === factItem.text && item.number === factItem.number
    );

    if (isAlreadySaved) {
      setFavouriteFacts((prev) =>
        prev.filter(
          (item) =>
            !(item.text === factItem.text && item.number === factItem.number)
        )
      );
      setIsFavourite(false);
    } else {
      setFavouriteFacts((prev) =>
        [...prev, factItem].sort((a, b) => a.number - b.number)
      );
      setIsFavourite(true);
      setShowFavourite(true);
    }
  };

  const fetchRandomFact = async () => {
    const randomNumber = Math.floor(Math.random() * 1000 + 1);
    setIsLoading(true);
    try {
      const res = await fetch(
        `http://numbersapi.com/${randomNumber}/math?json`
      );
      const data: MathFact = await res.json();
      setFact(data);
      setTheValue(data.number.toString());
    } catch {
      setIsError(true);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (!theValue) return;
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(`http://numbersapi.com/${theValue}/math?json`);
        const data: MathFact = await res.json();
        setFact(data);
      } catch {
        setIsError(true);
        console.error("API error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [theValue]);

  useEffect(() => {
    if (isWrongInput) {
      const timer = setTimeout(() => setIsWrongInput(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [isWrongInput]);

  useEffect(() => {
    if (showFavourite) {
      const timer = setTimeout(() => setShowFavourite(false), 1000);
      return () => clearTimeout(timer);
    }
  }, [showFavourite]);

  useEffect(() => {
    if (!fact) return;
    const isSaved = favouriteFacts.some(
      (item) => item.text === fact.text && item.number === fact.number
    );
    setIsFavourite(isSaved);
  }, [fact, favouriteFacts]);

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center">
        <div className="loader"></div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex flex-col justify-center items-center">
        <p className="mb-2.5 text-red-900">
          Sorry, can't reach the API now. Please try again later.
        </p>
        <button
          className="accordion-button"
          onClick={() => {
            setIsError(false);
            window.location.reload();
          }}
        >
          Reload Page
        </button>
      </div>
    );
  }

  return (
    <section className="flex justify-center">
      <div className="flex flex-col items-center w-full max-w-[600px]">
        <h1 className="text-3xl lg:text-4xl mb-5">Every Number Has a Story</h1>
        <div>
          <form
            onSubmit={handleSave}
            className="flex flex-col text-center space-y-10 w-full"
          >
            <label htmlFor="inputBox" className="text-gray-200">
              Type in any number from 0–1000 and uncover an interesting
              mathematical fact you’ve never heard before.
            </label>
            <div className="w-full flex border border-green-800 rounded-full">
              <input
                type="text"
                id="inputBox"
                value={inputValue}
                onChange={handleInputChange}
                onKeyDown={handleKeydown}
                inputMode="numeric"
                pattern="[0-9]*"
                className="w-full focus:border-0 outline-0 px-3 rounded-l-full"
              />
              <button
                type="submit"
                disabled={inputValue === "" || isWrongInput}
                className="accordion-button rounded-r-full"
              >
                Enter
              </button>
            </div>
          </form>
          {isWrongInput && (
            <div className="flex items-center space-x-2 mt-1">
              <IoWarning className="text-red-800 text-lg" />
              <p className="text-xs lg:text-sm text-red-800">
                Sorry, you can only enter numbers from 0 - 1000
              </p>
            </div>
          )}
        </div>

        <article className="w-full">
          <div
            className="pt-1.5 px-5 pb-2.5 rounded border border-white/50 bg-white/15 mt-10"
            key={`${fact?.number} - ${fact?.text}`}
          >
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">
                The Math Behind "{fact?.number}"
              </h3>
              <div
                onClick={() => setIsOpen(!isOpen)}
                className="cursor-pointer"
              >
                {isOpen ? <IoIosArrowUp /> : <IoIosArrowDown />}
              </div>
            </div>
            {isOpen && fact && (
              <div>
                <p className="text-[#f5deb3e3] mt-3">{fact.text}</p>
                <div className="flex justify-end mt-1">
                  <Icon
                    className={`text-xl cursor-pointer ${
                      isFavourite ? "text-red-700" : ""
                    }`}
                    onClick={() => toggleFavorite(fact)}
                  />
                </div>
              </div>
            )}
          </div>
          {showFavourite && (
            <p className="text-end text-xs text-red-800">
              Added to Favourites!
            </p>
          )}
        </article>

        <button
          className="accordion-button mt-3 text-xs text-blue-200"
          onClick={fetchRandomFact}
        >
          Random Fact
        </button>

        {favouriteFacts.length > 0 && (
          <div className="mt-10 w-full">
            <h2 className="text-xl font-semibold mb-3">Favourite Facts</h2>
            <ul className="space-y-2">
              {favouriteFacts.map((fav, index) => (
                <li
                  key={`${fav.number}-${index}`}
                  className="bg-white/10 p-3 rounded border border-white/20 flex justify-between items-center"
                >
                  <div>
                    <span className="text-blue-300 font-medium">
                      #{fav.number}:
                    </span>{" "}
                    {fav.text}
                  </div>
                  <GoHeartFill
                    className="text-red-700 cursor-pointer"
                    onClick={() => toggleFavorite(fav)}
                  />
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};
