// File: useAuthLogin.js
import { useRef } from "react";
import { useSetAtom } from "jotai";
import { toast } from "sonner";
import { useMutation } from "@apollo/client";
import { useSearchParams, useNavigate } from "react-router-dom";

import { authTokenAtom } from "@/Jotai/authAtom";
import { cartIdAtom } from "../../../../Jotai/cartIdAtom";
import { LOGIN_WITH_PASSWORD } from "../AuthLogin/AuthLoginQuery";
import { useAuthContext } from "../../useAuth";
import useRequestOtp from "../useRequestOtp";
import useNewCart from "../../../../CustomHook/useNewcart";

const useAuthLogin = (onSuccess) => {
  const formApiRef = useRef(null);
  const { username, handleAuthView, formDataRef } = useAuthContext();
  const setToken = useSetAtom(authTokenAtom);
  const setCartId = useSetAtom(cartIdAtom);
  const { createCart, mergeCart } = useNewCart();

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const clearAuthParam = () => {
    searchParams.delete("auth");
    navigate(`?${searchParams.toString()}`);
    console.log("✅ Cleared auth param from URL");
  };

  const {
    requestWhatsAppOtp,
    loadingOtp,
    requestLoginOtp,
    loadingWhatsAppOtp,
  } = useRequestOtp({
    formApiRef,
    handleAuthView,
    username,
    resend: false,
    formDataRef,
  });

  const [loginWithPassword, { loading: loggingInUsingPassword }] = useMutation(
    LOGIN_WITH_PASSWORD,
    {
      onCompleted: async (response) => {
        const { status, token, message } = response?.loginUsingPassword || {};

        if (status) {
          setToken(token);
          clearAuthParam();
          formApiRef?.current?.reset();
          toast.success(message || "Login successful", {
            id: "sign-in-pass-success",
          });

          try {
            const guestCartId = localStorage.getItem("guest_cart_id");
            const { cartId: newCartId } = await createCart();

            const { mergeCarts } = await mergeCart({
              sourceCartId: guestCartId,
              destinationCartId: newCartId,
            });

            let finalCartId = mergeCarts?.id || newCartId;
            console.log(finalCartId, "finalCartId");
            setCartId(finalCartId);
            // localStorage.setItem("customer_cart_id", finalCartId);
            localStorage.removeItem("guest_cart_id");
          } catch (cartError) {
            console.error("❌ Cart setup failed:", cartError);
          }

          if (typeof onSuccess === "function") {
            onSuccess();
          }
        } else {
          toast.error(message || "Login failed", {
            id: "sign-in-pass-error",
          });
        }
      },
      onError: (err) => {
        toast.error(err.message || "Something went wrong", {
          id: "login-error",
        });
      },
    }
  );

  const handleSubmit = async (formValues) => {
    const { password } = formValues.values;
    loginWithPassword({
      variables: {
        value: username,
        password,
      },
    });
  };

  return {
    formApiRef,
    handleAuthView,
    handleSubmit,
    loading: loggingInUsingPassword,
    loadingOtp,
    loadingWhatsAppOtp,
    requestLoginOtp,
    requestWhatsAppOtp,
    username,
  };
};

export default useAuthLogin;
