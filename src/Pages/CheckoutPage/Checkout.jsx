import React, { Suspense, lazy } from "react";
import FullPageLoader from "../../components/FullPageLoader/FullPageLoader";
import ProtectedRoute from "../../components/ProtectedRoute/ProtectedRoute";
import useCustomerAddress from "../../CustomHook/useCustomerAdress";

const Checkout = lazy(() => import("../../components/Checkout/CheckoutPage"));

const CheckoutPage = () => {
  const customerAddress = useCustomerAddress();

  return (
    <Suspense fallback={<FullPageLoader />}>
      <ProtectedRoute>
        <Checkout customerAddress={customerAddress} />
      </ProtectedRoute>
    </Suspense>
  );
};

export default CheckoutPage;