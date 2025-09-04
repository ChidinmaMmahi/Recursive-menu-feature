import { useEffect, useState } from "react";

const ScrollIndicator = () => {
  const [scrollPercentage, setScrollPercentage] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrolled =
        (window.scrollY /
          (document.documentElement.scrollHeight - window.innerHeight)) *
        100;

      setScrollPercentage(scrolled);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <div className="">
        <div className="h-3 bg-secondary border-t border-primary fixed left-0 right-0 bottom-0">
          <div
            className="h-full bg-blue-500/50"
            style={{ width: `${scrollPercentage}%` }}
          />
        </div>

        <div className="text-center">
          {Array.from({ length: 100 }).map((_, index) => (
            <div key={index}>
              Hello, this is a scroll indicator test {index}
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ScrollIndicator;
