import { isObjectEmpty } from "../../utils/objectUtil";

const PaymentAddressItem = ({ address, title }) => {
  const formattedAddress = [
    address?.region,
    address?.city,
    address?.street?.join(" "),
  ]
    ?.filter(Boolean)
    ?.join(", ");

  return (
    !isObjectEmpty(address) && (
      <div
        className="max-tablet:flex-[0_0_100%] group first:m-0 first:p-0 first:border-0 flex-1 max-tabletPro:mt-5 max-tabletPro:pt-5 max-tabletPro:border-t tabletPro:ps-4 tabletPro:ms-4 laptop:ps-14 laptop:ms-14 tabletPro:border-s border-[#E6E6E6]"
        data-widget="PaymentAddressItem"
      >
        <h4 className="mb-4 text-20 font-semibold text-black ">{title}</h4>
        <p className="text-16 font-medium text-black leading-6">{`${address?.firstname} ${address?.lastname}`}</p>
        <p className="text-16 mt-[2px] text-black leading-6">
          {formattedAddress}
        </p>
        {address?.telephone && (
          <p className="mt-4 text-16 font-[#656568]">
            Mobile:{" "}
            <span className="text-16 font-medium text-black">
              {address?.telephone}
            </span>
          </p>
        )}
        {address?.email && (
          <p className="mt-1 text-16 font-[#656568]">
            Email:{" "}
            <span className="text-16 font-medium text-black">
              {address?.email}
            </span>
          </p>
        )}
        {address?.estimated && (
          <p className="mt-4 text-16 font-[#656568]">
            Estimated delivery:{" "}
            <span className="text-16 font-medium text-lw-primary">
              {address?.estimated}
            </span>
          </p>
        )}
      </div>
    )
  );
};

export default PaymentAddressItem;
