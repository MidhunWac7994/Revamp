import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../../components/ui/carousel";
import useScheduleDate from "./useScheduleDate";
import SelectBox from "../../SelectBox/SelectBox";
import { Button } from "../../components/ui/button";
import ScheduleDateShimmer from "./Shimmer/ScheduleDateShimmer";

const ScheduleDate = ({ disableBtn }) => {
  const {
    generateDays,
    deliveryTime,
    isLoading,
    dateAndTime,
    handleSetDeliveryTime,
    handleSetDate,
    confirmShippingMethod,
    selectedTimeLoading,
    isMutating,
  } = useScheduleDate();

  const disabled = disableBtn || isLoading;

  if (isLoading) return <ScheduleDateShimmer />;
  if (!generateDays()?.length) return null;

  return (
    <div data-widget="ScheduleDate" className="mt-5">
      <h3 className="text-18 text-black font-semibold mb-5">
        Schedule date and time
      </h3>

      <span className="hidden tablet:block text-15 text-black mb-5 font-medium">
        Choose date
      </span>

      <div className="tablet:px-7">
        <Carousel
          opts={{ align: "start" }}
          className="w-full max-w-[584px] relative"
        >
          <CarouselContent className="-ml-2">
            {generateDays()?.map((ele, index) => (
              <CarouselItem
                key={index}
                className="basis-1/5 laptop:basis-1/7 pl-2"
              >
                <button
                  disabled={selectedTimeLoading || isMutating}
                  onClick={() => handleSetDate(ele)}
                  className="text-center w-full group"
                >
                  <span className="text-13 text-[#6F6F6F] block mb-2 text-center">
                    {ele?.day}
                  </span>
                  <div
                    className={`bg-[#F8F8F8] text-center py-3 px-5 border-b-4 border-lw-primary flex flex-col gap-1 group-hover:bg-lw-primary group-hover:text-white transition-all duration-300 hover:bg-black group-hover:border-[#47d1c3] ${
                      dateAndTime?.scheduledDate?.date === ele?.date
                        ? "border-[#47d1c3] bg-lw-primary text-white"
                        : ""
                    }`}
                  >
                    <span className="block text-16 font-semibold">
                      {ele?.date}
                    </span>
                    <span
                      className={`block text-13 text-[#B3B3B3] group-hover:text-white transition-all duration-300 ${
                        dateAndTime?.scheduledDate?.date === ele?.date
                          ? "text-white"
                          : ""
                      }`}
                    >
                      {ele?.month}
                    </span>
                  </div>
                </button>
              </CarouselItem>
            ))}
          </CarouselContent>

          <div className="absolute w-[calc(100%+60px)] left-[50%] -translate-x-[50%] top-[47%] tablet:flex items-center justify-between pointer-events-none hidden">
            <CarouselPrevious className="!opacity-100 disabled:!opacity-40 w-[24px] pointer-events-auto" />
            <CarouselNext className="!opacity-100 disabled:!opacity-40 w-[24px] pointer-events-auto" />
          </div>
        </Carousel>
      </div>

      <p className="laptop:text-15 text-18 text-black my-[30px_24px] laptop:my-5 font-medium">
        Choose time slots
      </p>

      {isLoading ? (
        <div className="w-full h-[50px] bg-gray-bg animate-pulse" />
      ) : (
        <SelectBox
          placeholder="Select delivery time"
          options={deliveryTime}
          buttonClassName="max-w-[300px]"
          active={dateAndTime?.scheduledTime}
          onChange={handleSetDeliveryTime}
          disabled={selectedTimeLoading || isMutating}
        />
      )}

      <div className="mt-5">
        <Button
          disabled={disabled}
          variant="primary"
          size="xl"
          onClick={confirmShippingMethod}
          className="w-40 bg-[#53bcb7] text-white  rounded-none  h-12"
        >
          Continue
        </Button>
      </div>
    </div>
  );
};

export default ScheduleDate;
