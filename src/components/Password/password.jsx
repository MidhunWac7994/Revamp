import { useState } from "react";
import { Input, useFieldState } from "informed";
import { IS_REQUIRED_MESSAGE } from  '../../utils/formValidator'
import { Eye, EyeOff } from "lucide-react"; 
import { Button } from "../components/ui/button";

const Password = (props) => {
  const { label, name, floating, validate, ...rest } = props;
  const [status, setStatus] = useState(false);
  const { error, showError, value } = useFieldState(name);
  const showButton = !!value;


  const isFieldRequired =
    validate && validate()?.includes(IS_REQUIRED_MESSAGE) ? (
      <>
        {label}
        <span style={{ color: "red" }}>*</span>
      </>
    ) : (
      label
    );

  const handleKeyDown = (e) => {
    if (e.which === 32) {
      e.preventDefault();
    }
  };

  return (
    <div data-widget="Password" className="relative w-full mb-8">
      <div className="relative">
        {floating ? (
          <>
            <Input
              name={name}
              validate={validate}
              type={status ? "text" : "password"}
              onKeyDown={handleKeyDown}
              {...rest}
              autoComplete="new-password"
              className={`${
                showError ? "border-error focus:border-error " : ""
              } peer border-[1px] border-[#CBCBCD] w-full px-5 py-3 rounded-0 focus:outline-0 focus:border-[1px] focus:border-black h-[50px] font-light text-16 placeholder:opacity-0 shadow-none pe-12`}
            />

            <label
              className="absolute text-16 text-[#8E8E93] duration-300 transform -translate-y-[24px] scale-85 top-[27%] start-4 z-10 origin-[0] bg-white px-1 peer-focus:px-1 peer-focus:scale-85 peer-focus:-translate-y-[24px] peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 pointer-events-none font-light"
              htmlFor="floatLogin"
            >
              {isFieldRequired}
            </label>

            {showButton && (
              <Button
                type="button"
                className="absolute end-5 top-[50%] translate-y-[-50%]"
                onClick={() => setStatus((prev) => !prev)}
              >
                {status ? <EyeOff size={20} /> : <Eye size={20} />}
              </Button>
            )}
          </>
        ) : (
          <>
            <Input
              name={name}
              validate={validate}
              type={status ? "text" : "password"}
              onKeyDown={handleKeyDown}
              {...rest}
              autoComplete="new-password"
            />
            <label htmlFor="floatLogin">{isFieldRequired}</label>
            {showButton && (
              <Button type="button" onClick={() => setStatus((prev) => !prev)}>
                {status ? <EyeOff size={20} /> : <Eye size={20} />}
              </Button>
            )}
          </>
        )}
      </div>

      {showError && (
        <span className="error-message absolute left-0 -bottom-[23px] text-14 font-light text-error">
          {error}
        </span>
      )}
    </div>
  );
};

export default Password;
