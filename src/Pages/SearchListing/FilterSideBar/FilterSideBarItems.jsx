import { useEffect, useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../../../components/components/ui/accordion";
import FilterSidebarShimmer from "./FilterSideBarShimmer";
import PriceSlider from "../PriceSlider/PriceSlider";
import ColorFilter from "../ColorFilter/ColorFilter";
import FilterCheckBox from "../FilterCheckBox/FilterCheckBox";


const FilterSidebarItems = (props) => {
  const {
    filterList,
    hasAnyFilter,
    appliedFilters,
    hideFilter,
    filterLoading,
    priceOptions,
  } = props;
  const [openAccordions, setOpenAccordions] = useState([]);
  const defaultOpenAccordions = [
    `item-${filterList?.[0]?.attribute_code}`,
    `item-${filterList?.[1]?.attribute_code}`,
  ];

  useEffect(() => {
    if (filterList?.length) {
      if (hasAnyFilter && appliedFilters?.length) {
        setOpenAccordions([
          ...defaultOpenAccordions,
          ...appliedFilters
            ?.filter(
              (item) =>
                !defaultOpenAccordions?.includes(`item-${item?.attribute_code}`)
            )
            ?.map((item) => `item-${item?.attribute_code}`),
        ]);
      } else {
        setOpenAccordions(defaultOpenAccordions);
      }
    }
  }, [filterList, hasAnyFilter, appliedFilters]);

  const handleToggleAccordion = (value) => setOpenAccordions(value);

  if (filterLoading) return <FilterSidebarShimmer hideFilter={hideFilter} />;

  return (
    <>
      <div
        data-widget="FilterSidebarItems"
        className="border-t border-[#EDEDED]"
      >
        <Accordion
          className="w-full"
          type="multiple"
          collapsible={"true"}
          value={openAccordions}
          onValueChange={handleToggleAccordion}
        >
          {filterList?.map((category) => (
            <AccordionItem
              key={category?.attribute_code}
              value={`item-${category?.attribute_code}`}
              className="group border-b-1 border-[#EDEDED] last:border-b-1"
            >
              <AccordionTrigger>{category?.label}</AccordionTrigger>
              <AccordionContent
                forceMount
                className="group-data-[state=closed]:hidden p-0"
              >
                {renderFilter(
                  category?.attribute_code,
                  category?.options,
                  priceOptions,
                  false
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </>
  );
};

export default FilterSidebarItems;

export const renderFilter = (
  code,
  options,
  priceOptions,
  isMobileFilter,
  handleSelectedFilterMobile,
  selectedFilters
) => {
  switch (code) {
    case "price":
      return (
        <PriceSlider
          priceOptions={priceOptions}
          isMobileFilter={isMobileFilter}
          handleSelectedFilterMobile={handleSelectedFilterMobile}
        />
      );

    case "color":
      return isMobileFilter ? (
        <FilterCheckBox
          options={options}
          code={code}
          isMobileFilter={isMobileFilter}
          handleSelectedFilterMobile={handleSelectedFilterMobile}
          selectedFilters={selectedFilters}
        />
      ) : (
        <ColorFilter options={options} />
      );

    default:
      return (
        <FilterCheckBox
          options={options}
          code={code}
          isMobileFilter={isMobileFilter}
          handleSelectedFilterMobile={handleSelectedFilterMobile}
          selectedFilters={selectedFilters}
        />
      );
  }
};
