import React from "react";
import { useAtom } from "jotai";
import { authTokenAtom } from "../../../Jotai/authAtom"
import AuthLoginOrSignUp from "./AuthLoginOrSignUp/AuthLoginOrSignUp";
import {
  SIGN_IN_INITIAL_VIEW,
  SIGN_IN_VIEW,
  SIGN_IN_OTP,
  SIGN_UP_VIEW,
  SIGN_UP_OTP,
} from "../../../components/Constants";
import AuthLogin from "./AuthLogin/AuthLogin";
import AuthLoginOtp from "./AuthLoginOtp/AuthloginOtp";
import AuthSignUp from "./AuthSignUp/AuthSignuUp";
import AuthSignUpOtp from "./AuthSignUpOtp/AuthSignUpOtp";
import { AuthContext, useAuthContext } from "../useAuth";

const AuthBlocks = () => {
  const authProps = useAuthContext();
  const [, setAuthToken] = useAtom(authTokenAtom); // Add token setter

  // Example: Function to handle successful login (to be called in AuthLogin or AuthLoginOtp)
  const handleSuccessfulLogin = (token) => {
    localStorage.setItem("token", token); // Store token in localStorage
    setAuthToken(token); // Update Jotai atom
    authProps.handleAuthView(SIGN_IN_INITIAL_VIEW); // Reset view or redirect as needed
  };

  const AuthBlocks = {
    [SIGN_IN_INITIAL_VIEW]: <AuthLoginOrSignUp />,
    [SIGN_IN_VIEW]: <AuthLogin onSuccess={handleSuccessfulLogin} />, // Pass callback
    [SIGN_IN_OTP]: <AuthLoginOtp onSuccess={handleSuccessfulLogin} />, // Pass callback
    [SIGN_UP_VIEW]: <AuthSignUp />,
    [SIGN_UP_OTP]: <AuthSignUpOtp />,
  };

  const child = AuthBlocks[authProps?.authView] || null;

  return (
    <AuthContext.Provider value={{ ...authProps }}>
      {child}
    </AuthContext.Provider>
  );
};

export default AuthBlocks;
