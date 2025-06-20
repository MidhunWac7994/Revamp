import { Input, useFieldState } from "informed";
import { IS_REQUIRED_MESSAGE } from "../../utils/formValidator";
import { cn } from "../lib/utils";

const TextInput = (props) => {
  const {
    label,
    name,
    phoneInput,
    floating,
    validate,
    hideStar,
    mobileNumberOnly,
    onKeyDown,
    isNumber,
    className,
    inputClassName,
    maxLength,
    ...rest
  } = props;

  const { error, showError } = useFieldState(name);

  
  let isFieldRequired = label;
  if (validate && validate()?.includes(IS_REQUIRED_MESSAGE)) {
    isFieldRequired = hideStar ? (
      label
    ) : (
      <>
        {label}
        <span style={{ color: "red" }}>*</span>
      </>
    );
  }


  const customError =
    error === `This field should NOT be shorter than ${maxLength} characters`
      ? "This field should not be shorter"
      : error;

  
  const count = maxLength ? maxLength - 5 : null;

  
  const labelHTML = label && (
    <label
      className="absolute text-16 text-[#8E8E93] duration-300 translate-y-[-24px] scale-85 top-[27%] start-4 z-10 origin-[0] bg-white px-1 peer-focus:text-[#8E8E93] peer-focus:scale-85 peer-focus:-translate-y-[24px] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:bg-white peer-placeholder-shown:bg-transparent pointer-events-none font-light"
      htmlFor="floatLogin"
    >
      {isFieldRequired}
    </label>
  );

  
  const errorHTML = showError && (
    <span className="error-message absolute left-0 -bottom-[20px] text-13 font-light text-error">
      {/* {customError} {count !== null && `(Remaining: ${count})`} */}
    </span>
  );

  const inputElement = (
    <Input
      name={name}
      validate={validate}
      className={cn(
        `${
          showError ? "!border-error !focus:border-error" : ""
        } peer border-1 border-[#CBCBCD] w-full px-5 py-3 rounded-0 focus:outline-0 focus:border-black h-[50px] font-light text-16 ${
          floating ? "placeholder:opacity-0" : "placeholder:opacity-100"
        } shadow-none outline-none ${
          isNumber || mobileNumberOnly ? "!ps-10" : ""
        }`,
        inputClassName
      )}
      onKeyDown={onKeyDown}
      maxLength={maxLength}
      {...rest}
    />
  );

  
  return (
    <>
      {floating ? (
        <>
          {phoneInput ? (
            <div
              data-widget="TextInput"
              className={cn("relative mb-8", className)}
            >
              <div className="relative">
                {inputElement}
                {labelHTML}
              </div>
              {errorHTML}
            </div>
          ) : (
            <div
              data-widget="TextInput"
              className={cn(
                "group form-floating relative w-full mb-8",
                className
              )}
            >
              <Input
                className={cn(
                  `${
                    showError ? "border-error focus:border-error" : ""
                  } peer border-1 w-full px-5 py-3 rounded-0 focus:outline-none focus:border-black h-[50px] font-light text-16 placeholder:opacity-0 border-[#CBCBCD]`,
                  inputClassName
                )}
                name={name}
                validate={validate}
                onKeyDown={onKeyDown}
                maxLength={maxLength}
                {...rest}
              />
              {labelHTML}
              {errorHTML}
            </div>
          )}
        </>
      ) : (
        <div data-widget="TextInput" className={cn("relative mb-8", className)}>
          {label && (
            <label className="block text-16 font-medium text-black mb-2">
              {isFieldRequired}
            </label>
          )}
          {inputElement}
          {errorHTML}
        </div>
      )}
    </>
  );
};

export default TextInput;
