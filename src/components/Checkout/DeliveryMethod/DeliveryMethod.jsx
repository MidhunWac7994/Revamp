import { Check } from "lucide-react";
import Price from "../../Price/Price";
import DeliveryMethodShimmer from "./Shimmer/DeliveryMethodShimmer";

const DeliveryMethod = ({
  title = "Delivery Method",
  shippingMethods,
  selectedMethodCode,
  gettingShippingMethods,
  settingShippingOnCart,
  setShippingMethodOnCart,
}) => {
  if (gettingShippingMethods) return <DeliveryMethodShimmer />;

  return (
    <div data-widget="DeliveryMethod">
      <h3 className="text-18 text-black font-semibold mb-4 tabletPro:mb-5">
        {title}
      </h3>
      <div className="grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-y-[15px] gap-x-4">
        {shippingMethods?.length > 0 ? (
          shippingMethods.map((item) => (
            <button
              disabled={settingShippingOnCart}
              onClick={() =>
                setShippingMethodOnCart(item?.method_code, item?.carrier_code)
              }
              key={item?.method_code}
              className={`${
                selectedMethodCode === item?.method_code
                  ? "bg-[#F3FBFB] border-lw-primary"
                  : "bg-[#F9F9F9] border-[#F9F9F9]"
              } border py-5 px-4 w-full relative flex flex-col transition-all duration-300 hover:bg-[#F3FBFB] hover:border-lw-primary`}
            >
              <h6 className="text-16 font-semibold text-black mb-2">
                {item?.method_title}
              </h6>
              {item?.description && (
                <p className="text-14">{item?.description}</p>
              )}

              <span
                className={`${
                  selectedMethodCode === item?.method_code
                    ? "bg-lw-primary border-lw-primary"
                    : ""
                } w-4 h-4 rounded-[2px] border border-[#8F8F8F] text-white justify-center absolute end-5 top-5 flex items-center`}
              >
                {selectedMethodCode === item?.method_code && (
                  <Check size={10} className="text-black" />
                )}
              </span>

              {!!item?.amount && (
                <div className="mt-4">
                  <Price
                    sizeOffer="!text-14 !text-base-green font-medium"
                    offerPrice={item?.amount}
                  />
                </div>
              )}
            </button>
          ))
        ) : (
          <div className="col-span-3">
            <p className="text-14 text-black">No delivery method available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DeliveryMethod;
