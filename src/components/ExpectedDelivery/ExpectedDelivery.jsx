import {
  CalendarDays as CalendarIcon,
  Truck as ShipmentIcon,
} from "lucide-react";
import useExpectedDelivery from "./useExpectedDelivery";
import SelectBox from "../../components/SelectBox/SelectBox";

const ExpectedDelivery = ({ isQuickview }) => {
  const { options, fromDay, toDay, handleLocationChange, active } =
    useExpectedDelivery();

  return (
    <div
      data-widget="ExpectedDelivery"
      className={`${
        isQuickview
          ? "border-t-0 pt-[30px]"
          : "border-t-1 border-lw-grey mt-[30px] pt-[30px]"
      }`}
    >
      
      <div className="flex items-start gap-2 mb-3">
        <CalendarIcon size={20} color="#000000" />
        <p className="text-15 font-normal text-black">
          {"Expected delivery is within"} {fromDay} {"to"} {toDay}{" "}
          {"days after placing your order"}
        </p>
      </div>

          
          {active?.label && (
            <div className="flex items-start gap-2 bg-black">
              <ShipmentIcon size={20} color="#000000" />
              <p className="text-15 font-normal text-black">
                {"Ship to"} {active?.label}
              </p>
            </div>
          )}
      
      <div className="mt-1 flex gap-2 mb-3">
        <SelectBox
          options={options}
          active={active}
          onChange={handleLocationChange}
          buttonClassName="!h-10 !w-[180px] border-[#D8D8D8] rounded-none py-3 px-[10px]"
          placeholder="Delivery Location"
          search
        />
      </div>

    </div>
  );
};

export default ExpectedDelivery;
