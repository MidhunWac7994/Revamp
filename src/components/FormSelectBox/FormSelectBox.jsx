import { useField } from "informed";
import SelectBox from '../SelectBox/SelectBox'

const FormSelectBox = (props) => {
  const { fieldApi, fieldState, userProps } = useField(props);
  const { options, className, ...rest } = userProps;
  const { setValue } = fieldApi;
  const { value, error, showError } = fieldState;


  const active = options?.find((item) => item?.value === value);

  return (
    <div className="relative">
      <SelectBox
        labelClass={props?.className}
        options={options}
        active={active}
        onChange={(val) => setValue(val)}
        validate={props?.validate}
        {...rest}
      />
      {showError && (
        <span className="absolute -bottom-[20px] text-13 font-light text-error">
          {(error)}
        </span>
      )}
    </div>
  );
};

export default FormSelectBox;
