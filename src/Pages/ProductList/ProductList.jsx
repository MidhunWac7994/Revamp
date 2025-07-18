import React, { useState, useEffect, useRef } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import useProductListing from "./useProductListing";
import ProductBreadcrumb from "./ProductBreadcrumb";
import FilterSidebar from "./FilterSidebar";
import AddToCartButton from "../../components/AddtoCartButton";
import Spinner from "../../components/Spinner/Spinner";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from "../../components/components/ui/pagination";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../../components/components/ui/dropdown-menu";
import { Button } from "../../components/components/ui/button";
import NotifyBtn from "../../components/NotifyBtn/NotifyBtn"

const Products = ({ categoryId, categoryName, categoryUrlKey }) => {
  const { locale, page } = useParams();
  const navigate = useNavigate();
  const initialPage = parseInt(page, 10) || 1;
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [isFilterVisible, setIsFilterVisible] = useState(true);

  const {
    loading,
    data,
    filters,
    sortOption,
    setCurrentPage: setListingPage,
    handleFilterChange,
    handleSortChange,
    topRef,
  } = useProductListing(categoryId, currentPage);

  const products = data?.products?.items || [];
  const aggregations = data?.products?.aggregations || [];
  const totalCount = data?.products?.total_count || 0;
  const PAGE_SIZE = 20;
  const totalPages = Math.ceil(totalCount / PAGE_SIZE);
  const startItem = (currentPage - 1) * PAGE_SIZE + 1;
  const endItem = Math.min(currentPage * PAGE_SIZE, totalCount);
console.log(currentPage,"currentPage")
  useEffect(() => {
    if (topRef?.current) {
      topRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [currentPage]);

  useEffect(() => {
    if (currentPage !== initialPage) {
      navigate(`/${locale}/${categoryUrlKey}/${currentPage}`, {
        replace: false,
      });
    }
    setListingPage(currentPage); 
  }, [
    currentPage,
    initialPage,
    locale,
    categoryUrlKey,
    navigate,
    setListingPage,
  ]);

  return (
    <div>
      <div className="mt-32 ml-12">
        <ProductBreadcrumb
          locale={locale}
          categoryName={categoryName}
          categoryUrlKey={categoryUrlKey}
        />
        <img
          src="/offer-strip.png"
          alt="Category Banner"
          className="w-full h-[250px] object-cover"
        />
      </div>

      <div className="mt-10 ml-24">
        <div className="flex items-baseline justify-between mb-4 mr-12">
          <div>
            <h1 className="text-3xl">{categoryName || "Living Room"}</h1>
            <h2 className="text-gray-500 mt-1 text-lg">
              (Showing {startItem} to {endItem} of {totalCount} products)
            </h2>
          </div>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <button className="px-4 py-2 ">
                Sort by:{" "}
                {sortOption === "price_asc"
                  ? "Price: Low to High"
                  : sortOption === "price_desc"
                  ? "Price: High to Low"
                  : "Relevance"}
              </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem onClick={() => handleSortChange("relevance")}>
                Relevance
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange("price_asc")}>
                Price: Low to High
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSortChange("price_desc")}>
                Price: High to Low
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex mt-10 ml-24">
        <div
          className={`transition-all duration-300 ${
            isFilterVisible ? "w-1/6 " : "w-0"
          }`}
        >
          {isFilterVisible && (
            <FilterSidebar
              aggregations={aggregations}
              onFilterChange={handleFilterChange}
              initialFilters={filters}
              isVisible={isFilterVisible}
              toggleVisibility={() => setIsFilterVisible(!isFilterVisible)}
            />
          )}
        </div>

        <div
          className={`transition-all duration-300 ${
            isFilterVisible ? "w-3/4" : "w-full"
          }`}
        >
          {!isFilterVisible && (
            <Button
              onClick={() => setIsFilterVisible(true)}
              className="mb-4 px-4 py-2 text-gray-500 font-semibold"
            >
              Show Filters :-
            </Button>
          )}

          {loading ? (
            <div className="flex justify-center items-center h-[60vh] animate-fade-in-down">
              <Spinner className="size-12 border-[3px]" />
            </div>
          ) : products.length === 0 ? (
            <div>No products found for this category.</div>
          ) : (
            <>
              <ul className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {products.map((product) => (
                  <li key={product.id} className="group p-4">
                    <Link to={`/${locale}/${product.url_key}`}>
                      <div className="relative w-full aspect-[3/4] overflow-hidden">
                        <img
                          src={product.image?.url}
                          alt={product.image?.label || product.name}
                          className="absolute inset-0 w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-0"
                        />
                        <img
                          src={product.hover_image}
                          alt={`Hover image of ${product.name}`}
                          className="absolute inset-0 w-full h-full object-cover opacity-0 transition-opacity duration-500 group-hover:opacity-100"
                        />

                        {product.wac_catalog_label?.label_text && (
                          <span
                            className="absolute top-2 left-2 px-3 py-1 text-xs min-w-[70px] min-h-[20px] text-center inline-block"
                            style={{
                              backgroundColor:
                                product.wac_catalog_label.background_color,
                              color: product.wac_catalog_label.text_color,
                            }}
                          >
                            {product.wac_catalog_label.label_text}
                          </span>
                        )}
                      </div>
                    </Link>
                    <div className="mt-4">
                      <h2 className="text-lg font-medium">{product.name}</h2>
                      <p className="text-gray-700">
                        KWD{" "}
                        {product.price_range.minimum_price.final_price.value.toFixed(
                          2
                        )}
                      </p>

                      {product.stock_status === "OUT_OF_STOCK" ? (
                        <NotifyBtn
                          id={product.id}
                          name={product.name}
                          minPrice={
                            product.price_range.maximum_price.final_price.value
                          }
                          maxPrice={
                            product.price_range.minimum_price.final_price.value
                          }
                          image={product.image?.url}
                          attributeDetails={product?.attributes || []}
                          combinationNotFound={false}
                          btnClassName="w-full h-[40px] text-sm"
                        />
                      ) : (
                        <AddToCartButton
                          productId={product.id}
                          productName={product.name}
                          productSku={product.sku}
                        />
                      )}
                    </div>
                  </li>
                ))}
              </ul>

              <div className="mt-10 flex justify-center">
                <Pagination>
                  <PaginationContent>
                    {currentPage > 1 && (
                      <PaginationItem>
                        <PaginationPrevious
                          onClick={() => setCurrentPage((prev) => prev - 1)}
                          className="cursor-pointer"
                        />
                      </PaginationItem>
                    )}

                    {(() => {
                      const pagesPerGroup = 5;
                      const currentGroup = Math.floor(
                        (currentPage - 1) / pagesPerGroup
                      );
                      const startPage = currentGroup * pagesPerGroup + 1;
                      const endPage = Math.min(
                        startPage + pagesPerGroup - 1,
                        totalPages
                      );

                      const pageItems = [];

                      for (let i = startPage; i <= endPage; i++) {
                        pageItems.push(
                          <PaginationItem key={i}>
                            <PaginationLink
                              isActive={i === currentPage}
                              onClick={() => setCurrentPage(i)}
                              className={`cursor-pointer border transition-all px-3 py-1 rounded-none ${
                                i === currentPage
                                  ? "border-black text-black"
                                  : "border-gray-300 text-gray-600"
                              } hover:border-black`}
                            >
                              {i}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }

                      return pageItems;
                    })()}

                    {currentPage < totalPages && (
                      <PaginationItem>
                        <PaginationNext
                          onClick={() => setCurrentPage((prev) => prev + 1)}
                          className="cursor-pointer"
                        />
                      </PaginationItem>
                    )}
                  </PaginationContent>
                </Pagination>
              </div>
            </>
          )}
        </div>
      </div>

      <div ref={topRef} />
    </div>
  );
};

export default Products;