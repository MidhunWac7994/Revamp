import { useRef } from "react";

const useIntersectionObserver = ({
  loading,
  itemsLength,
  totalCount,
  isReachingEnd,
  isValidating,
  setSize,
  size,
}) => {
  const observer = useRef();

  const intersection = (node) => {
    if (loading || itemsLength === totalCount || !itemsLength) {
      return;
    } else {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(
        (entries) => {
          if (entries[0]?.isIntersecting) {
            if (!isReachingEnd) {
              if (!isValidating) {
                setSize?.(size + 1);
              }
            }
          }
        },
        { threshold: 0.8 }
      );
      if (node) observer.current.observe(node);
    }
  };

  return { intersection };
};

export default useIntersectionObserver;
