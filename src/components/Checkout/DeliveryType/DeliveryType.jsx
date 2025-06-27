import CartRemoveItem from "../../Cart/CartRemoveItem/CartRemoveItem";
import { Checkbox } from "../../components/ui/checkbox";
import { useToggle } from "../../../CustomHook/useToggle"
import { toast } from "sonner";

const DeliveryType = (props) => {
  const {
    purchaseMethod,
    handleDeliveryType,
    cartItems,
    mutateCartItemsCheckout,
    mutateCartPrices,
  } = props;

  const { status, toggle } = useToggle();

  const mutateLocalApi = () => {
    mutateCartItemsCheckout();
    mutateCartPrices();
  };

  const unAvailableItems = getUnavailableItems(cartItems);

  const isStorePickupAvailable = cartItems?.every(
    (item) => item?.product?.store_pickup_available === 1
  );

  const allProductWithoutStorePickup = cartItems?.every(
    (item) => item?.product?.store_pickup_available !== 1
  );

  const updateDeliveryType = (id) => {
    if (isStorePickupAvailable) {
      handleDeliveryType(id);
    } else if (allProductWithoutStorePickup) {
      toast.error("Store pickup is not available for any products.");
    } else {
      toggle();
    }
  };

  return (
    <>
      <div data-widget="DeliveryType">
        <h3 className="text-18 text-black font-semibold mb-5">
          Delivery Method
        </h3>
        <div className="flex items-center space-x-10 border-b border-border-color mb-8 pb-8">
          {DELIVERY_TYPES?.map((item, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Checkbox
                id={item?.id}
                onCheckedChange={() => updateDeliveryType(item?.id)}
                checked={purchaseMethod === item?.id}
                disabled={item?.id === purchaseMethod}
                className="cursor-pointer"
              />
              <label
                htmlFor={item?.id}
                className="text-black text-16 leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
              >
                {item?.label}
              </label>
            </div>
          ))}
        </div>
      </div>
      <CartRemoveItem
        hideButton
        statusCheckout={status}
        toggleCheckout={toggle}
        isCheckout
        mutateLocalApi={mutateLocalApi}
        product={unAvailableItems}
      />
    </>
  );
};

export default DeliveryType;

export const getUnavailableItems = (cartItems) => {
  return cartItems
    ?.filter((item) => item?.product?.store_pickup_available !== 1)
    .map((item) => ({
      id: Number(item?.id),
      quantity: item?.quantity,
      sku: item?.product?.sku,
      name: item?.product?.name,
      image: item?.product?.thumbnail?.url,
      offerPrice: item?.prices?.row_total?.value,
      normalPrice:
        item?.strike_price > item?.prices?.row_total?.value
          ? item?.strike_price
          : 0,
    }));
};

export const DELIVERY_TYPES = [
  {
    id: "home_delivery",
    label: "Home delivery",
    icon: "delivery-truck",
  },
  {
    id: "storepickup",
    label: "Store Pickup",
    icon: "store",
  },
];
