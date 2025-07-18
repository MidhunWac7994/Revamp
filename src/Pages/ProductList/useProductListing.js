import { useEffect, useMemo, useState, useRef } from "react";
import { useQuery } from "@apollo/client";
import { useSearchParams } from "react-router-dom";
import { PAGE_SIZE } from "../../components/Constants";
import { GET_PRODUCT_LISTING } from "./ListQuery";

const formatFilters = (appliedFilters) => {
  if (!appliedFilters) return {};

  return Object.entries(appliedFilters).reduce((acc, [code, value]) => {
    if (!value) return acc;

    const values = Array.isArray(value) ? value : value.split(",");
    if (values.length === 0) return acc;

    if (code === "price") {
      const ranges = values.map((range) => range.split("_").map(Number));
      const min = Math.min(...ranges.map(([from]) => from));
      const max = Math.max(...ranges.map(([, to]) => to));
      acc.price = { from: min, to: max };
    } else {
      acc[code] = { in: values };
    }

    return acc;
  }, {});
};

const useProductListing = (categoryId) => {
  const [filters, setFilters] = useState({});
  const [sortOption, setSortOption] = useState("relevance");
  const [currentPage, setCurrentPage] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const topRef = useRef(null);

  // Scroll to top on page change
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

  // Sync filters and sort from URL params
  useEffect(() => {
    const params = Object.fromEntries(searchParams.entries());
    const parsedFilters = {};
    let parsedSort = "relevance";

    for (const [key, value] of Object.entries(params)) {
      if (!value) continue;
      if (key === "sort") parsedSort = value;
      else parsedFilters[key] = key === "price" ? [value] : value.split(",");
    }

    setFilters(parsedFilters);
    setSortOption(parsedSort);
  }, [searchParams]);

  // Update URL when filters change
  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    setCurrentPage(1);

    const updatedQuery = {};

    for (const [key, values] of Object.entries(newFilters)) {
      if (Array.isArray(values) && values.length > 0) {
        updatedQuery[key] = values.join(",");
      }
    }

    if (sortOption !== "relevance") updatedQuery.sort = sortOption;
    setSearchParams(updatedQuery);
  };

  // Update URL when sort changes
  const handleSortChange = (value) => {
    setSortOption(value);
    setCurrentPage(1);

    const currentQuery = Object.fromEntries(searchParams.entries());
    const updatedQuery = { ...currentQuery };

    if (value !== "relevance") updatedQuery.sort = value;
    else delete updatedQuery.sort;

    setSearchParams(updatedQuery);
  };

  // Compute sort object for query
  const sort = useMemo(() => {
    if (sortOption === "price_asc") return { price: "ASC" };
    if (sortOption === "price_desc") return { price: "DESC" };
    return {};
  }, [sortOption]);

  // Query variables memoized
  const queryVariables = useMemo(
    () => ({
      filter: formatFilters(filters),
      pageSize: PAGE_SIZE,
      currentPage,
      sort,
      category_id: categoryId,
    }),
    [filters, currentPage, categoryId, sort]
  );

  // useQuery hook called unconditionally, skip if no categoryId
  const { loading, data, error } = useQuery(GET_PRODUCT_LISTING, {
    variables: queryVariables,
    skip: !categoryId,
    fetchPolicy: "cache-and-network",
  });

  return {
    loading,
    data,
    error,
    filters,
    sortOption,
    currentPage,
    setCurrentPage,
    handleFilterChange,
    handleSortChange,
    topRef,
  };
};

export default useProductListing;
