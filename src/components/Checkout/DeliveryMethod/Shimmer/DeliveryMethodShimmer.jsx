import React from "react";

const DeliveryMethodShimmer = () => {
  return (
    <div className="animate-pulse" data-widget="DeliveryMethodShimmer">
      <h3 className="text-18 text-black font-semibold mb-4 tabletPro:mb-5">
        {("Delivery Method")}
      </h3>
      <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-y-[15px] gap-x-4">
        {[...Array(3).keys()].map((item) => (
          <div
            className="w-full h-[95px] tabletPro:h-[116px] bg-gray-bg "
            key={item}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default DeliveryMethodShimmer;
