import { gql } from "@apollo/client";

export const LOGIN_WITH_OTP = gql `
  mutation loginUsingOtp($value: String!, $otp: String!) {
    loginUsingOtp(value: $value, otp: $otp) {
      token
      message
      status
    }
  }
`;
