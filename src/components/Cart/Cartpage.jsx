import { useEffect } from "react";
import CartPageShimmer from "./CartPageShimmer";
import EmptyPages from "../EmptyPages/EmptyPages";
import useCartItemsSummary from "../../CustomHook/useCartItemsSummary";
import useCartCustomPrice from "../../CustomHook/useCartCustomPrice";
import useCart from "./useCart";
import useSaveForLater from "../../components/SaveForLaterbutton/useSaveForLaterbutton";
import { Link } from "react-router-dom";
import CartItem from "./CartItem/CartItem";

const CartPage = () => {
  // ✅ All hooks must be declared unconditionally at the top
  const {
    data,
    loading,
    error,
    cartItems,
    totalQuantity,
    mutateCartItems: refetchCartItems,
  } = useCartItemsSummary();

  const {
    customPrices,
    grandTotal,
    loading: customPriceLoading,
    refetch: refetchCartPrices,
  } = useCartCustomPrice();

  const {
    saveForLaterProducts,
    saveForLaterLoading,
    refetchSaveForLater,
    recommendedCartProduct,
    recommendedCartLoading,
  } = useCart();

  const mutateLocalApi = () => {
    refetchCartItems?.();
    refetchCartPrices?.();
    refetchSaveForLater?.();
  };

  const { handleRemoveSaved } = useSaveForLater({ mutateLocalApi });

  const emptyCart =
    (!cartItems?.length && !saveForLaterProducts?.savedProducts?.length) ||
    (error && !saveForLaterProducts?.savedProducts?.length);

  useEffect(() => {
    document.body.classList.add("mobile-bottom-space");
    return () => document.body.classList.remove("mobile-bottom-space");
  }, []);

  // ✅ Conditional UI rendering AFTER all hooks
  if (loading && !totalQuantity) {
    return <CartPageShimmer />;
  }

  if (emptyCart) {
    return (
      <div className="main-container inner-pages overflow-hidden">
        <EmptyPages
          icon={"/empty-cart.svg"}
          iconWidth="148"
          iconHeight="148"
          title="Your cart is empty"
          subTitle="Check out what’s trending now"
          buttonLabel="Back to Home"
        />
      </div>
    );
  }

  return (
    <div
      data-widget="CartPage"
      className="inner-pages max-mobile:!pt-mob-header-heaight pb-[30px] tablet:pb-[50px] laptop:pb-[100px] relative min-h-[50vh]"
    >
      <div className="main-container">
        <Link
          to="/"
          className="gap-x-2 hidden tablet:flex items-center text-14 text-black tracking-wider transition-all hover:text-lw-primary duration-300"
        >
          ← Back to Shopping
        </Link>

        {cartItems?.length > 0 && (
          <div className="laptop:max-w-[1265px] py-6 m-auto laptop:py-[60px] flex max-tabletPro:flex-wrap gap-x-10 items-start max-mobile:-mx-5">
            <div className="w-full flex-[1_1_0] max-mobile:mx-5">
              <div className=" hidden tablet:flex items-end gap-x-2 mb-10 desktop:mb-[60px]">
                <h1 className="text-title-26 laptop:text-title-30 desktop:text-title-36 text-black font-lora leading-11">
                  Shopping Cart
                </h1>
                <span className="text-14 text-gray-text font-medium leading-7">
                  ({totalQuantity} {totalQuantity > 1 ? "Items" : "Item"})
                </span>
              </div>

              {cartItems.map((cartItem) => (
                <div className="flex flex-col group" key={cartItem?.id}>
                  <CartItem
                    cartItem={cartItem}
                    cartItems={cartItems}
                    mutateCartItems={refetchCartItems}
                    mutateCartPrices={refetchCartPrices}
                    mutateSaveForLater={refetchSaveForLater}
                  />
                </div>
              ))}
            </div>

            <div className="max-tabletPro:flex-[0_0_100%] max-mobile:border-y-4 max-mobile:border-[#F4F4F4] tabletPro:max-w-[395px] tablet:w-full mobile:border mobile:border-border-color px-5 tablet:px-6 py-6 tablet:py-8 tablet:sticky tablet:top-[calc(var(--spacing-header-heaight)+30px)] mobile:mt-6 tabletPro:mt-0">
              {/* Order Summary / Coupon Components */}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;


// import React from 'react'
// import useCartItemsSummary from "../../CustomHook/useCartItemsSummary";
// const Cartpage = () => {
//   const { data, loading, error } = useCartItemsSummary();
//   if (loading) return "loading";
//   if (error) {
//     console.log(error, "error fetching cart data");
//   }
//   console.log("dataaaa", data?.cart?.items);
//   return (
//     <div>

//     </div>
//   )
// }

// export default Cartpage
