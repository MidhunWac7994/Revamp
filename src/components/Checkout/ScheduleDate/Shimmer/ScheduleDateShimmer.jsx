import React from "react";

const ScheduleDateShimmer = () => {
  const itemsCount = 7; 

  return (
    <div data-widget="ScheduleDateShimmer" className="mt-5 animate-pulse">
      <h3 className="text-18 text-black font-semibold mb-5">
        Schedule date and time
      </h3>

      <span className="hidden tablet:block text-15 text-black mb-5 font-medium">
        Choose date
      </span>

      <div className="tablet:px-7">
        <div className="w-full max-w-[584px] relative grid grid-cols-5 overflow-hidden laptop:grid-cols-7 gap-x-2">
          {[...Array(itemsCount).keys()].map((item) => (
            <div key={item}>
              <div className="bg-gray-bg h-5 mb-2 w-[22px] mx-auto"></div>
              <div className="bg-gray-bg w-full h-[75px]"></div>
            </div>
          ))}
        </div>
      </div>

      <p className="laptop:text-15 text-18 text-black my-[30px_24px] laptop:my-5 font-medium">
        Choose time slots
      </p>

      <div className="hidden mobile:block mobile:max-w-[162px] mt-5 w-full h-[52px] bg-gray-bg"></div>
    </div>
  );
};

export default ScheduleDateShimmer;
