import React, { Suspense, lazy } from "react";
import CartPageShimmer from '../../components/Cart/CartPageShimmer';


const CartPage = lazy(() => import("../../components/Cart/Cartpage"));

const Cart = () => {
  return (
    <Suspense fallback={<CartPageShimmer />}>
      <CartPage />
    </Suspense>
  );
};

export default Cart;
