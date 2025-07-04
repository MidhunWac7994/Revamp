import PaymentAddressItem from "./PaymentAddressItem";
import PriceSummary from "../PriceSummary/PriceSummary";

const PaymentReceiptSummary = (props) => {
  const {
    billing_address = {},
    shipping_address = {},
    customPrices = [],
    storePickupAddress,
    isStorePickup,
  } = props;

  return (
    <div
      data-widget="PaymentReceiptSummary"
      className="tablet:mt-[30px] py-[30px] tablet:p-5 laptop:p-8 bg-white flex max-tabletPro:flex-wrap "
    >
      <PaymentAddressItem
        address={shipping_address}
        title={("Shipping Address")}
      />
      <PaymentAddressItem
        address={billing_address}
        title={("Billing Address")}
      />
      {isStorePickup && (
        <div
          className="max-tablet:flex-[0_0_100%] flex-1 m-1"
          data-widget="StorePickupAddress"
        >
          <h4 className="mb-4 text-20 font-semibold text-black ">
            {("Store Details")}
          </h4>
          <p className="text-16 font-medium text-black leading-6">
            {storePickupAddress?.name}
          </p>
          <p className="text-16 mt-[2px] text-black leading-6">
            {storePickupAddress?.street}
          </p>
          <p className="mt-4 text-16 font-medium text-black leading-6">
            {storePickupAddress?.full_name}
          </p>
          {storePickupAddress?.phone_number && (
            <p className="text-16 font-[#656568]">
              {("Mobile")}:{" "}
              <span className="text-16 font-medium text-black">
                {storePickupAddress?.phone_number}
              </span>
            </p>
          )}
        </div>
      )}

      {customPrices?.length > 0 && (
        <div className="max-tabletPro:flex-[0_0_100%] flex-1 max-tabletPro:mt-5 max-tabletPro:pt-5 max-tabletPro:border-t tabletPro:ps-4 tabletPro:ms-4 laptop:ps-14 laptop:ms-14 tabletPro:border-s border-[#E6E6E6]">
          <h4 className="mb-4 text-20 font-semibold text-black ">
            {("Price Details")}
          </h4>
          <PriceSummary customPrices={customPrices} />
        </div>
      )}
    </div>
  );
};

export default PaymentReceiptSummary;
