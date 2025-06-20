import React, { useState, useEffect } from "react";
import { Slider } from "../../components/components/ui/slider";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../components/components/ui/accordion";

const FilterSidebar = ({
  aggregations = [], 
  onFilterChange,
  initialFilters,
  isVisible,
  toggleVisibility,
}) => {
  const [filters, setFilters] = useState(initialFilters || {});
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [openItem, setOpenItem] = useState(null);

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

  const getOptionLabel = (code, value) => {
    const aggregation = aggregations.find((agg) => agg.attribute_code === code);
    return (
      aggregation?.options?.find((opt) => opt.value === value)?.label || value
    );
  };

  return (
    <div className={`filter-sidebar ${isVisible ? "block" : "hidden"}`}>
     
      <div className="mb-4">
        <button
          onClick={toggleVisibility}
          className="px-4 py-2 text-gray-500 font-semibold"
        >
          {isVisible ? "Hide Filters :-" : "Show Filters :-"}
        </button>
      </div>

      {isVisible && (
        <>

          {Object.keys(filters).length > 0 && (
            <div className="selected-options flex flex-wrap gap-2 mb-4">
              {Object.entries(filters).flatMap(([code, values]) =>
                Array.isArray(values)
                  ? values.map((value) => (
                      <div
                        key={`${code}-${value}`}
                        className="flex items-center bg-gray-200 rounded px-2 py-1"
                      >
                        <span className="text-sm mr-1">
                          {getOptionLabel(code, value)}
                        </span>
                        <button
                          onClick={() => handleCheckboxChange(code, value)}
                          className="text-gray-600 hover:text-gray-800"
                        >
                          &times;
                        </button>
                      </div>
                    ))
                  : []
              )}  
            </div>
          )}

          {/* Accordion with Filters */}
          <Accordion
            type="single"
            collapsible
            value={openItem}
            onValueChange={handleAccordionChange}
          >
            {aggregations
              ?.filter((agg) => agg.attribute_code !== "category_uid")
              .map((aggregation) => (
                <AccordionItem
                  key={aggregation.attribute_code}
                  value={aggregation.attribute_code}
                >
                  <AccordionTrigger className="text-lg">
                    {aggregation.label}
                  </AccordionTrigger>
                  <AccordionContent>
                    {aggregation.attribute_code === "price" ? (
                      <div className="relative w-64 mb-4">
                        <Slider
                          value={priceRange}
                          onValueChange={handlePriceChange}
                          min={0}
                          max={1000}
                          step={10}
                          className="w-full"
                        />
                        <div className="flex justify-between w-full mt-3 pb-3">
                          <span>{`KWD ${priceRange[0]}`}</span>
                          <span className="ml-auto">{`KWD ${priceRange[1]}`}</span>
                        </div>
                      </div>
                    ) : (
                      aggregation.options?.map((option) => (
                        <div
                          key={option.value}
                          className="checkbox-container mb-2"
                        >
                          <input
                            type="checkbox"
                            id={`${aggregation.attribute_code}-${option.value}`}
                            checked={
                              filters[aggregation.attribute_code]?.includes(
                                option.value
                              ) || false
                            }
                            onChange={() =>
                              handleCheckboxChange(
                                aggregation.attribute_code,
                                option.value
                              )
                            }
                          />
                          <label
                            htmlFor={`${aggregation.attribute_code}-${option.value}`}
                          >
                            {option.label}
                          </label>
                        </div>
                      )) || []
                    )}
                  </AccordionContent>
                </AccordionItem>
              ))}
          </Accordion>
        </>
      )}
    </div>
  );
};

export default FilterSidebar;
