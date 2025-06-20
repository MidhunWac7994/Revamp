import React from 'react'
import useAuth, { AuthContext } from '../useAuth';
import AuthLoginOrSignUp from './AuthLoginOrSignUp/AuthLoginOrSignUp';
import {
  SIGN_IN_INITIAL_VIEW,
  SIGN_IN_VIEW,
  SIGN_IN_OTP,
  SIGN_UP_VIEW,
  SIGN_UP_OTP
} from "../../../components/Constants";
import AuthLogin from './AuthLogin/AuthLogin';
import AuthLoginOtp from './AuthLoginOtp/AuthloginOtp';
import AuthSignUp from './AuthSignUp/AuthSignuUp';
import AuthSignUpOtp from './AuthSignUpOtp/AuthSignUpOtp';
const AuthBlocks = () => {
  const authProps = useAuth();

  const AuthBlocks = {
    [SIGN_IN_INITIAL_VIEW]: <AuthLoginOrSignUp />,
    [SIGN_IN_VIEW]: <AuthLogin/>,
    [SIGN_IN_OTP]: <AuthLoginOtp />,
    [SIGN_UP_VIEW]: <AuthSignUp />,
    [SIGN_UP_OTP]: <AuthSignUpOtp />,
    // [USERNAME_FOR_FORGOT_PASSWORD]: <AuthUsername />,
    // [FORGOT_PASSWORD_RESET]: <AuthPasswordChange />,
    // default: null,
  };

  const child = AuthBlocks[authProps?.authView] || AuthBlocks.default;

  return (
    <AuthContext.Provider value={{ ...authProps }}>
      {child}
    </AuthContext.Provider>
  );
};

export default AuthBlocks;