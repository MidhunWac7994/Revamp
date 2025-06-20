import React from 'react'
import { useField } from 'informed'
import { InputOTP, InputOTPSlot,InputOTPGroup } from  '../../components/components/ui/input-otp'

const CustomOtpInput = (props) => {
    const { fieldState, fieldApi, userProps } = useField(props);
      const { value, error, showError } = fieldState;
      const { setValue } = fieldApi;
        const { label, id, onChange, ...rest } = userProps;


  return (
    <>
      <InputOTP
        maxLength={4}
        autoFocus
        value={value}
        onChange={(val) => {
          onChange?.();
          setValue(val);
        }}
        id={id}
        {...Object.fromEntries(
          Object.entries(rest).filter(([_, v]) => v !== undefined)
        )}
      >
        <InputOTPGroup>
          <InputOTPSlot index={0} />
          <InputOTPSlot index={1} />
          <InputOTPSlot index={2} />
          <InputOTPSlot index={3} />
        </InputOTPGroup>
      </InputOTP>
      {showError && <span className={`invalid-feedback`}>{t(error)}</span>}
    </>
  );
}

export default CustomOtpInput
