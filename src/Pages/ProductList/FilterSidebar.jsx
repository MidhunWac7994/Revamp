import React from "react";
import { Slider } from "../../components/components/ui/slider";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../../components/components/ui/accordion";
import useFilterSidebar from "./useFilterSidebar";

const FilterSidebar = ({
  aggregations = [],
  onFilterChange,
  initialFilters,
  isVisible,
  toggleVisibility,
}) => {
  const {
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
  } = useFilterSidebar(initialFilters, aggregations, onFilterChange);

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

          <Accordion
            type="single"
            collapsible
            value={openItem}
            onValueChange={handleAccordionChange}
          >
            {aggregations
              ?.filter((agg) => agg.attribute_code !== "category_uid")
              .map((aggregation) => {
                const { attribute_code, label, options = [] } = aggregation;
                const visibleCount = visibleCounts[attribute_code] || 4;
                const totalOptions = options.length;
                const visibleOptions = options.slice(0, visibleCount);

                return (
                  <AccordionItem key={attribute_code} value={attribute_code}>
                    <AccordionTrigger className="text-lg">
                      {label}
                    </AccordionTrigger>
                    <AccordionContent>
                      {attribute_code === "price" ? (
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
                        <>
                          {visibleOptions.map((option) => (
                            <div
                              key={option.value}
                              className="checkbox-container mb-2"
                            >
                              <input
                                type="checkbox"
                                id={`${attribute_code}-${option.value}`}
                                checked={
                                  filters[attribute_code]?.includes(
                                    option.value
                                  ) || false
                                }
                                onChange={() =>
                                  handleCheckboxChange(
                                    attribute_code,
                                    option.value
                                  )
                                }
                              />
                              <label
                                htmlFor={`${attribute_code}-${option.value}`}
                                className="ml-2"
                              >
                                {option.label}
                              </label>
                            </div>
                          ))}

                          {totalOptions > 4 && visibleCount < totalOptions && (
                            <button
                              onClick={() =>
                                handleShowMore(attribute_code, totalOptions)
                              }
                              className="text-[#2cb5a7] mt-1 ml-4 font-semibold text-sm"
                            >
                              More +
                            </button>
                          )}

                          {visibleCount > 4 && (
                            <button
                              onClick={() => handleShowLess(attribute_code)}
                              className="text-[#2cb5a7] mt-1 ml-4 font-semibold text-sm"
                            >
                              Less -
                            </button>
                          )}
                        </>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                );
              })}
          </Accordion>
        </>
      )}
    </div>
  );
};

export default FilterSidebar;
