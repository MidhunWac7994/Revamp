import { useSearchParams } from "react-router-dom";
import { filterApplied } from "../../CustomHook/filterApplied";
import { useGlobalData } from "../../CustomHook/useGlobalData";

const useAppliedFilter = () => {
  const [searchParams] = useSearchParams();
  const { availableAttributes } = useGlobalData();

  const attributeCodes = availableAttributes?.flatMap((filter) => filter);

  const appliedFilters = filterApplied(searchParams, attributeCodes);

  return { appliedFilters, attributeCodes };
};

export default useAppliedFilter;
