import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import CustomCheckBox from "../../../components/CustomCheckBox/CustomCheckBox";
import { LIMIT } from "../../../components/Constants";
import { Button } from "../../../components/components/ui/button";
import { ChevronRight } from "lucide-react";

const FilterCheckBox = ({
  options,
  code,
  isMobileFilter,
  handleSelectedFilterMobile,
  selectedFilters,
}) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [limit, setLimit] = useState(LIMIT);

  const getFilterFromParams = () => {
    const param = searchParams.get(code);
    return param ? param.split(",") : [];
  };

  const filter = getFilterFromParams();

  const handleFilter = (value) => {
    const encodedValue = encodeURIComponent(value);
    const currentPage = parseInt(searchParams.get("page")) || 1;

    if (isMobileFilter) {
      handleSelectedFilterMobile(code, value);
      return;
    }

    if (currentPage > 1) {
      searchParams.delete("page");
    }

    const currentValues = getFilterFromParams();

    let updatedValues;
    if (currentValues.includes(encodedValue)) {
      updatedValues = currentValues.filter((v) => v !== encodedValue);
    } else {
      updatedValues = [...currentValues, encodedValue];
    }

    if (updatedValues.length > 0) {
      searchParams.set(code, updatedValues.join(","));
    } else {
      searchParams.delete(code);
    }

    setSearchParams(searchParams);
  };

  const handleViewMore = () => setLimit(options?.length);
  const handleViewLess = () => setLimit(LIMIT);
  const sliceLimit = isMobileFilter ? undefined : limit;

  return (
    <ul className="flex flex-col gap-5 laptop:pb-[30px]">
      {options?.slice(0, sliceLimit)?.map((item, itemIndex) => {
        const value = encodeURIComponent(item?.value);
        const isChecked = isMobileFilter
          ? !!selectedFilters?.[code]?.includes(item?.value)
          : filter.includes(value);

        return (
          <li key={itemIndex} className="flex items-center space-x-2">
            <CustomCheckBox
              label={item?.label}
              id={item?.value + itemIndex}
              onChange={() => handleFilter(item?.value)}
              checked={isChecked}
            />
          </li>
        );
      })}

      {!isMobileFilter && options?.length > LIMIT && (
        <Button
          variant="link"
          className="text-primary-blue pt-0 ps-0 text-[16px] justify-start font-medium h-auto border-0 hover:text-black"
          onClick={options?.length === limit ? handleViewLess : handleViewMore}
        >
          {options?.length === limit
            ? "View Less"
            : `More (${options.length - LIMIT})`}
          <ChevronRight size={14} className="ms-1" />
        </Button>
      )}
    </ul>
  );
};

export default FilterCheckBox;
