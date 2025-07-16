
import { useState, useEffect } from "react";

const useFilterSidebar = (initialFilters, aggregations, onFilterChange) => {
  const [filters, setFilters] = useState(initialFilters || {});
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [openItem, setOpenItem] = useState(null);
  const [visibleCounts, setVisibleCounts] = useState({});

  useEffect(() => {
    setFilters(initialFilters || {});
    if (initialFilters?.price?.[0]) {
      const [min, max] = initialFilters.price[0].split("_").map(Number);
      setPriceRange([min, max]);
    }
  }, [initialFilters]);

  useEffect(() => {
    const debounce = setTimeout(() => {
      onFilterChange(filters);
    }, 100);
    return () => clearTimeout(debounce);
  }, [filters]);

  const handleAccordionChange = (value) => setOpenItem(value);

  const handleCheckboxChange = (attributeCode, value) => {
    setFilters((prev) => {
      const updated = { ...prev };
      const current = new Set(prev[attributeCode] || []);
      current.has(value) ? current.delete(value) : current.add(value);
      updated[attributeCode] = current.size ? [...current] : undefined;
      return updated;
    });
  };

  const handlePriceChange = (newRange) => {
    setPriceRange(newRange);
    setFilters((prev) => ({
      ...prev,
      price: [`${newRange[0]}_${newRange[1]}`],
    }));
  };

  const handleShowMore = (code, totalOptions) => {
    setVisibleCounts((prev) => ({
      ...prev,
      [code]: Math.min((prev[code] || 4) + 4, totalOptions),
    }));
  };

  const handleShowLess = (code) => {
    setVisibleCounts((prev) => ({
      ...prev,
      [code]: 4,
    }));
  };

  const getOptionLabel = (code, value) => {
    const aggregation = aggregations.find((agg) => agg.attribute_code === code);
    return (
      aggregation?.options?.find((opt) => opt.value === value)?.label || value
    );
  };

  return {
    filters,
    priceRange,
    openItem,
    visibleCounts,
    handleAccordionChange,
    handleCheckboxChange,
    handlePriceChange,
    handleShowMore,
    handleShowLess,
    getOptionLabel,
  };
};

export default useFilterSidebar;
