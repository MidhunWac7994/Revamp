import useRemoveCartItem from "./useRemoveCartItem";
import { Button } from "../../../components/components/ui/button";
import Price from "../../Price/Price";
import Spinner from "../../Spinner/Spinner";
import { useGlobalData } from "../../../CustomHook/useGlobalData";
import ForLoginUser from "./ForLoginUsers/ForLoginUser";

const CartRemoveDialog = (props) => {
  const {
    setFalse,
    mutateLocalApi,
    itemsForGtm,
    product,
    isCheckout,
    toggleMiniCart,
  } = props;
  const { isSignedIn } = useGlobalData();
  const itemsId = product?.length > 0 && product?.map((ele) => ele?.id);
  const productsToWishlist =
    product?.length > 0 &&
    product?.map((ele) => ({ sku: ele?.sku, quantity: 1 }));

  const { handleRemove, deletingItem } = useRemoveCartItem({
    itemId: itemsId,
    setFalse,
    refetchQueries: ["GetCartItemCount", "GetCartUniqueId"],
    mutateLocalApi,
    itemsForGtm,
    isCheckout,
    toggle: toggleMiniCart,
  });

  return (
    product?.length > 0 && (
      <>
        <div
          data-widget="CartRemoveDialog"
          className="max-h-[250px] laptop:max-h-[50vh] desktop-xl:max-h-[60vh] overflow-y-auto search-wrap group mt-7"
        >
          {product?.map((ele) => (
            <div
              key={ele?.id}
              className="flex gap-x-5 items-center mb-6 pb-6 laptop:mb-7 laptop:pb-7 border-b border-b-border-color last:mb-0 last:pb-0 last:border-b-0 "
            >
              <figure className="flex-[0_0_100px] relative max-w-[100px] aspect-square">
                <img
                  src={ele?.image}
                  alt={ele?.name}
                  className="object-cover w-full h-full"
                  sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 20vw"
                />
              </figure>
              <div>
                <p className="text-16 font-medium text-black leading-5">
                  {ele?.name}
                </p>
                <Price
                  sizeNormal={"text-13 font-normal"}
                  sizeOffer={"text-14 tablet:text-15"}
                  className={"flex flex-col mt-[6px]"}
                  regularPrice={
                    ele?.normalPrice > ele?.offerPrice ? ele?.normalPrice : 0
                  }
                  offerPrice={ele?.offerPrice}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-center mt-[18px] pt-6 border-t border-[#EFEFEF] gap-4 max-mobile:gap-2">
          {isSignedIn && isCheckout ? (
            <ForLoginUser
              handleRemove={handleRemove}
              deletingItem={deletingItem}
              productsToWishlist={productsToWishlist} // Fixed typo
            />
          ) : (
            <Button
              variant={"primary"}
              className="flex-1 h-[50px] text-white bg-[#53bcb7] px-2 rounded-none"
              onClick={handleRemove}
              disabled={deletingItem}
            >
              {deletingItem ? (
                <Spinner className="border-white" />
              ) : (
                "Yes, Remove"
              )}
            </Button>
          )}
          <Button
            variant={"outline"}
            className="flex-1 h-[50px] px-2 border-black hover:bg-black hover:text-white rounded-none"
            onClick={setFalse}
            disabled={deletingItem}
          >
            {isCheckout ? "Back to Home Delivery" : "Cancel"}
          </Button>
        </div>
      </>
    )
  );
};

export default CartRemoveDialog;
