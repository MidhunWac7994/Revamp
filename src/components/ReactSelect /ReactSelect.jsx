import { useParams } from "react-router-dom";
import Select from "react-select";
import { useField } from "informed";

const ReactSelect = (props) => {
  const { fieldApi, fieldState, render, ref, userProps } = useField(props);
  const { value, error, showError } = fieldState;
  const { setValue } = fieldApi;
  const { onChange, options, classes, onBlur, disabled, ...rest } = userProps;

  const { locale } = useParams(); 

  return render(
    <div
      className={`form-group select-field ${showError ? "error_Field" : ""}`}
    >
      <Select
        value={value || undefined}
        {...rest}
        ref={ref}
        onChange={(value) => {
          setValue(value);
          if (onChange) {
            onChange(value);
          }
        }}
        options={options}
        className="selectValue"
        classNamePrefix="custom-select"
        isDisabled={disabled}
        isRtl={locale === "ar"}
        styles={{
          control: (baseStyles, state) => ({
            ...baseStyles,
            borderColor: state.isFocused ? "#E6E6E6" : "#E6E6E6",
            minHeight: "50px",
            boxShadow: "none",
            paddingInlineStart: "15px",
            cursor: "pointer",
          }),
        }}
        theme={(theme) => ({
          ...theme,
          borderRadius: 0,
          colors: {
            ...theme.colors,
            primary25: "#d9d9d9",
            primary: "#E6E6E6",
            primary50: "#d9d9d9",
            neutral0: "#fff",
          },
        })}
      />
      {showError && (
        <span className="error-message absolute left-0 -bottom-[20px] text-13 font-light text-error">
          {error}
        </span>
      )}
    </div>
  );
};

export default ReactSelect;
