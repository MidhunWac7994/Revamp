import { useParams, useSearchParams, Link } from "react-router-dom";
import usePaymentReceipt from "./usePaymentReceipt";
import { Button } from "../../components/components/ui/button";
import PaymentReceiptSummary from "./PaymentReceiptSummary";
import OrderList from "./OrderList";
import { isObjectEmpty } from "../../utils/objectUtil";
import PaymentReceiptShimmer from "./PaymentReciptShimmer";

const PaymentReceipt = () => {
  const [searchParams] = useSearchParams();
  const { locale } = useParams(); 

  const orderStatus = searchParams.get("status")
    ? Number(searchParams.get("status"))
    : null;

  const orderId = searchParams.get("order_id");

  const {
    orderList,
    billing_address,
    shipping_address,
    customPrices,
    customerinvoice,
    estimatedDelivery,
    storePickupAddress,
    isStorePickup,
    isSignedIn,
    loading,
  } = usePaymentReceipt({
    orderStatus,
    orderId,
  });

  const completed = "/completed.svg";
  const failed = "/failed.svg";
  const statusIcon = !!orderStatus ? completed : failed;

  return (
    <section
      data-widget="PaymentReceipt"
      className="inner-pages tablet:bg-[#F6F6F6] min-h-[calc(100vh-var(--spacing-header-heaight))]"
    >
      <div className="main-container">
        <div className="laptop:py-[90px] tablet:py-10 laptop:max-w-[1255px] mx-auto">
          <div className="bg-white py-8 tablet:px-5 laptop:px-10 laptop:py-7 w-full flex items-center justify-between gap-5">
            <div className="max-mobile:flex max-mobile:items-center max-mobile:flex-col max-mobile:justify-center max-mobile:flex-[0_0_100%]">
              <img
                src={statusIcon}
                alt="order-status"
                width="60"
                height="60"
                sizes="(max-width: 768px) 80vw, (max-width: 1200px) 35vw, 35vw"
                className="mx-auto mobile:hidden mb-5"
              />

              {orderId && (
                <p
                  className={`px-[6px] py-[10px] rounded-[6px] text-14 laptop:text-16 font-medium leading-4 w-fit ${
                    !!orderStatus
                      ? "bg-[#2CB5A71A] text-black"
                      : "bg-[#FFE4E4] text-[#C33737]"
                  }`}
                >
                  Order ID: {orderId}
                </p>
              )}

              <h2 className="mt-3 laptop:mt-[14px] text-2xl max-mobile:text-center laptop:text-[32px] font-semibold text-black leading-6">
                {!!orderStatus ? "Order placed successfully" : "Payment Failed"}
              </h2>

              <p className="mt-3 laptop:mt-[14px] text-14 laptop:text-16 max-mobile:text-center text-black leading-5 laptop:leading-6">
                {!!orderStatus
                  ? `You will receive an email confirmation to ${
                      customerinvoice || ""
                    }`
                  : "There was an issue processing your payment. Please try again."}
              </p>
            </div>

            <div className="ml-60 mr-6 mt-20  flex flex-col gap-y-4 w-full max-w-[270px]">
              {!!orderStatus && isSignedIn && (
                <Button
                  variant="outlineDark"
                  type="button"
                  className="w-full h-12 laptop:h-14  rounded-none border border-black"
                  asChild
                >
                  <Link to={`/${locale}/account/orders/${orderId}`}>
                    Check Order Status
                  </Link>
                </Button>
              )}
              <Button
                variant="primary"
                type="button"
                className="w-full h-12 laptop:h-14  bg-[#53bcb7] text-white rounded-none hover:bg-[#45a9a4]"
                asChild
              >
                <Link to={`/${locale}${!!orderStatus ? "/" : "/cart"}`}>
                  {!!orderStatus ? "Continue shopping" : "Retry Payment"}
                </Link>
              </Button>
            </div>
          </div>

          {loading ? (
            <PaymentReceiptShimmer />
          ) : (
            <>
              {orderList?.length > 0 && (
                <div className="tablet:mt-[30px] bg-white py-[30px] px-5 max-mobile:-mx-5 max-mobile:border-y-[4px] max-mobile:border-[#E7E7E7] laptop:py-[35px] laptop:px-[42px]">
                  <h4 className="text-20 font-semibold text-black">
                    Orders List
                  </h4>
                  <OrderList
                    orderList={orderList}
                    estimatedDelivery={estimatedDelivery}
                  />
                </div>
              )}

              {(customPrices?.length > 0 ||
                !isObjectEmpty(billing_address) ||
                !isObjectEmpty(shipping_address) ||
                !isObjectEmpty(storePickupAddress)) && (
                <PaymentReceiptSummary
                  billing_address={billing_address}
                  shipping_address={shipping_address}
                  customPrices={customPrices}
                  storePickupAddress={storePickupAddress}
                  isStorePickup={isStorePickup}
                />
              )}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default PaymentReceipt;
