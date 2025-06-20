import React from 'react'
import useAuthSignUpOtp from './useAuthSignUpOtp';
import OtpScreen from '../../../../components/OtpScreen/OtpScreen';

const AuthSignUpOtp = () => {
      const {
        handleRegisterUsingOtp,
        handleSignUpResendOtp,
        loading,
        username,
        handleEdit,
        handleChange,
        formApiRef,
      } = useAuthSignUpOtp();
  return (
    <>
      <OtpScreen
        formApiRef={formApiRef}
        loading={loading}
        handleSubmit={handleRegisterUsingOtp}
        handleChangeUsername={handleEdit}
        handleResendOtp={handleSignUpResendOtp}
        username={username}
        handleChange={handleChange}
        disableViewSwitch
      />
    </>
  );
}

export default AuthSignUpOtp
