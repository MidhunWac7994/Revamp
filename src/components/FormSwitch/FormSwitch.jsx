import { useField } from "informed";
import { Switch } from '../components/ui/switch'    

const FormSwitch = (props) => {
  const { fieldApi, fieldState, userProps } = useField(props);
  const { options, label, className, ...rest } = userProps;
  const { setValue } = fieldApi;
  const { value } = fieldState;

  return (
    <div className={className}>
      <label
        className="text-16 font-medium text-black"
        htmlFor="default_address"
      >
        {label}
      </label>
      <Switch
        className="data-[state=checked]:bg-lw-primary"
        checked={value}
        onCheckedChange={setValue}
        {...rest}
      />
    </div>
  );
};

export default FormSwitch;
