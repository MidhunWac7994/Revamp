import { gql } from "@apollo/client";

export const SIGNUP_USING_OTP = gql `
  mutation RegistrationUsingOtp(
    $value: String!
    $otp: String!
    $firstname: String!
    $lastname: String!
    $password: String!
    $email: String!
  ) {
    registrationUsingOtp(
      value: $value
      otp: $otp
      firstname: $firstname
      lastname: $lastname
      password: $password
      email: $email
    ) {
      message
      status
      token
    }
  }
`;

export const SIGNUP_RESEND_OTP = gql`
  mutation ResendRegistrationOtp(
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
