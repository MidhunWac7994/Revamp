import { useState } from "react";
import { Search } from "lucide-react"; 
import StoreCard from "../../../StoreCard/StoreCard";
import TextInput from "../../../TextInput/TextInput";

const StoreList = (props) => {
  const { stores = [], handleNext, isMutating, active, values } = props;
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearch = ({ value }) => setSearchTerm(value);

  const searchedData = getFilteredData(stores, searchTerm);

  return (
    <div data-widget="PickupStoreAndForm" className="max-mobile:px-4">
      <div className="absolute w-full start-1/2 max-mobile:-translate-x-1/2 max-mobile:max-w-[90%] mobile:start-0 top-5 mobile:top-0">
        <span className="absolute left-[17px] top-1/2 -translate-y-1/2 z-[1]">
          <Search size={18} color="#26A295" />
        </span>
        <TextInput
          id="searchbar"
          type="text"
          name="search"
          placeholder="Search stores"
          value={searchTerm}
          onChange={handleSearch}
          className="mb-0 bg-white mobile:bg-[#F5F5F5]"
          inputClassName="ps-[45px]"
        />
      </div>

      <h4 className="text-16 text-black font-semibold leading-6 mb-4 mt-16">
        Available stores
      </h4>

      <div className="max-h-[90%] mobile:max-h-[355px] flex flex-col gap-y-2 overflow-hidden overflow-y-auto pe-1 search-wrap">
        {searchedData?.map((item) => (
          <StoreCard
            key={item?.name}
            content={item}
            isCheckout
            handleClick={handleNext}
            isMutating={isMutating}
            active={
              values?.storeCode?.pickup_location_code
                ? values?.storeCode?.pickup_location_code
                : active
            }
            jsxComponent={
              <div className="border border-black py-1 px-3 text-14 font-normal mt-4 w-fit">
                Select Store
              </div>
            }
          />
        ))}
      </div>
    </div>
  );
};

export default StoreList;

const getFilteredData = (filterItems = [], searchTerm = "") =>
  filterItems.filter((item) =>
    item?.name?.toLowerCase().includes(searchTerm.toLowerCase())
  );
