import { useEffect, useRef, useState } from "react";

const useCategoryLanding = (categoryData = []) => {
  const [activeCategoryId, setActiveCategoryId] = useState(null);

  useEffect(() => {
    if (categoryData.length > 0) {
      setActiveCategoryId(categoryData[0].id);
    }
  }, [categoryData]);

  const divRef = useRef();
  const isMouseDown = useRef(false);
  const startX = useRef(0);
  const scrollLeft = useRef(0);

  const handleMouseDown = (e) => {
    isMouseDown.current = true;
    divRef.current?.classList.add("active");
    startX.current = e.pageX - divRef.current?.offsetLeft;
    scrollLeft.current = divRef.current?.scrollLeft;
  };

  const handleMouseLeave = () => {
    isMouseDown.current = false;
    divRef.current?.classList.remove("active");
  };

  const handleMouseUp = () => {
    isMouseDown.current = false;
    divRef.current?.classList.remove("active");
  };

  const handleMouseMove = (e) => {
    if (!isMouseDown.current) return;
    e.preventDefault();
    const x = e.pageX - divRef.current.offsetLeft;
    const walk = (x - startX.current) * 2;
    divRef.current.scrollLeft = scrollLeft.current - walk;
  };

  const handleScrollToBlock = (categoryId) => {
    setActiveCategoryId(categoryId);
    document.getElementById(categoryId)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return {
    activeCategoryId,
    setActiveCategoryId,
    divRef,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
    handleScrollToBlock,
  };
};

export default useCategoryLanding;
