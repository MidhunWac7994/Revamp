import { useMutation } from "@apollo/client";
import useCartConfig from '../../CustomHook/useCartConfig'; 
import useRemoveCartItem from '../../components/Cart/CartRemoveItem/useRemoveCartItem';
import { REMOVE_SAVED_PRODUCTS, SAVE_FOR_LATER } from '../../components/Cart/GetCartDetailQuery';
import { toast } from "sonner";

const useSaveForLater = ({
  id,
  itemId,
  refetchQueries,
  setFalse,
  isCartGoingEmpty,
  isCart,
  mutateLocalApi,
}) => {
  const { cartId } = useCartConfig();

  const { handleRemove, deletingItem } = useRemoveCartItem({
    itemId,
    isSavedForLater: true,
    refetchQueries,
    setFalse,
    isCartGoingEmpty,
    isCart,
    mutateLocalApi,
  });

  const [saveForLaterMutation, { loading: savingForLater }] = useMutation(
    SAVE_FOR_LATER,
    {
      onCompleted: () => {
        handleRemove();
      },
      onError: (err) => {
        console.error(err);
        toast.error(err?.message, { id: "Error in saving for later" });
      },
      refetchQueries: ["GetSavedProducts"],
    }
  );

  const [removeSavedMutation, { loading: removing }] = useMutation(
    REMOVE_SAVED_PRODUCTS,
    {
      onError: (err) => {
        console.error(err);
        toast.error(err?.message, { id: "Error in removing saved" });
      },
    }
  );

  const handlesaveForLater = async () => {
    await saveForLaterMutation({
      variables: {
        cartId: cartId,
        productsId: id,
      },
    });
  };

  const handleRemoveSaved = async (id) => {
    await removeSavedMutation({
      variables: {
        cartId: cartId,
        productsId: id,
      },
    });
    mutateLocalApi?.();
  };

  const deletingAfterSave = savingForLater || deletingItem;

  return {
    handlesaveForLater,
    savingForLater,
    handleRemoveSaved,
    removing,
    deletingAfterSave,
  };
};

export default useSaveForLater;
