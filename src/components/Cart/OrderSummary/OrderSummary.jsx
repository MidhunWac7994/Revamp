import { ShieldCheck } from "lucide-react";
import PriceSummary from "../../PriceSummary/PriceSummary";
import CartButtons from "../CartButtons/CartButtons";

const OrderSummary = (props) => {
  const {
    isCheckout,
    isInStock,
    customPrices,
    totalQuantity,
    grandTotal,
    checkoutProducts,
    title = "Order Summary",
    mutateCartItems,
    mutateCartPrices,
  } = props;

  const hasTotal =
    customPrices?.length > 0 &&
    customPrices?.some(
      (item) => item?.id === "grand_total" || item?.class_name === "grand_total"
    );

  return (
    (customPrices?.length > 0 || hasTotal) && (
      <div data-widget="OrderSummary" className="w-full">
        <div className="border border-gray-200  p-6 ">
          <h4 className="text-20 text-black font-medium mb-6">{title}</h4>

          {checkoutProducts}
          <PriceSummary customPrices={customPrices} />

          {!isCheckout && (
            <CartButtons
              mutateCartItems={mutateCartItems}
              mutateCartPrices={mutateCartPrices}
              totalQuantity={totalQuantity}
              grandTotal={grandTotal}
              isInStock={isInStock}
            />
          )}

          {/* {!isInStock && !isCheckout && (
            <p className="mt-6 w-full bg-[#FFE2E2] text-[#DE4141] p-2 text-16 leading-5">
              Remove the out of stock product to continue Checkout
            </p>
          )} */}

          {!isCheckout && (
            <div className="flex items-center gap-x-2 mt-5">
              <div className="w-7">
                <ShieldCheck size={23} className="text-[#504F4F]" />
              </div>

              <div className="w-full text-13 text-[#504F4F] font-light">
                <p>100% Safe and Secure Payments · Easy Returns</p>
                <p>100% Authentic Products</p>
              </div>
            </div>
          )}
        </div>
      </div>
    )
  );
};

export default OrderSummary;
