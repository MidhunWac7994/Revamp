import { Fragment } from "react";
import Price from '../../components/Price/Price';

const   PriceSummary = (props) => {
  const { customPrices } = props;

  const subtotal = customPrices?.find(
    (item) =>
      item?.class_name === "price_normal" ||
      item?.label?.toLowerCase() === "subtotal"
  )?.value;

  const total = customPrices?.find(
    (item) =>
      item?.class_name === "grand_total" ||
      item?.label?.toLowerCase() === "total"
  )?.value;

  const youSave = subtotal && total ? subtotal - total : 0;

  return (
    customPrices?.length > 0 && (
      <div className="flex flex-col gap-y-2" data-widget="PriceSummary">
        {customPrices?.map((item) => {
          const isTotal =
            item?.id === "grand_total" || item?.class_name === "grand_total";

          return (
            <Fragment key={item?.id}>
              <div
                className={`flex items-center justify-between  ${
                  isTotal ? "pt-6 mt-6 border-t border-[#E9E9E9]" : ""
                }`}
              >
                <p
                  className={`${
                    isTotal
                      ? " text-18 font-semibold text-black"
                      : "text-[#565F6D] font-light text-14"
                  }`}
                >
                  {item?.label}
                  {isTotal && (
                    <span className="text-[12px] font-normal ps-[6px] text-black">
                      (Inclusive of VAT)
                    </span>
                  )}
                </p>
                <Price
                  sizeOffer={
                    isTotal
                      ? "text-18 font-semibold"
                      : "text-14 !text-[#292929]"
                  }
                  offerPrice={item?.value}
                />
              </div>
              {isTotal && youSave > 0 && (
                <div className="flex items-baseline justify-between text-[#006303] text-14">
                  You Save<span></span>{" "}
                  <Price
                    sizeNormal={"text-14 !text-[#006303]"}
                    offerPrice={youSave}
                  />
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
    )
  );
};

export default PriceSummary;
