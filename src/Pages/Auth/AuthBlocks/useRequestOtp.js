import { useMutation } from "@apollo/client";
import { toast } from "sonner";

import { REQUEST_LOGIN_OTP } from "./AuthLogin/AuthLoginQuery";
import { SIGN_IN_OTP } from '../../../components/Constants';



const useRequestOtp = (props) => {
  const { formApiRef, handleAuthView, username, resend, formDataRef } = props;

  const [sendLoginOtp, { loading: loadingOtp }] = useMutation(
    REQUEST_LOGIN_OTP,
    {
      onCompleted: (data) => {
        const status = data?.sendLoginOtp?.status;
        const message = data?.sendLoginOtp?.message;

        if (status) {
          if (!resend) {
            formApiRef?.current?.reset();
            handleAuthView(SIGN_IN_OTP);
            formDataRef.current = {
              ...formDataRef.current,
              whatsAppOtp: false,
            };
          }
          toast.success(message, {
            id: "login otp",
            duration: 3000,
          });
        } else {
          toast.error(message, {
            id: "Error in login otp sent",
            duration: 8000,
          });
        }
      },
      onError: (err) => {
        toast.error(err.message, {
          id: "Error in login otp sent",
          duration: 8000,
        });
      },
    }
  );

  const requestLoginOtp = () => {
    sendLoginOtp({
      variables: {
        value: username,
        is_resend: resend,
        is_whatsapp: false,
      },
    });
  };

  const [sendWhatsAppOtp, { loading: loadingWhatsAppOtp }] = useMutation(
    REQUEST_LOGIN_OTP,
    {
      onCompleted: (data) => {
        const status = data?.sendLoginOtp?.status;
        const message = data?.sendLoginOtp?.message;

        if (status) {
          if (!resend) {
            formApiRef?.current?.reset();
            handleAuthView(SIGN_IN_OTP);
            formDataRef.current = {
              ...formDataRef.current,
              whatsAppOtp: true,
            };
          }
          toast.success(message, {
            id: "whatsapp otp",
            duration: 3000,
          });
        } else {
          toast.error(message, {
            id: "Error in whatsapp otp sent",
            duration: 8000,
          });
        }
      },
      onError: (err) => {
        toast.error(err.message, {
          id: "Error in whatsapp otp sent",
          duration: 8000,
        });
      },
    }
  );

  const requestWhatsAppOtp = () => {
    sendWhatsAppOtp({
      variables: {
        value: username,
        is_resend: resend,
        is_whatsapp: true,
      },
    });
  };

  return {
    requestLoginOtp,
    loadingOtp,
    requestWhatsAppOtp,
    loadingWhatsAppOtp,
  };
};

export default useRequestOtp;
