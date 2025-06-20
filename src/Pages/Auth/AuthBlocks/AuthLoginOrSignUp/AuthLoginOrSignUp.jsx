import React from "react";
import { Form } from "informed";
import useAuthLoginOrSignUp from "./useAuthLoginOrSignUp";
import { DialogHeader } from "../../../../components/components/ui/dialog";
import PhoneEmailSwitcherInput from "../../../../components/PhoneEmailSwitcherInput/phoneEmailISwitcherinput";
import FormSubmitButton from "../../../../components/FormSubmitButton/formSubmitButton";
import SwitchView from "../../../../components/SwitchView/SwitchView";

const authLoginOrSignUp = () => {
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
        <PhoneEmailSwitcherInput
          name="username"
          id="floatLogin"
          placeholder={("EmailPhone")}
          label={"EmailPhone"}
          floating={true}
          validateOn="submit"
          autoFocus
        />

        <FormSubmitButton
          variant={"primary"}
          size={"xl"}
          className={"w-full max-w-auto mt-0 "}
          label={"Continue"}
          loading={loading}
          requiredFields={["username"]}
        />
      </Form>

      <SwitchView
        onClick={handleUserRegistration}
        text="Dont have an Account ?"
        buttonLabel={("Register")}     
      />
    </>    
  );
};

export default authLoginOrSignUp;
