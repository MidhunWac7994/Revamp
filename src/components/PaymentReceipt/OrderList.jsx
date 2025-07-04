import OrderIdStatus from "./OrderIdStatus";
import Price from "../Price/Price";

const OrderList = ({ orderList, estimatedDelivery }) => {
  return (
    <div
      className="mt-[35px] grid grid-cols-1 tablet:grid-cols-2 laptop:grid-cols-3 gap-x-[60px] tablet:gap-y-[30px]"
      data-widget="OrderList"
    >
      {orderList?.map((item, index) => {
        return (
          <div
            key={index}
            className="w-full flex items-start gap-[18px] laptop:gap-6 group max-tablet:mt-4 max-tablet:pt-4 max-tablet:border-t border-[#E9E9E9] first:mt-0 first:pt-0 first:border-0"
          >
            {item?.product_image && (
              <figure className="relative flex-[0_0_60px] w-full aspect-square bg-gray-bg-1 overflow-hidden">
                <img
                  src={item?.product_image}
                  alt={item?.product_name}
                  className={"object-cover w-full h-full"}
                  sizes="(max-width: 768px) 10vw, (max-width: 1200px) 30vw, 30vw"
                />
              </figure>
            )}
            <div>
              <p className="text-16 text-black line-clamp-1 font-medium leading-5 mb-2">
                {item?.product_name}
              </p>
              {estimatedDelivery?.date && (
                <OrderIdStatus
                  orderStatusText={`${
                    estimatedDelivery?.label || "Arriving in"
                  }: ${estimatedDelivery?.date}`}
                />
              )}
              <div className="mt-2 flex items-center gap-3">
                <p className="text-black text-14 font-medium">
                  Qty: {item?.quantity_ordered}
                </p>
                <Price
                  className="flex items-center gap-1 flex-wrap"
                  offerPrice={item?.product_sale_price?.value}
                  sizeOffer={"!text-16 !font-semibold text-[#233B6B] "}
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OrderList;
