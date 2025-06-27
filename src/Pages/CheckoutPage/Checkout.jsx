import React, { Suspense, lazy } from "react";
// import FullPageLoader from "../../components/FullPageLoader/FullPageLoader";
// import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import useCustomerAddress from "../../CustomHook/useCustomerAdress";

const Checkout = lazy(() => import("../../components/Checkout/CheckoutPage"));

const CheckoutPage = () => {
  const customerAddress = useCustomerAddress();

  return (
    // <Suspense fallback={<FullPageLoader />}>
    //   <ProtectedRoute>
    /* </ProtectedRoute>
    </Suspense> */

    <div className="mt-56">
      <Checkout customerAddress={customerAddress} />
    </div>
  );
};

export default CheckoutPage;