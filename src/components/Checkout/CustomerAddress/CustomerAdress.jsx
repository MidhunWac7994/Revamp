import AddressCheckout from "../AddressCheckout/AdressCheckout";
import DeliveryType from "../DeliveryType/DeliveryType";
import StorePickup from "../StorePickUp/StorePickUp";
import { useCheckoutContext } from "../../Checkout/CheckoutProvider/CheckoutProvider";

const CustomerAddress = () => {
  const {
    purchaseMethod,
    updatePurchaseMode,
    cartItems,
    mutateCartItemsCheckout,
    mutateCartPrices,
  } = useCheckoutContext();

  const handleDeliveryType = (id) => {
    if (id === "home_delivery") {
      updatePurchaseMode(null);
    }
    if (id === "storepickup") {
      updatePurchaseMode("storepickup");
    }
  };

  return (
    <>
      <DeliveryType
        cartItems={cartItems}
        purchaseMethod={purchaseMethod}
        handleDeliveryType={handleDeliveryType}
        mutateCartItemsCheckout={mutateCartItemsCheckout}
        mutateCartPrices={mutateCartPrices}
      />
      {purchaseMethod === "home_delivery" ? (
        <AddressCheckout handleDeliveryType={handleDeliveryType} />
      ) : (
        <StorePickup handleDeliveryType={handleDeliveryType} />
      )}
    </>
  );
};

export default CustomerAddress;
