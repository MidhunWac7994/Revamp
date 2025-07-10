import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const usePriceSlider = (
  priceOptions,
  isMobileFilter,
  handleSelectedFilterMobile
) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const rawMin = Number(priceOptions?.min);
  const rawMax = Number(priceOptions?.max);

  const min = isNaN(rawMin) ? 0 : Math.max(0, rawMin);

  const max =
    isNaN(rawMax) || rawMin === rawMax
      ? Math.ceil((isNaN(rawMax) ? 0 : rawMax) + 0.1)
      : rawMax;

  const [range, setRange] = useState({ min, max });

  useEffect(() => {
    const priceParam = searchParams.get("price");
    if (priceParam) {
      const [minPrice, maxPrice] = priceParam.split(",").map(Number);
      const safeMin = isNaN(minPrice) ? min : minPrice;
      const safeMax = isNaN(maxPrice) ? max : maxPrice;
      setRange({ min: safeMin, max: safeMax });
    } else {
      setRange({ min, max });
    }
  }, [searchParams, min, max]);

  const handleSlide = (newRange) => {
    const newMinPrice = newRange?.[0] ?? min;
    const newMaxPrice = newRange?.[1] ?? max;

    if (newMinPrice < newMaxPrice) {
      setRange({ min: newMinPrice, max: newMaxPrice });
    }
  };

  const handleChangeComplete = (newRange) => {
    const newMinPrice = newRange?.[0] ?? min;
    const newMaxPrice = newRange?.[1] ?? max;

    if (newMinPrice < newMaxPrice) {
      if (isMobileFilter) {
        handleSelectedFilterMobile("price", [newMinPrice, newMaxPrice]);
      } else {
        searchParams.delete("page");
        searchParams.set("price", `${newMinPrice},${newMaxPrice}`);
        setSearchParams(searchParams);
      }
    }
  };

  return { range, min, max, handleChangeComplete, handleSlide };
};

export default usePriceSlider;
