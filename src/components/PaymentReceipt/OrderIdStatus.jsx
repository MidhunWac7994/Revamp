const OrderIdStatus = (props) => {
  const { orderId, orderStatusText, orderStatus } = props;
  let orderStatusColor = "";

  switch (orderStatus) {
    case "progress":
      orderStatusColor = "#FFB200";
      break;
    case "delivered":
      orderStatusColor = "#318000";
      break;
    case "refund":
      orderStatusColor = "#FFB200";
      break;
    case "refundComplete":
      orderStatusColor = "#00B4B7";
      break;
    case "cancelled":
      orderStatusColor = "#FA0000";
      break;
    default:
      orderStatusColor = "#FFB200";
      break;
  }

  return (
    <div className="flex items-center flex-wrap gap-2 justify-between">
      {orderId && (
        <div className="p-[6px] bg-[#F4F4F4] rounded-[6px] ">
          <p className="text-black text-[12px] leading-4 tracking-wide font-medium ">
            ORDER ID : {orderId}
          </p>
        </div>
      )}
      {orderStatusText && (
        <div className="flex items-center gap-[7px]">
          <span
            className="size-[11px] rounded-full "
            style={{ backgroundColor: orderStatusColor }}
          ></span>
          <p className="text-14 font-medium text-black tracking-wide">
            {orderStatusText}
          </p>
        </div>
      )}
    </div>
  );
};

export default OrderIdStatus;
