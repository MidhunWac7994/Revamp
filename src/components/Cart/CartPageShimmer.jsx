import React from "react";
import { ArrowLeft } from "lucide-react";
import CartItemShimmer from '../Shimmer/CartItemShimmer';
import PriceSummaryShimmer from '../Shimmer/PriceSummaryShimmer';

const CartPageShimmer = () => {
  return (
    <div
      data-widget="CartPageShimmer"
      className="animate-pulse inner-pages max-mobile:!pt-mob-header-heaight pb-[100px] relative min-h-[50vh]"
    >
      <div className="main-container">
        <div className="gap-x-2 hidden tablet:flex items-center">
          <ArrowLeft size={13} />
          <p className="text-14 text-black tracking-wider">Back to Shopping</p>
        </div>

        <div className="laptop:max-w-[1265px] pt-6 m-auto laptop:pt-[70px] pb-[75px] flex max-tabletPro:flex-wrap gap-x-10 items-start max-mobile:-mx-5">
          {/* Left Section  */}
          <div className="w-full flex-[1_1_0] max-mobile:mx-5">
            <div className=" hidden tablet:flex items-center gap-x-2 mb-10 desktop:mb-[60px]">
              <div className="h-11 w-[240px] bg-gray-bg-1"></div>
              <div className="h-7 w-[55px] bg-gray-bg-1"></div>
            </div>

            {[...Array(6).keys()].map((item) => (
              <div className="flex flex-col group" key={item}>
                <CartItemShimmer />
              </div>
            ))}
          </div>

          {/* Right Section   */}
          <div className="max-tabletPro:flex-[0_0_100%] max-mobile:border-y-4 max-mobile:border-[#F4F4F4] tabletPro:max-w-[395px] tablet:w-full tablet:border tablet:border-border-color px-5 tablet:px-6 py-6 tablet:py-8 tablet:sticky tablet:top-[calc(var(--spacing-header-heaight)+30px)] mobile:mt-6 tabletPro:mt-0">
            <div className="border-b border-border-color pb-6 tablet:pb-5 mb-[22px] tablet:mb-5">
              <div className="h-6 w-[150px] bg-gray-bg-1 mb-6 laptop:mb-4"></div>
              <div className="h-[50px] w-full bg-gray-bg-1 mb-[10px]"></div>
              <div className="h-[52px] w-full bg-gray-bg-1"></div>
            </div>
            <PriceSummaryShimmer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartPageShimmer;
