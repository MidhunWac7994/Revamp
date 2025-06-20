import React from 'react'
import { SIGN_UP_OTP } from '../../../../components/Constants'
import { useAuthContext } from '../../useAuth';
import { validateEmail } from  '../../../../utils/formValidator'
import { toast } from 'sonner';
import { gql, useMutation } from '@apollo/client';

const SEND_REGISTRATION_OTP = gql`
  mutation SendRegistrationOtp(
    $value: String!
    $is_resend: Boolean!
    $email: String!
    $recaptchatoken: String
    $is_whatsapp: Boolean!
  ) {
    sendRegistrationOtp(
      value: $value
      is_resend: $is_resend
      email: $email
      recaptchatoken: $recaptchatoken
      is_whatsapp: $is_whatsapp
    ) {
      message
      status
    }
  }
`;

const useAuthSignUp = () => {
  const { username, handleAuthView, handleUserName, formDataRef } =
    useAuthContext();

  const isEmail = username && validateEmail(username?.trim()) === undefined;
  const mobileNumber = !isEmail ? username : "";
  const value = isEmail ? username : mobileNumber;
  console.log(isEmail,"isEmail");
  console.log(value,"value");

  const [sendRegistrationOtp, { loading }] = useMutation(
    SEND_REGISTRATION_OTP,
    {
      onCompleted: (data) => {
        const result = data?.sendRegistrationOtp;
        if (result?.status) {
          toast.success(result.message, {
            id: "requestSignUpOtp",
            duration: 4000,
          });
          handleAuthView(SIGN_UP_OTP);
        } else {
          toast.error(result?.message || "OTP request failed", {
            id: "requestSignUpOtp",
            duration: 8000,
          });
        }
      },
      onError: (err) => {
        toast.error(err.message, {
          id: "Error in sign in change",
          duration: 8000,
        });
      },
    }
  );

  const { email, firstname, lastname, password, phoneNumber } =
    formDataRef.current || {};

  const mailId = email || (isEmail && username);
  const mobile = phoneNumber || (!isEmail && value);

  const initialValues = {
    firstname: firstname || "",
    lastname: lastname || "",
    phoneNumber: mobile || "",
    email: mailId || "",
    password: password || "",
    privacy_policy: true,
  };

  const handleSubmit = ({ values }) => {
    const { phoneNumber, email } = values;

    handleUserName(phoneNumber);
    formDataRef.current = { ...values };

    sendRegistrationOtp({
      variables: {
        value: phoneNumber,
        email: email,
        is_resend: false,
        is_whatsapp: true,
        recaptchatoken: "string",   
      },
    });
  };

  return {
    initialValues,
    handleSubmit,
    loading,
    handleAuthView,
  };
};

export default useAuthSignUp;
