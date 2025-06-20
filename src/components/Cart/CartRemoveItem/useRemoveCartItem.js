import { useMutation, useApolloClient } from "@apollo/client";
import { DELETE_CART_ITEM } from './RemoveCartQuery';
import useCartConfig from '../../../CustomHook/useCartConfig';
import { gtagEvent } from '../../../utils/gtagUtilities'
import { REMOVE_FROM_CART_GTM_EVENT } from '../../Constants';
import { useGlobalData } from '../../../CustomHook/useGlobalData';
import { toast } from "sonner";
import { useSearchParams } from "react-router-dom";

const useRemoveCartItem = ({
  itemId,
  refetchQueries = [],
  setFalse,
  itemsForGtm,
  mutateLocalApi,
  isCheckout,
  toggle,
}) => {
  const { cartId } = useCartConfig();
  const { userDetailsDataLayer } = useGlobalData();
  const [searchParams, setSearchParams] = useSearchParams();
  const client = useApolloClient();

  const [deleteCartItem, { loading: deletingItem }] = useMutation(
    DELETE_CART_ITEM,
    {
      onCompleted: (data) => {
        setFalse?.();

        gtagEvent({
          event: REMOVE_FROM_CART_GTM_EVENT,
          ecommerce: {},
          items: [{ ...itemsForGtm }],
          user: userDetailsDataLayer,
        });

        mutateLocalApi();

        const totalQty =
          data?.removeMultipleItemsFromCart?.cart?.total_quantity || 0;
        if (totalQty === 0) toggle?.();

        if (isCheckout) {
          searchParams.set("type", "storepickup");
          setSearchParams(searchParams, { replace: true });
        }

        // Refetch queries using Apollo
        refetchQueries.forEach((query) => {
          client.refetchQueries({
            include: [query],
          });
        });
      },
      onError: (err) => {
        console.error(err);
        toast.error(err.message);
      },
    }
  );

  const handleRemove = async () => {
    await deleteCartItem({
      variables: {
        cartId,
        cartItemsId: itemId,
      },
    });
  };

  return { handleRemove, deletingItem };
};

export default useRemoveCartItem;
