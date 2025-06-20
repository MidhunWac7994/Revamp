import { useMutation } from "@apollo/client";
import { toast } from "sonner";
import { UPDATE_CART_ITEM } from '../CartRemoveItem/RemoveCartQuery';
import { CURRENCY_CODE } from '../../Constants'
import useCartConfig from '../../../CustomHook/useCartConfig';

const useCartItemCounter = (props) => {
  const { quantity = 1, uid, mutateCartItems, mutateCartPrices } = props;
  const { cartId } = useCartConfig();

  const [updateCartItem, { loading: updatingCount }] = useMutation(
    UPDATE_CART_ITEM,
    {
      onCompleted: (data) => {
        if (data) {
          const ecommerce = {
            cart_value: data?.updateCartItems?.cart?.prices?.grand_total?.value,
            currency: CURRENCY_CODE,
          };
       
        }
      },
      onError: (err) => {
        console.error(err);
        toast.error("Error updating cart item", {
          description: err.message,
          duration: 3000,
        });
      },
    }
  );

  const updateItemQty = async (newQuantity) => {
    if (!uid || !cartId) return;

    try {
      await updateCartItem({
        variables: {
          cart_id: cartId,
          cart_item_uid: uid,
          quantity: newQuantity,
        },
      });

      
      mutateCartItems?.();
      mutateCartPrices?.();
    } catch (e) {
      console.error("Error updating item quantity", e);
    }
  };

  const handleUpdateIncrement = () => {
    updateItemQty(quantity + 1);
  };

  const handleUpdateDecrement = () => {
    if (quantity > 1) updateItemQty(quantity - 1);
  };

  return {
    handleUpdateIncrement,
    handleUpdateDecrement,
    updatingCount,
  };
};

export default useCartItemCounter;
