import React from 'react'
import { DialogHeader } from '../components/ui/dialog';
import { Form } from 'informed';
import CustomOtpInput from '../CustomOtpInput/CustomOtpInput';
import FormSubmitButton from '../FormSubmitButton/formSubmitButton';
import OtpTimer from '../OtpTimer/OtpTimer';
import { Mail } from 'lucide-react';
import { SIGN_IN_VIEW } from '../Constants';

const OtpScreen = (props) => {
      const {
        formApiRef,
        handleSubmit,
        handleChange,
        loading,
        username,
        handleChangeUsername,
        handleResendOtp,
        handleAuthView,
        isVerify,
          disableViewSwitch,
        resendLoading,
      } = props;
  return (
    <>
      <DialogHeader
        title={("OTPVerification")}
        subTitle={("Please enter the code sent to you on")}
        username={username}
        onClick={handleChangeUsername}
        buttonLabel={("Change")}
        isVerify={isVerify}
        data-widget="OtpScreen"
      />

      <div className={""}>
        <Form onSubmit={handleSubmit} formApiRef={formApiRef}>
          <CustomOtpInput name="otp" onChange={handleChange} />
          <FormSubmitButton
            variant={"primary"}
            size={"xl"}
            className={"w-full max-w-auto mt-10 h-12"}
            label={("Verify")}
            loading={loading}
            requiredFields={["otp"]}
            disabled={(values) => values?.otp?.length < 4}
          />
        </Form>
        <div className={`flex items-center justify-center mt-6`}>
          <OtpTimer
            resendClick={handleResendOtp}
            resendingOtp={resendLoading}
          />
        </div>
        {isVerify || disableViewSwitch ? null : (
          <>
            <div className="my-7">
              <p className="text-gray-200 text-16 font-normal text-center leading-6 ">
                {("Or")}
              </p>
            </div>
            <button
              variant={"gray"}
              className="w-full max-w-auto h-12"
              onClick={() => handleAuthView(SIGN_IN_VIEW)}
            >
           
              <Mail size={20} />
              LoginWithPassword
            </button>
          </>
        )}
      </div>
    </>
  );
}

export default OtpScreen
