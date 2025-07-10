import { useLocation } from "react-router-dom";
import FilterSidebarItems from "../FilterSideBar/FilterSideBarItems";
import useAppliedFilter from "../useAppliedFilters";

const Filter = (props) => {
  const { hideFilter, priceOptions, filterList, filterLoading } = props;
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const { attributeCodes, appliedFilters } = useAppliedFilter();
  const hasAnyFilter = anyFilterApplied(searchParams, attributeCodes);

  return (
    <div data-widget="Filter" className="w-full">
      <FilterSidebarItems
        filterList={filterList}
        hasAnyFilter={hasAnyFilter}
        appliedFilters={appliedFilters}
        hideFilter={hideFilter}
        filterLoading={filterLoading}
        priceOptions={priceOptions}
      />
    </div>
  );
};

export default Filter;

const anyFilterApplied = (searchParams, attributeCodes) => {
  for (const [key] of searchParams.entries()) {
    if (attributeCodes?.includes(key)) {
      return true;
    }
  }
  return false;
};
