import React from "react";
import { useAtom } from "jotai";
import { authTokenAtom } from "../../../Jotai/authAtom";
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

const AuthBlocks = ({ onClose }) => {
  const authProps = useAuthContext();
  const [, setAuthToken] = useAtom(authTokenAtom);

  console.log("🔍 AuthBlocks received onClose:", typeof onClose);

  const handleSuccessfulLogin = (token) => {
    console.log("🔍 handleSuccessfulLogin called with token:", token);
    localStorage.setItem("token", token);
    setAuthToken(token);
    authProps.handleAuthView(SIGN_IN_INITIAL_VIEW);
    if (typeof onClose === "function") {
      console.log("🔍 Calling onClose from handleSuccessfulLogin");
      onClose();
    } else {
      console.warn(
        "⚠️ onClose is not a function in handleSuccessfulLogin:",
        onClose
      );
    }
  };

  const AuthBlocks = {
    [SIGN_IN_INITIAL_VIEW]: <AuthLoginOrSignUp />,
    [SIGN_IN_VIEW]: <AuthLogin onClose={onClose} />,
    [SIGN_IN_OTP]: <AuthLoginOtp onSuccess={handleSuccessfulLogin} />,
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
