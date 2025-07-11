import { Switch } from "../components/ui/switch";
import { formatAddressDetails } from "../../utils/formatAddressDetail";
import UpdateAddress from "../UpdateAddress/UpdateAddress";
import DeleteAddress from "./DeleteAddress/DeleteAddress";
import { Check } from "lucide-react";
import ChangeAddress from "../Checkout/ChangeAddress/ChangeAddress";

const AddressItem = (props) => {
  const {
    isAccountPage,
    address = {},
    mutateCustomerAddress,
    handleUpdateDefaultAddress,
    checked,
    addressIdOnCart,
    noCheck,
    updateAddressOnCart,
    setDefaultAddress,
    activeAddress,
  } = props;

  const Component = isAccountPage ? "div" : "button";
  const { telephone, type_of_address, id } = address;
  const { fullName, fullAddress } = formatAddressDetails(address);

  return (
    <div
      data-widget="AddressItem"
      className={`relative transition ease-in-out duration-300 ${
        isAccountPage
          ? "bg-white p-6 rounded-[4px] border border-[#E2E2E2] hover:border-lw-primary flex flex-col h-full justify-between"
          : "bg-[#F5F5F5] p-5 h-full"
      }`}
    >
      <Component
        className="w-full text-left"
        {...(typeof updateAddressOnCart === "function" && {
          onClick: () => updateAddressOnCart(id),
        })}
      >
        <div className="max-w-[75%]">
          <div className="flex items-center flex-wrap gap-x-2 mb-3">
            {fullName && <p className="text-16 text-black">{fullName}</p>}
            {type_of_address !== undefined && type_of_address !== null && (
              <span className="flex items-center justify-center rounded-[50px] text-13 bg-[#B0B0B0]/30 px-2 min-w-[64px] h-[28px]">
                {type_of_address === 0 ? "Home" : "Office"}
              </span>
            )}
          </div>
          {fullAddress && (
            <p className="text-15 text-[#4B4B4B]">{fullAddress}</p>
          )}
          {telephone && (
            <p className="text-15 text-[#4B4B4B] mt-3">Mobile: {telephone}</p>
          )}
        </div>

        {!noCheck && (
          <>
            {isAccountPage ? (
              <div
                className={`${
                  checked === id ? "bg-lw-primary border-lw-primary" : ""
                } w-4 h-4 rounded-[2px] border border-[#8F8F8F] text-white justify-center absolute end-5 top-5 flex items-center`}
              >
                <Switch
                  className="data-[state=checked]:bg-lw-primary"
                  checked={checked === id}
                  onCheckedChange={(checked) =>
                    handleUpdateDefaultAddress(checked, id)
                  }
                />
              </div>
            ) : (
              <span
                className={`${
                  activeAddress ? "bg-lw-primary border-lw-primary" : ""
                } w-4 h-4 rounded-[2px] border border-[#8F8F8F] text-white justify-center absolute end-5 top-5 flex items-center`}
              >
                {activeAddress && <Check size={12} className="text-black" />}
              </span>
            )}
          </>
        )}
      </Component>

      {isAccountPage ? (
        <div className="flex items-center justify-end gap-2 mt-3">
          <UpdateAddress
            address={address}
            mutateCustomerAddress={mutateCustomerAddress}
            triggerBtnLabel="Edit"
            triggerBtnClass="min-w-auto h-[35px] !text-14 font-medium"
            setDefaultAddress={setDefaultAddress}
          />
          <DeleteAddress
            id={id}
            mutateCustomerAddress={mutateCustomerAddress}
          />
        </div>
      ) : (
        !noCheck && (
          <ChangeAddress
            address={address}
            triggerBtnLabel="Change"
            triggerBtnClass="absolute end-5 bottom-5 min-w-auto h-[35px] rounded-[5px] !text-13 font-light"
            updateAddressOnCart={updateAddressOnCart}
            mutateCustomerAddress={mutateCustomerAddress}
          />
        )
      )}
    </div>
  );
};

export default AddressItem;
