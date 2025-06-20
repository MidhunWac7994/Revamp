import { useEffect, useRef } from "react";

const useCategoryBody = ({ title, setActive }) => {
  const targetRef = useRef(null);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(title); // Set the active section
            const activeButton = document.querySelector(
              `[data-title="${title}"]`
            );
            if (activeButton) {
              activeButton.scrollIntoView({
                behavior: "smooth",
                block: "nearest",
                inline: "center",
              });
            }
          }
        });
      },
      { threshold: 0.5, rootMargin: "100px" }
    );

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) observer.unobserve(targetRef.current);
    };
  }, [title]); // Include title in the dependency array

  return { targetRef };
};

export default useCategoryBody;
