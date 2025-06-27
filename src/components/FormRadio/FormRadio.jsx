import { IS_REQUIRED_MESSAGE } from "../../utils/formValidator";
import CustomRadio from "../CustomRadio/CustomRadio";
import { useField } from "informed";
import { cn } from "../lib/utils";

const FormRadio = (props) => {
  const { fieldState, userProps, fieldApi } = useField(props);
  const {
    options,
    label,
    validate,
    floating,
    placeholder,
    labelClassName,
    ...rest
  } = userProps;
  const { error, showError, value } = fieldState;
  const { setValue } = fieldApi;

  const isFieldRequired =
    label && validate && validate()?.includes(IS_REQUIRED_MESSAGE) ? (
      <>
        {label}
        <span style={{ color: "red" }}>*</span>
      </>
    ) : (
      label
    );

  return (
    <>
      {label && (
        <p className={cn("text-16  font-medium text-black", labelClassName)}>
          {isFieldRequired}
        </p>
      )}
      <CustomRadio
        {...rest}
        activeValue={value}
        options={options}
        onChange={(val) => setValue(val)}
      />
    </>
  );
};

export default FormRadio;
