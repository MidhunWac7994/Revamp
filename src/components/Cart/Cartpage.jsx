import { useEffect } from "react";
import CartPageShimmer from "./CartPageShimmer";
import EmptyPages from "../EmptyPages/EmptyPages";
import useCartItemsSummary from "../../CustomHook/useCartItemsSummary";
import useCartCustomPrice from "../../CustomHook/useCartCustomPrice";
import useCart from "./useCart";
import useSaveForLater from "../../components/SaveForLaterbutton/useSaveForLaterbutton";
import { Link } from "react-router-dom";
import CartItem from "./CartItem/CartItem";
import OrderSummary from "./OrderSummary/OrderSummary";

const CartPage = () => {
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
              <div className="flex items-end gap-x-2 mb-10 desktop:mb-[60px]">
                <h1 className="text-[36px] mt-48 ml-52 text-black font-lora leading-11">
                  Shopping Cart
                </h1>
                <span className="text-14 text-gray-400 font-medium leading-7">
                  ({totalQuantity} {totalQuantity > 1 ? "Items" : "Item"})
                </span>
              </div>

              {cartItems.map((cartItem) => (
                <div className="flex flex-col group ml-72 " key={cartItem?.id}>
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

            <div className="mt-48 mr-52">
              <OrderSummary
                customPrices={customPrices?.prices}
                grandTotal={grandTotal}
                isCart
                totalQuantity={totalQuantity}
                priceLoading={customPriceLoading}
                // isInStock={isInStock}
                // mutateCartItems={mutateCartItems}
                // mutateCartPrices={mutateCartPrices}
              />
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
