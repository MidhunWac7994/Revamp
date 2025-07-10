import ListingPage from "@/components/ListingPage";
import useSearchSort from "./useSearchSort";
import useSearchFilter from "./useSearchFilter";
import useSearchListing from "./useSearchListing";
import EmptyPages from "@/components/EmptyPages";
import emptySearch from "@/public/images/empty-pages/empty-search.svg";
import ProductListingShimmer from "../ProductListingMain/productListing/ProductListingShimmer";

const SearchListing = ({ hideFilter, isSsrMobile }) => {
  const {
    productList,
    totalProducts,
    error,
    searchQuery,
    filterState,
    handleFilterState,
    sortState,
    handleSortState,
    handleClearAllFilterState,
    filters,
    loadingDesktop,
    filterLoading,
    ...rest
  } = useSearchListing({ isSsrMobile: false });

  const sortDetails = useSearchSort();
  const filterProps = useSearchFilter({ filters });

  const isFilterEmpty =
    filters?.length > 0 && filters?.every((ele) => ele?.counts?.length === 0);

  const errorCase =
    error || !searchQuery || (productList?.length === 0 && isFilterEmpty);

  const breadcrumbData = [
    {
      text: `Search results for: "${searchQuery}"`,
      path: "",
      dontTranslate: true,
    },
  ];

  const isStillLoading =
    loadingDesktop || (rest?.products === undefined && error === undefined);

  if (isStillLoading && filterLoading) {
    return (
      <ProductListingShimmer
        hideFilter={hideFilter}
        pageTitle={searchQuery}
        breadcrumbData={breadcrumbData}
      />
    );
  }

  if (errorCase || (!filters?.length && !rest?.products?.length)) {
    return (
      <EmptyPages
        icon={emptySearch}
        iconWidth="160"
        iconHeight="160"
        title="We couldn't find any matches"
        subTitle="Please enter a different search term"
      />
    );
  }

  return (
    <ListingPage
      isSearchPage
      sortDetails={sortDetails}
      filterState={filterState}
      handleFilterState={handleFilterState}
      sortState={sortState}
      handleSortState={handleSortState}
      handleClearAllFilterState={handleClearAllFilterState}
      products={productList}
      totalProducts={totalProducts}
      filters={filters}
      pageTitle={searchQuery}
      filterProps={filterProps}
      breadcrumbData={breadcrumbData}
      productLoading={loadingDesktop}
      {...rest}
      hideFilter={hideFilter}
    />
  );
};

export default SearchListing;
