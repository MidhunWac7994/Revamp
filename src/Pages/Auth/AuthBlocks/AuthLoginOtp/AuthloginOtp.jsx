import OtpScreen from  '../../../../components/OtpScreen/OtpScreen'
import useAuthLoginOtp from "./useAuthLoginOtp";

const AuthLoginOtp = () => {
  const {
    formApiRef,
    handleSubmit,
    handleChangeUsername,
    handleRequestOtp,
    loading,
    handleChange,
    handleAuthView,
    username,
    resendLoading,
  } = useAuthLoginOtp();

  return (
    <OtpScreen
      formApiRef={formApiRef}
      loading={loading}
      handleSubmit={handleSubmit}
      handleChangeUsername={handleChangeUsername}
      handleResendOtp={handleRequestOtp}
      handleAuthView={handleAuthView}
      username={username}
      handleChange={handleChange}
      resendLoading={resendLoading}
    />
  );
};

export default AuthLoginOtp;
