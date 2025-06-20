
import React from "react";

const CartItemShimmer = (props) => {
  const { isMiniCart } = props;
  return (
    <div className="flex items-start gap-x-5 mb-5 pb-5 tablet:pb-7 tablet:mb-7 border-b border-border-color max-mobile:group-last:border-b-0 group-last:mb-0">
      <div className=" flex-[0_0_100px]">
        <div className="relative aspect-square max-w-[100px] bg-gray-bg-1"></div>
        <div className="mobile:hidden mt-2 w-full h-[33px] bg-gray-bg-1"></div>
      </div>

      <div className="w-full flex items-start">
        <div
          className={`w-full flex flex-col flex-[1_1_0] gap-y-8 ${
            isMiniCart ? "gap-x-[15px]" : "gap-x-5"
          }`}
        >
          <div className="flex flex-col gap-y-1 w-full">
            {!isMiniCart && (
              <div className="block max-mobile:h-[18px] h-5 w-[100px] bg-gray-bg-1"></div>
            )}
            <div className="max-mobile:h-[21px] h-6 w-3/5 bg-gray-bg-1"></div>
            <div className="flex items-center flex-wrap gap-3 my-3 mobile:hidden">
              <div className="h-6 w-[30%] bg-gray-bg-1"></div>
              <div className="h-5 w-16 bg-gray-bg-1"></div>
            </div>
            <div className="h-4 w-[125px] bg-gray-bg-1"></div>
          </div>
          <div className="flex items-center flex-wrap gap-y-2 gap-x-5 tablet:gap-x-6">
            <div className="h-5 w-16 bg-gray-bg-1"></div>
            <div className="h-5 w-16 bg-gray-bg-1"></div>
            {!isMiniCart && <div className="h-5 w-16 bg-gray-bg-1"></div>}
          </div>
        </div>

        <div
          className={`hidden w-full mobile:flex flex-col items-end gap-y-6 ${
            isMiniCart ? "max-w-[150px]" : "max-w-[175px]"
          }`}
        >
          <div className="flex flex-col">
            <div className="h-7 w-[125px] bg-gray-bg-1"></div>
            <div className="h-4 w-[90] mt-[3px] bg-gray-bg-1 ms-auto"></div>
          </div>
          <div className="w-[130px] h-10 bg-gray-bg-1"></div>
        </div>
      </div>
    </div>
  );
};

export default CartItemShimmer;
