import SwitchView from  '../../../../components/SwitchView/SwitchView';
import useAuthSignUp from "./useAuthSignup";
import { Form } from "informed";
import TextInput from "../../../../components/TextInput/TextInput";
import Password from  '../../../../components/Password/password';
import FormSubmitButton from '../../../../components/FormSubmitButton/formSubmitButton';
import { Link } from 'react-router-dom';
import { DialogHeader } from '../../../../components/components/ui/dialog';
import PhoneEmailSwitcherInput from '../../../../components/PhoneEmailSwitcherInput/phoneEmailISwitcherinput';
import { SIGN_IN_INITIAL_VIEW } from '../../../../components/Constants';
import combine  from  '../../../../utils/combine';
import {
  isRequired,
  validateEmail,
  validateLength,
  validateName,
  validatePassword,
} from "../../../../utils/formValidator";
import CustomCheckBox from  '../../../../components/CustomCheckBox/CustomCheckBox';



const AuthSignUp = () => {
  const { handleSubmit, initialValues, loading, handleAuthView } =
    useAuthSignUp();


  return (
    <>
      <DialogHeader title={("Create an account")} />

      <Form onSubmit={handleSubmit} initialValues={initialValues}>
        <TextInput
          type="text"
          name="firstname"
          id="floatLogin"
          validateOn="change"
          validate={combine([isRequired, validateName, validateLength])}
          placeholder={("FirstName_Label")}
          label={("FirstName_Label")}
          floatingS
          maxLength={50}
          autoFocus
        />

        <TextInput
          type="text"
          name="lastname"
          id="floatLogin"
          validateOn="change"
          validate={combine([isRequired, validateName])}
          placeholder={("LastName_Label")}
          label={("LastName_Label")}
          floating
          maxLength={50}
        />

        <PhoneEmailSwitcherInput
          name="phoneNumber"
          id="floatLogin"
          placeholder={("phone_no")}
          floating
          mobileNumberOnly
          validateOn="change"
          autoComplete="off"
        />

        <TextInput
          type="email"
          name="email"
          id="floatLogin"
          validateOn="change"
          validate={combine([isRequired, validateEmail])}
          placeholder={("Email")}
          label={("Email")}
          floating
          autoComplete="off"
        />

        <Password
          name="password"
          validateOn="change"
          validate={combine([isRequired, validatePassword])}
          label={("Password")}
          placeholder={("Password")}
          floating
          autocomplete="new-password"
        />

        <div className="flex">
          <CustomCheckBox
            disabled
            checked
            label={
              <div className="ps-2 text-black">
                {("I_agree_To The")}{" "}
                <Link
                  className="text-lw-primary underline capitalize hover:text-black transition ease-in duration-300"
                  href={"/terms-and-conditions"}
                  target="_blank"
                >
                  {("terms_of_use")}
                </Link>{" "}
                {("and")}{" "}
                <Link
                  className="text-lw-primary underline capitalize hover:text-black transition ease-in duration-300"
                  href={"/privacy-policy"}
                  target="_blank"
                >
                  {("Privacy_Policy")}
                </Link>
                
              </div>
            }
          />
        </div>

        <FormSubmitButton
          variant={"primary"}
          size={"xl"}
          className={"w-full max-w-auto mt-5 "}
          label={("Create_Account")}
          loading={loading}
          requiredFields={["firstname", "lastname", "email", "password"]}
        />
      </Form>
      <SwitchView
        onClick={() => handleAuthView(SIGN_IN_INITIAL_VIEW)}
        text={("Already_have_an_account")}
        buttonLabel={("Sign_In")}
      />
    </>
  );
};

export default AuthSignUp;
