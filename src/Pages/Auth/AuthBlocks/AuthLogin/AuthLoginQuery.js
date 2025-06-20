import { gql } from "@apollo/client"

export const LOGIN_WITH_PASSWORD = gql`
  mutation loginUsingPassword($value: String!, $password: String!) {
    loginUsingPassword(
      value: $value
      password: $password
      recaptchatoken: "String"
    ) {
      token
      message
      status
    }
  }
`;

export const REQUEST_LOGIN_OTP = gql`
  mutation SendLoginOtp(
    $value: String!
    $is_resend: Boolean!
    $is_whatsapp: Boolean!
  ) {
    sendLoginOtp(
      value: $value
      is_resend: $is_resend
      is_whatsapp: $is_whatsapp
    ) {
      message
      status
    }
  }
`;
