import React from "react";
import { Form } from "informed";
import useAuthLoginOrSignUp from "./useAuthLoginOrSignUp";
import { DialogHeader } from "../../../../components/components/ui/dialog";
import PhoneEmailSwitcherInput from "../../../../components/PhoneEmailSwitcherInput/phoneEmailISwitcherinput";
import FormSubmitButton from "../../../../components/FormSubmitButton/formSubmitButton";
import SwitchView from "../../../../components/SwitchView/SwitchView";
import AuthLogin from "../AuthLogin/AuthLogin";

const AuthLoginOrSignUp = () => {
  const { handleSubmit, initialValues, handleUserRegistration, loading } =
    useAuthLoginOrSignUp();
  return (
    <>
      <DialogHeader
        mainTitle="Welcome"
        title="Sign in or Sign Up"
        subTitle="Enter your mobile number or email address"
      />
      <Form onSubmit={handleSubmit} initialValues={initialValues}>
        <div style={{ marginTop: "18px" }}>
          {" "}
          <PhoneEmailSwitcherInput
            name="username"
            id="floatLogin"
            placeholder={"EmailPhone"}
            label={"EmailPhone"}
            floating={true}
            validateOn="submit"
            autoFocus
            className="border-black"
          />
        </div>

        <FormSubmitButton
          variant={"primary"}
          size={"xl"}
          className="w-full h-12 max-w-auto mt-0 bg-[#56c4b9] text-white hover:opacity-90 disabled:opacity-50 rounded-none"
          label={"Continue"}
          loading={loading}
          requiredFields={["username"]}
        />
      </Form>

      <SwitchView
        onClick={handleUserRegistration}
        text="Dont have an Account ?"
        buttonLabel={"Register"}
      />
    </>
  );
};

export default AuthLoginOrSignUp;
