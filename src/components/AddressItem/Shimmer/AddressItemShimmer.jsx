import React from "react";

const AddressItemShimmer = () => {
  return (
    <div
      data-widget="AddressItemShimmer"
      className="bg-white p-6 rounded-[4px] border border-[#E2E2E2] animate-pulse"
    >
      <div className="flex items-center flex-wrap gap-x-2 mb-3">
        <p className="w-[111px] h-6 bg-gray-bg-1"></p>
        <p className="w-[64px] h-[28px] rounded-[50px] bg-gray-bg-1"></p>
      </div>
      <p className="w-3/4 h-5 bg-gray-bg-1"></p>
      <p className="w-3/5 h-5 bg-gray-bg-1 mt-1"></p>
      <p className="w-5/6 h-5 bg-gray-bg-1 mt-1"></p>
      <p className="w-1/2 h-5 bg-gray-bg-1 mt-3"></p>
      <div className="flex items-center justify-end gap-2 mt-3 ">
        <p className="w-[67px] h-[35px] bg-gray-bg-1"></p>
        <p className="w-[95px] h-[35px] bg-gray-bg-1"></p>
      </div>
    </div>
  );
};

export default AddressItemShimmer;
