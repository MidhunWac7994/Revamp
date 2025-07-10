import { useState } from "react";
import AppliedFilters from "./AppliedFilters";
import Filter from "./Filter/Filter";
import ListingBanner from "./ListingBanner/ListingBanner";
import ProductGrid from "./ProductGrid";
import Sort from "./Sort";
import CategorySlider from "./CategorySlider";
import ToggleFilter from "./ToggleFilter";
import ClearAllFilter from "./ClearAllFilter";
import BreadcrumbStatic from "../BreadcrumbStatic";

const ListingPage = (props) => {
  const {
    isListing,
    products,
    totalProducts,
    displayedProductsRange,
    handleChangePage,
    pageIndex,
    productLoading,
    filterLoading,
    pageTitle,
    isReachingEnd,
    itemsLength,
    banner,
    setSize,
    size,
    isValidating,
    hideFilter,
    breadcrumbs,
    sortDetails,
    filterProps,
    link,
    categoryBlock,
    toggleCategoryBlock,
    breadcrumbData,
  } = props;

  const [toggleFilter, setToggleFilter] = useState(hideFilter);
  const toggleFilterFn = () => setToggleFilter((prev) => !prev);

  return (
    <div
      data-widget="ListingPage"
      className="pb-20 overflow-hidden page_min_height"
    >
      <div className="main-container">
        <BreadcrumbStatic breadcrumbData={breadcrumbData} />
        {banner && <ListingBanner banner={banner} link={link} />}

        <div className="pt-[18px] tablet:pt-9">
          <div className="flex items-center gap-x-2 mb-5 laptop:mb-8">
            {pageTitle && (
              <h1 className="text-title-26 leading-6 laptop:text-title-32 font-lora capitalize">
                {pageTitle}
              </h1>
            )}
            <span className="text-14 laptop:text-16 text-[#747474] relative top-1">
              (Showing {displayedProductsRange} of {totalProducts} products)
            </span>
          </div>

          <CategorySlider
            link={link}
            categoryBlock={categoryBlock}
            toggleCategoryBlock={toggleCategoryBlock}
          />

          <div className="gap-7 mb-5 flex">
            <div className="w-full max-w-[263px] flex items-center justify-between">
              <ToggleFilter
                toggleFilter={toggleFilter}
                toggleFilterFn={toggleFilterFn}
              />
              <ClearAllFilter />
            </div>
            <div className="w-full">
              <div className="flex items-center justify-between">
                <AppliedFilters filterList={filterProps?.filterList} />
                <Sort
                  className="ms-auto"
                  sortDetails={sortDetails}
                  isListing={isListing}
                  buttonClassName={
                    "border-0 w-[155px] px-2 py-[5px] text-14 font-medium h-[30px]"
                  }
                />
              </div>
            </div>
          </div>

          <div className="flex">
            <div
              className={`${
                toggleFilter ? "opacity-0 w-0" : "opacity-100 w-full me-7"
              } max-w-[263px]`}
            >
              <Filter
                hideFilter={hideFilter}
                {...filterProps}
                filterLoading={filterLoading}
              />
            </div>
            <div className="w-full">
              <ProductGrid
                products={products}
                productLoading={productLoading}
                totalCount={totalProducts}
                handleChangePage={handleChangePage}
                pageIndex={pageIndex}
                isListing={isListing}
                isReachingEnd={isReachingEnd}
                itemsLength={itemsLength}
                setSize={setSize}
                size={size}
                isValidating={isValidating}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingPage;
