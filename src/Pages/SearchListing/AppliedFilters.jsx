import { Fragment, useState } from "react";
import { X } from "lucide-react";

const AppliedFilters = ({ filterList }) => {
  const [appliedFilters, setAppliedFilters] = useState([
  ]);

  const handleRemoveFilter = (code, val) => {
    setAppliedFilters((prevFilters) => {
      return prevFilters
        .map((filter) => {
          if (filter.attribute_code !== code) return filter;

          if (code === "price") {
            return null;
          } else {
            const updatedValues = filter.value.filter((v) => v !== val);
            if (updatedValues.length === 0) return null;
            return { ...filter, value: updatedValues };
          }
        })
        .filter(Boolean);
    });
  };

  return (
    appliedFilters?.length > 0 && (
      <div className="flex flex-wrap gap-2">
        {appliedFilters.map((item) => (
          <Fragment key={item.attribute_code}>
            {item.value.length > 0 &&
              item.value.map((val) => (
                <FilterButton
                  key={val}
                  val={val}
                  code={item.attribute_code}
                  label={getAppliedFilterLabels(
                    item.attribute_code,
                    val,
                    filterList
                  )}
                  onRemove={() => handleRemoveFilter(item.attribute_code, val)}
                />
              ))}
          </Fragment>
        ))}
      </div>
    )
  );
};

const FilterButton = ({ val, code, label, onRemove }) => {
  return (
    (val || label) && (
      <button
        className="bg-[#F0F0F0] py-[6px] px-[10px] text-14 text-[#585858] rounded-[4px] flex items-center gap-x-[9px] ease-in-out duration-500 hover:opacity-80"
        type="button"
        onClick={onRemove}
      >
        <span>{code === "price" ? val : label}</span> <X size={10} />
      </button>
    )
  );
};

const getAppliedFilterLabels = (code, value, filterList) => {
  for (const item of filterList) {
    if (item?.attribute_code === code) {
      for (const option of item?.options) {
        if (option?.value === value) {
          return option?.label;
        }
      }
    }
  }
  return value;
};

export default AppliedFilters;
