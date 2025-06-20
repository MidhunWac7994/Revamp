import { Relevant } from "informed";
import TextInput from '../TextInput/TextInput'
import usePhoneEmailSwitcher from  '../PhoneEmailSwitcherInput/usephoneEmailSwitcherInput'


const PhoneEmailSwitcherInput = (props) => {
  const {
    name,
    floating,
    label,
    mobileNumberOnly = false,
    step,
    ...rest
  } = props;

  const {
    validateFunctions,
    handleInputChange,
    getFormState,
    inputMaxLength,
    initialValue,
    isNumber,
  } = usePhoneEmailSwitcher({
    name,
    mobileNumberOnly,
    validateOn: props?.validateOn,
    step,
  });

  return (
    <div
      data-widget="PhoneEmailSwitcherInput"
      className={`form-floating w-full relative`}
    >
      <Relevant when={({ formState }) => getFormState(formState)}>
        <div
          className={`absolute -translate-y-[50%] z-[1] start-[14px] size-[22px] rounded-full overflow-hidden ${
            floating ? "top-[50%]" : "top-[68%] max-mobile:top-[68%]"
          }`}
        >
  
        </div>
      </Relevant>

      <TextInput
        phoneInput
        floating={floating}
        name={name}
        label={label}
        mobileNumberOnly={mobileNumberOnly}
        inputMode={mobileNumberOnly ? "numeric" : "email"}
        pattern={isNumber ? "\\d*" : ""}
        validate={validateFunctions}
        onChange={handleInputChange}
        maxLength={inputMaxLength}
        minLength={inputMaxLength}
        initialValue={initialValue}
        isNumber={isNumber}
        {...rest}
      />
    </div>
  );
};

export default PhoneEmailSwitcherInput;
