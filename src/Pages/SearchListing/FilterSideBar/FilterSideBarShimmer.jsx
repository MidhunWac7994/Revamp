import { Minus, Plus } from "lucide-react";

const FilterSidebarShimmer = ({ hideFilter }) => {
  return (
    <div
      className={`animate-pulse w-full ${
        hideFilter === "true" ? "hidden" : ""
      }`}
    >
      <div className="py-4 border-t border-[#EDEDED] flex items-center justify-between">
        <div className="bg-gray-bg-1 w-10 h-6 "></div>
        <Minus
          className="animate-none"
          color="#D7D7D7"
          size={16}
          strokeWidth={2}
        />
      </div>
      <div className="flex items-center justify-between mt-[6px] px-[3px] relative before:absolute before:w-[97%] before:h-[3px] before:bg-gray-bg-1 before:left-[50%] before:translate-x-[-50%]">
        <p className="w-4 h-4 rounded-full bg-gray-bg-1"></p>
        <p className="w-4 h-4 rounded-full bg-gray-bg-1"></p>
      </div>
      <div className="mt-4 flex items-center justify-between pb-[30px]">
        <p className="w-[45px] h-4 bg-gray-bg-1"></p>
        <p className="w-[72px] h-4 bg-gray-bg-1"></p>
      </div>
      <div className="py-4 border-t border-[#EDEDED] flex items-center justify-between">
        <div className="bg-gray-bg-1 w-16 h-6 "></div>
        <Minus
          className="animate-none"
          color="#D7D7D7"
          size={16}
          strokeWidth={2}
        />
      </div>
      <ul className="flex flex-col gap-5 pb-[30px]">
        {[...Array(3).keys()].map((item) => (
          <li className="flex items-center space-x-2" key={item}>
            <p className="w-4 h-4 bg-gray-bg-1 rounded-[4px] me-2"></p>
            <p className="w-[55%] h-[15px] bg-gray-bg-1"></p>
          </li>
        ))}
      </ul>
      
      {[...Array(6).keys()].map((item) => {
        return (
          <div
            key={item}
            className="py-4 border-t border-[#EDEDED] flex items-center justify-between"
          >
            <div className="bg-gray-bg-1 w-16 h-6 "></div>
            <Plus
              className="animate-none"
              color="#D7D7D7"
              size={16}
              strokeWidth={2}
            />
          </div>
        );
      })}
    </div>
  );
};

export default FilterSidebarShimmer;
