import { useRef } from 'react'
import { useAuthContext } from '../../useAuth';
import { useSetAtom } from 'jotai';
import { authTokenAtom } from  '../../../../Jotai/authAtom'
import useRequestOtp from '../useRequestOtp';
import { useSearchParams } from 'react-router-dom';
import useNewCart from  '../../../../CustomHook/useNewcart'
import { LOGIN_WITH_OTP } from './LoginWithOtpQuery';
import useCartConfig from '../../../../CustomHook/useCartConfig'
import { useMutation } from '@apollo/client';
import { toast } from 'sonner';

const useAuthLoginOtp = () => {
  const formApiRef = useRef(null);
  const { username, handleAuthView, formDataRef } = useAuthContext();
  const setToken = useSetAtom(authTokenAtom);
  const [searchParams, setSearchParams] = useSearchParams();
  const { cartId, setCartId } = useCartConfig();

  const {
    requestWhatsAppOtp,
    loadingOtp,
    requestLoginOtp,
    loadingWhatsAppOtp,
  } = useRequestOtp({
    formApiRef,
    handleAuthView,
    username,
    resend: true,
    formDataRef,
  });

  const { whatsAppOtp } = formDataRef.current || {};
  const { createCart, creatingCart, mergeCart, mergingCart } = useNewCart();

  const [loginWithOtp, { loading: loginLoading }] = useMutation(LOGIN_WITH_OTP);

  const handleSubmit = async (formValues) => {
    const { values } = formValues;

    try {
      const { data } = await loginWithOtp({
        variables: {
          value: username,
          otp: values?.otp,
        },
      });

      const loginResponse = data?.loginUsingOtp;

      if (loginResponse?.status) {
        const token = loginResponse?.token;
        settingUpToken({ login_token: token });                     
        setToken(token);

        
        searchParams.delete("auth");
        setSearchParams(searchParams);

        const createCartResponse = await createCart();
        const destinationCartId = createCartResponse?.cartId;

        const mergeCartResponse = await mergeCart({
          destinationCartId,
          sourceCartId: cartId,
        });

        const newCartId = mergeCartResponse?.mergeCarts?.id;
        setCartId(newCartId);

        formApiRef?.current?.reset();

        if (loginResponse?.message) {
          toast.success(loginResponse?.message, {
            id: "sign in pass success",
          });
        }
      } else {
        toast.error(loginResponse?.message, {
          id: "signin error",
          duration: 6000,
        });
      }
    } catch (e) {
      console.error(e);
      formApiRef.current.setError("otp", "Incorrect OTP");
      toast.error("Failed to login", { id: "loginFailed", duration: 6000 });
    }
  };

  const handleChangeUsername = () => {
    handleAuthView(SIGN_IN_INITIAL_VIEW);
  };

  const handleChange = () => {
    const otp = formApiRef.current.getValue("otp");
    if (otp?.length === 4 && !loginLoading) {
      formApiRef?.current?.submitForm();
    }
  };

  const loading = creatingCart || mergingCart || loginLoading;
  const resendLoading = loadingOtp || loadingWhatsAppOtp;

  return {
    formApiRef,
    handleSubmit,
    loading,
    handleChangeUsername,
    handleRequestOtp: whatsAppOtp ? requestWhatsAppOtp : requestLoginOtp,
    handleChange,
    handleAuthView,
    username,
    resendLoading,
  };
};

export default useAuthLoginOtp;