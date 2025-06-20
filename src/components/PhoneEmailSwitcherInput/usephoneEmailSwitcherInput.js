import { useFieldApi, useFieldState, useFormState } from "informed";
import combine from "@/utils/combine";
import {
  isRequired,
  NUMBER_REGEX,
  validateEmail,
  validatePhone,
} from  '../../utils/formValidator';
import { DIAL_CODE, PHONE_NUMBER_LENGTH } from  '../../components/Constants'

const usePhoneEmailSwitcher = (props) => {
  const { name, validateOn, mobileNumberOnly, step } = props;
  const { value: inputValue } = useFieldState(name);
  const { setValue } = useFieldApi(name);
  const [, number] = inputValue?.split(" ") || [];
  const isNumber = NUMBER_REGEX?.test(number ? number : inputValue);
  const { initialValues } = useFormState();
  const initialNumber = step
    ? initialValues?.[step]?.[name]
    : initialValues?.[name];
  const dialLength = `${DIAL_CODE}_`.length;

  let validateFunctions;
  if (validateOn && (mobileNumberOnly || isNumber)) {
    validateFunctions = combine([isRequired, validatePhone]);
  } else if (!validateOn) {
    validateFunctions = "";
  } else {
    validateFunctions = combine([isRequired, validateEmail]);
  }

  const handleInputChange = (state) => {
    const value = state?.value ?? "";
    const [dialCode, phoneNumber] = value?.split(" ") || [];
    const inputData = value?.startsWith(DIAL_CODE) ? phoneNumber : value;

    const newValue = (() => {
      if (mobileNumberOnly) {
        if (!phoneNumber) {
          if (value === `${DIAL_CODE} `) return null;
          return `${DIAL_CODE} `;
        } else {
          if (NUMBER_REGEX?.test(phoneNumber))
            return `${DIAL_CODE} ${phoneNumber}`;
          else return `${DIAL_CODE} `;
        }
      } else {
        if (dialCode === DIAL_CODE && !NUMBER_REGEX?.test(phoneNumber)) {
          if (value?.startsWith(DIAL_CODE)) {
            return phoneNumber;
          }

          return `${DIAL_CODE} ${inputData}`;
        } else if (dialCode !== DIAL_CODE && NUMBER_REGEX?.test(phoneNumber)) {
          return `${DIAL_CODE} ${phoneNumber}`;
        }
      }

      if (NUMBER_REGEX?.test(inputData) && dialCode !== DIAL_CODE) {
        return `${DIAL_CODE} ${inputData}`;
      }

      if (
        NUMBER_REGEX?.test(inputData) &&
        inputData?.length > PHONE_NUMBER_LENGTH
      ) {
        return `${DIAL_CODE} ${inputData.slice(0, PHONE_NUMBER_LENGTH)}`;
      }

      return null;
    })();

    if (newValue !== null && newValue !== value) {
      setValue(newValue);
    }
  };

  const getFormState = (state) => {
    const value = step ? state?.[step]?.values?.[name] : state?.values?.[name];

    const [, phoneNumber] = value?.split(" ") || [];
    const initialValue = step
      ? state?.[step]?.initialValues?.[name]
      : state?.initialValues?.[name];
    const [, initialPhoneNumber] = initialValue?.split(" ") || [];

    const format =
      mobileNumberOnly ||
      NUMBER_REGEX.test(phoneNumber) ||
      (NUMBER_REGEX.test(initialPhoneNumber) && state?.pristine);

    return format;
  };

  const inputMaxLength =
    isNumber || mobileNumberOnly ? PHONE_NUMBER_LENGTH + dialLength : null;

  const initialValue =
    mobileNumberOnly && !initialNumber ? `${DIAL_CODE} ` : initialNumber;

  return {
    validateFunctions,
    handleInputChange,
    getFormState,
    inputMaxLength,
    initialValue,
    isNumber,
  };
};

export default usePhoneEmailSwitcher;
