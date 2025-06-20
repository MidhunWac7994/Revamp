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

 
  useEffect(() => {
    topRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [currentPage]);

 
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

  const handleSortChange = (value) => {
    setSortOption(value);
    setCurrentPage(1);

    const currentQuery = Object.fromEntries(searchParams.entries());
    const updatedQuery = { ...currentQuery };

    if (value !== "relevance") updatedQuery.sort = value;
    else delete updatedQuery.sort;

    setSearchParams(updatedQuery);
  };

  const sort = useMemo(() => {
    if (sortOption === "price_asc") return { price: "ASC" };
    if (sortOption === "price_desc") return { price: "DESC" };
    return {};
  }, [sortOption]);

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

  const { loading, data } = useQuery(GET_PRODUCT_LISTING, {
    variables: queryVariables,
  });

  return {
    loading,
    data,
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
