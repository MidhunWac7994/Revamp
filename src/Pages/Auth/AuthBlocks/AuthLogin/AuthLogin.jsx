// File: AuthLogin.js
import { Form } from "informed";
import {
  SIGN_IN_INITIAL_VIEW,
  USERNAME_FOR_FORGOT_PASSWORD,
} from "../../../../components/Constants";
import useAuthLogin from "./useAuthLogin";
import { isRequired } from "../../../../utils/formValidator";
import { Button } from "../../../../components/components/ui/button";
import FormSubmitButton from "../../../../components/FormSubmitButton/formSubmitButton";
import { DialogHeader } from "../../../../components/components/ui/dialog";
import Password from "../../../../components/Password/password";
import combine from "../../../../utils/combine";
import { Mail } from "lucide-react";
import { Progress } from "../../../../components/components/ui/progress";

const AuthLogin = ({ onClose }) => {
  const {
    formApiRef,
    handleSubmit,
    loading,
    requestLoginOtp,
    requestWhatsAppOtp,
    loadingOtp,
    handleAuthView,
    username,
  } = useAuthLogin(onClose); 

  return (
    <>
      <DialogHeader
        title="Password to Sign in"
        subTitle="Enter the password associated with"
        onClick={() => handleAuthView(SIGN_IN_INITIAL_VIEW)}
        buttonLabel={"Change"}
        username={username}
        variant="plane"
      />
      <div>
        <Form
          formApiRef={formApiRef}
          onSubmit={handleSubmit}
          data-widget="AuthLogin"
        >
          <div className="relative">
            <Password
              name="password"
              className=""
              validate={combine([isRequired])}
              validateOn="submit"
              label="Password"
              placeholder="*********"
              floating={true}
              autoFocus
              autocomplete="current-password"
            />
            <Button
              className="absolute end-0 -bottom-[25px] text-14 font-500 text-black hover:text-primary-blue transition ease-in-out duration-300"
              type="button"
              onClick={() => handleAuthView(USERNAME_FOR_FORGOT_PASSWORD)}
            >
              {"ForgotPassword"}
            </Button>
          </div>

          <FormSubmitButton
            variant="primary"
            size="xl"
            className="w-full max-w-auto mt-3 tablet:!mt-2"
            label="Continue"
            loading={loading}
            requiredFields={["password"]}
          />
        </Form>

        <div className="my-4 tablet:my-7">
          <p className="text-gray-200 text-16 font-normal text-center leading-6">
            Or
          </p>
        </div>

        <Button
          variant="gray"
          className="w-full max-w-auto h-12"
          onClick={requestLoginOtp}
          disabled={loadingOtp}
        >
          {loadingOtp ? (
            <Progress />
          ) : (
            <>
              <Mail size={22} color="currentColor" />
              {"RequestOTP"}
            </>
          )}
        </Button>
      </div>
    </>
  );
};

export default AuthLogin;
