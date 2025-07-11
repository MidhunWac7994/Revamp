import React, { useRef } from "react";
import { useAuthContext } from "../../useAuth";
import { useSetAtom } from "jotai";
import { SIGNUP_RESEND_OTP, SIGNUP_USING_OTP } from "./AuthSignUpQuery";
import { toast } from "sonner";
import { authTokenAtom } from "../../../../Jotai/authAtom";
import useCartConfig from "../../../../CustomHook/useCartConfig";
import useNewCart from "../../../../CustomHook/useNewcart";
import { useMutation } from "@apollo/client";
import { capitalizeFirstLetter } from "../../../../utils/capitalizeFirstLetter";

// Optional: replace this with your actual auth view constant
// import { SIGN_IN_VIEW } from '../../constants/AuthConstants';

const useAuthSignUpOtp = () => {
  const formApiRef = useRef();

  const setToken = useSetAtom(authTokenAtom);
  const { cartId, setCartId } = useCartConfig();
  const { username, handleAuthView, formDataRef } = useAuthContext();

  const { email, firstname, lastname, password, phoneNumber } =
    formDataRef.current || {};

  const { createCart, creatingCart, mergeCart, mergingCart } = useNewCart();

  const [signupResendOtpMutation, { loading: otpResendLoading }] = useMutation(
    SIGNUP_RESEND_OTP,
    {
      onCompleted: (data) => {
        if (data?.sendRegistrationOtp?.status) {
          toast.success(
            data?.sendRegistrationOtp?.message || "OTP sent successfully",
            {
              duration: 8000,
            }
          );
        }
      },
      onError: (error) => {
        toast.error(error.message, { id: "otp resend", duration: 8000 });
      },
    }
  );

  const [registerUsingOtpMutation, { loading: registrationLoading }] =
    useMutation(SIGNUP_USING_OTP);

  const handleRegisterUsingOtp = async (formValues) => {
    const { otp } = formValues.values;

    try {
      const { data } = await registerUsingOtpMutation({
        variables: {
          value: phoneNumber,
          otp,
          firstname: capitalizeFirstLetter(firstname),
          lastname: capitalizeFirstLetter(lastname),
          password,
          email,
        },
      });

      const response = data?.registrationUsingOtp;

      if (response?.status) {
        const token = response.token;
        setToken(token);

        // ✅ Fix: Replace setToggleAuth(null) with handleAuthView(null)
        handleAuthView(null); // or use a view like "LOGIN" depending on your UX

        // 🛒 Create and merge cart
        const createCartResponse = await createCart();
        const destinationCartId = createCartResponse?.cartId;

        const mergeCartResponse = await mergeCart({
          destinationCartId,
          sourceCartId: cartId,
        });

        const newCartId = mergeCartResponse?.mergeCarts?.id;
        setCartId(newCartId);

        if (response.message) {
          toast.success(response.message, { id: "sign in pass success" });
        }
      } else {
        toast.error(response?.message || "Registration failed", {
          id: "registration error",
          duration: 8000,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error(err?.message || "Unexpected error", { duration: 8000 });
    }
  };

  const handleSignUpResendOtp = async () => {
    try {
      await signupResendOtpMutation({
        variables: {
          value: username,
          email,
          is_resend: true,
          recaptchatoken: "string", // replace if you're using reCAPTCHA
          is_whatsapp: true,
        },
      });
    } catch (err) {
      console.error("OTP resend error:", err);
    }
  };

  const handleChange = () => {
    const otp = formApiRef.current?.getValue("otp");
    if (otp?.length === 4 && !registrationLoading) {
      formApiRef.current?.submitForm();
    }
  };

  const loading =
    otpResendLoading || creatingCart || mergingCart || registrationLoading;

  const handleEdit = () => {
    handleAuthView("SIGN_UP_VIEW"); // replace with constant if available
  };

  return {
    handleRegisterUsingOtp,
    handleSignUpResendOtp,
    loading,
    username,
    handleEdit,
    handleChange,
    formApiRef,
  };
};

export default useAuthSignUpOtp;
