import OrderSummary from "../../../components/Cart/OrderSummary/OrderSummary";
import { useCheckoutContext } from "../CheckoutProvider/CheckoutProvider";
import Price from "../../Price/Price";

const CheckoutSummary = () => {
  const { customPrices, totalQuantity, prices, cartItems } =
    useCheckoutContext();

  return (
    <div className="max-tabletPro:mt-[30px] tabletPro:max-w-[395px] w-full border border-border-color px-6 py-8 sticky top-[calc(var(--spacing-header-heaight)+30px)] bg-white">
      <OrderSummary
        isCheckout
        totalQuantity={totalQuantity}
        prices={prices}
        customPrices={customPrices?.prices}
        title="Order Summary"
        checkoutProducts={
          cartItems?.length > 0 ? (
            <div className="mt-6 mb-6 pb-6 border-b border-[#E9E9E9] laptop:max-h-[350px] overflow-y-auto search-wrap pe-1">
              {cartItems.map((item, index) => (
                <div
                  className={`flex items-center gap-[10px] ${
                    index === 0 ? "" : "mt-4 pt-4 border-t border-[#E9E9E9]"
                  }`}
                  key={item?.id}
                >
                  <figure className="relative flex-[0_0_60px] w-[60px] h-[60px] bg-[#f5f5f5] overflow-hidden">
                    <img
                      src={item?.product?.thumbnail?.url}
                      alt={item?.product?.name}
                      className="w-full h-full object-cover"
                    />
                  </figure>
                  <div className="flex-1">
                    <p className="text-14 font-medium text-black leading-5 line-clamp-1">
                      {item?.product?.name}
                    </p>
                  </div>
                  <div className="flex flex-col items-end">
                    <Price
                      className="flex flex-col items-end"
                      sizeOffer="!text-15 text-black font-semibold"
                      sizeNormal="!text-14 text-[#7D7D7D]"
                      regularPrice={
                        item?.strike_price > item?.prices?.row_total?.value
                          ? item?.strike_price
                          : 0
                      }
                      offerPrice={item?.prices?.row_total?.value}
                    />
                  </div>
                </div>
              ))}
            </div>
          ) : null
        }
      />
    </div>
  );
};

export default CheckoutSummary;
