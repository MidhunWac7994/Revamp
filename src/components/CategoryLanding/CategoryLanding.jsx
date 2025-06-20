import React from "react";
import { Link } from "react-router-dom";
import CategoryBlock from "../CategoryBlock/CategoryBlock";
import { Button } from "../components/ui/button";
import useCategoryLanding from "../../Pages/CategoryLanding/useCategoryLanding";
import CategoryBreadcrumb from "./CategoryBreadCrump";

const CategoryLanding = ({ categoryData = [], locale }) => {
  const {
    activeCategoryId,
    setActiveCategoryId,
    divRef,
    handleMouseDown,
    handleMouseLeave,
    handleMouseUp,
    handleMouseMove,
    handleScrollToBlock,
  } = useCategoryLanding([]);

  
  const childCategories =
    categoryData?.length > 0 ? categoryData[0]?.children || [] : [];

  
  const visibleCategories = childCategories.filter(
    (item) =>
      item?.category_show_on_front_end === 1 ||
      item?.category_show_on_front_end === true ||
      item?.category_show_on_front_end === undefined
  );
            
  
  return (
    visibleCategories?.length > 0 && (
      <>
        {/* Breadcrumb */}
        <div className="hidden tablet:block">
          <CategoryBreadcrumb
            locale={locale}
            categoryName="Shop by Category"
            categoryUrlKey="category-landing"
          />
        </div>

        <div className="pt-5 laptop:pt-10" data-widget="CategoryLanding">

          <div className="flex items-center justify-between">
            <h2 className="font-lora text-[38px] font-normal text-black">
              Shop by Category
              <span className="text-16 font-light text-[#8F8F8F] ms-2">
                ({visibleCategories.length})
              </span>
            </h2>   

            
            <Button asChild className="text-16 font-normal px-0" variant="link">
              <Link to={`/${locale}/all-products`}>View All Products</Link>
            </Button>
          </div>
          
          <div className="mt-[30px]">
            <div
              className="flex category_scroll gap-[6px] sticky w-full top-20 start-0 pt-5 pb-3 bg-white z-10 overflow-hidden overflow-x-auto max-w-full items-center"
              ref={divRef}
              onMouseDown={handleMouseDown}
              onMouseLeave={handleMouseLeave}
              onMouseUp={handleMouseUp}
              onMouseMove={handleMouseMove}
            >
              {visibleCategories.map((item) => (
                <Button
                  key={item?.id}
                  data-title={item?.id}
                  onClick={() => handleScrollToBlock(item?.id)}
                  className={`rounded-[60px] w-max border-1 text-14 text-black font-normal px-4 py-3 transition ease-in-out duration-300 hover:border-lw-primary hover:text-lw-primary ${
                    activeCategoryId === item?.id
                      ? "border-lw-primary bg-lw-primary text-white hover:text-white"
                      : "border-[#DBDBDB] bg-white"
                  }`}
                >
                  {item?.name}
                </Button>
              ))}
            </div>
            {visibleCategories.map((item) => (
              <CategoryBlock
                key={item?.id}
                title={item?.name}
                childrens={item?.children}
                categorybanner={
                  item?.image_data?.category_short_image || "" // fallback to blank
                }
                link={item?.url_key}
                id={item?.id}
                setActiveCategoryId={setActiveCategoryId}
              />
            ))}
          </div>
        </div>
      </>
    )
  );
};

export default CategoryLanding;
