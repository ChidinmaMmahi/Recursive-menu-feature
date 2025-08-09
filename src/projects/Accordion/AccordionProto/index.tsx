import { useEffect, useRef, useState } from "react";
import { IoIosArrowDown } from "react-icons/io";
import "../Accordion.css";
import "./AcordionProto.css";

interface Comment {
  postId: number;
  id: number;
  name: string;
  email: string;
  body: string;
}

export const Accordion = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [facts, setFacts] = useState<Comment[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isError, setIsError] = useState<boolean>(false);
  const [refresh, setRefresh] = useState<boolean>(false);

  const accordionRef = useRef<HTMLDivElement | null>(null);
  const accordionRefContainer = useRef<HTMLDivElement | null>(null);

  {
    /*useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        accordionRef.current &&
        accordionRefContainer.current &&
        !accordionRefContainer.current.contains(e.target as Node)
      ) {
        setOpenIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []); */
  }

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://jsonplaceholder.typicode.com/comments"
        );
        const data: Comment[] = await res.json();
        setFacts(data);
      } catch {
        setIsError(true);
        console.error("API error");
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return (
      <div className="loader-container">
        <p>Loading</p>
        <div className="loader"></div>
      </div>
    );
  }

  return (
    <div
      ref={accordionRefContainer}
      className="flex flex-col items-center space-y-5"
    >
      {facts.slice(0, 6).map((fact, idx) => (
        <article
          className="accordion-card"
          ref={openIndex === idx ? accordionRef : null}
          key={fact.id}
        >
          <div className="accordion-head">
            <h3>{fact.email}</h3>
            <div
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="dropdown"
            >
              <IoIosArrowDown />
            </div>
          </div>
          {openIndex === idx && (
            <p className="accordion-details">{fact.body}</p>
          )}
        </article>
      ))}

      {isError && (
        <div className="error-container">
          <p>Sorry, can't reach the API now. Please try again later.</p>
          <button
            onClick={() => {
              setIsError(false);
              setRefresh(true);
            }}
            className="accordion-button"
          >
            OK
          </button>
        </div>
      )}

      {refresh && (
        <button
          onClick={() => {
            window.location.reload();
          }}
          className="accordion-button"
        >
          Reload Page
        </button>
      )}
    </div>
  );
};
