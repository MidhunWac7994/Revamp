import { useRef } from "react";
import { useSetAtom, useAtom } from "jotai";
import { toast } from "sonner";
import { useMutation } from "@apollo/client";
import { useSearchParams, useNavigate } from "react-router-dom";

import { authTokenAtom } from "@/Jotai/authAtom";
import { cartIdAtom } from "../../../../Jotai/cartIdAtom";
import { LOGIN_WITH_PASSWORD } from "../AuthLogin/AuthLoginQuery";
import { useAuthContext } from "../../useAuth";
import useRequestOtp from "../useRequestOtp";
import useNewCart from "../../../../CustomHook/useNewcart";

const useAuthLogin = (onClose) => {
  const formApiRef = useRef(null);
  const { username, handleAuthView, formDataRef } = useAuthContext();
  const setToken = useSetAtom(authTokenAtom);
  const [cartId, setCartId] = useAtom(cartIdAtom);
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
          console.log("✅ Login successful, token:", token);
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
              sourceCartId: cartId,
              destinationCartId: newCartId,
            });

            let finalCartId = mergeCarts?.id || newCartId;
            console.log("✅ finalCartId:", finalCartId);
            setCartId(finalCartId);
            localStorage.removeItem("guest_cart_id");
          } catch (cartError) {
            console.error("❌ Cart setup failed:", cartError);
          }

          // Debug onClose
          console.log("🔍 onClose type:", typeof onClose);
          if (typeof onClose === "function") {
            console.log("🔍 Calling onClose");
            onClose();
          } else {
            console.warn("⚠️ onClose is not a function:", onClose);
          }
        } else {
          toast.error(message || "Login failed", {
            id: "sign-in-pass-error",
          });
        }
      },
      onError: (err) => {
        console.error("❌ Login error:", err);
        toast.error(err.message || "Something went wrong", {
          id: "login-error",
        });
      },
    }
  );

  const handleSubmit = async (formValues) => {
    console.log("🔍 Submitting form with username:", username);
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
