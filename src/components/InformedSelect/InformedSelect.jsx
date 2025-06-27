import { Select, Option, useFieldState } from "informed";
import { IS_REQUIRED_MESSAGE } from "../../utils/formValidator";
import { ChevronDown } from "lucide-react";

const InformedSelect = (props) => {
  const { options, label, validate, floating, placeholder, ...rest } = props;
  const { error, showError } = useFieldState(rest?.name);

  const isFieldRequired =
    validate && validate()?.includes(IS_REQUIRED_MESSAGE) ? (
      <span className="block text-16 font-medium text-black mb-2">
        {label}
        <span style={{ color: "red" }}>*</span>
      </span>
    ) : (
      label
    );

  return (
    <div className={`select_wrap relative ${floating ? `form-floating ` : ""}`}>
      <label>{isFieldRequired}</label>
      <Select
        as="select"
        className="w-full flex items-center justify-between px-4 py-[15px] rounded-0 border-1 border-[#CBCBCD] focus:outline-0 focus:border-black h-[50px] font-light text-16 appearance-none"
        validate={validate}
        {...rest}
      >
        {placeholder && (
          <Option value="" disabled>
            {placeholder}
          </Option>
        )}
        {options?.map((item) => (
          <Option value={item?.value} key={item?.value}>
            {item?.label}
          </Option>
        ))}
      </Select>

      {/* Lucide Down Arrow */}
      <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-black opacity-50 pointer-events-none" />

      {showError && (
        <small className="error-message text-red-500">{error}</small>
      )}
    </div>
  );
};

export default InformedSelect;
