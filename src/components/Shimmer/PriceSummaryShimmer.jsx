import React from "react";

const PriceSummaryShimmer = () => {
  return (
    <div>
      <div className=" mb-6 w-[148px] h-[30px] bg-gray-bg-1"></div>
      <div className="flex flex-col gap-y-2">
        {[...Array(3).keys()].map((item) => (
          <div className="flex items-center justify-between" key={item}>
            <div className="h-5 w-[55px] bg-gray-bg-1"></div>
            <div className="h-[17px] w-[100px] bg-gray-bg-1"></div>
          </div>
        ))}
        <div className="flex items-center justify-between  pt-6 mt-6 border-t border-[#E9E9E9]">
          <div className="h-[27px] w-[148px] bg-gray-bg-1"></div>
          <div className="h-[27px] w-[135px] bg-gray-bg-1"></div>
        </div>
      </div>
      <div className="mt-6 h-[52px] w-full bg-gray-bg-1"></div>
      <div className=" hidden mobile:flex items-center gap-x-2 mt-5">
        <div className="size-7 bg-gray-bg-1"></div>
        <div className="w-full">
          <div className="h-5 w-3/4 bg-gray-bg-1"></div>
          <div className="h-5 w-2/4 mt-[3px] bg-gray-bg-1"></div>
        </div>
      </div>
    </div>
  );
};

export default PriceSummaryShimmer;
