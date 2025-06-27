import { RadioGroup, RadioGroupItem } from "../../components/components/ui/radio-group";
import { cn } from "../lib/utils";  

const CustomRadio = ({
  options = [],
  onChange,
  activeValue,
  itemClass = "",
  labelClass = "",
  direction = "ltr", 
  ...rest
}) => {
  if (!options?.length) return null;

  return (
    <RadioGroup
      dir={direction}
      value={activeValue}
      onValueChange={onChange}
      {...rest}
    >
      {options.map((item, index) => (
        <div
          key={index}
          className={cn("flex items-center justify-between", itemClass)}
        >
          <label
            htmlFor={item?.value}
            className={cn("flex-1 text-15 font-normal text-black", labelClass)}
          >
            {item?.label}
          </label>
          <RadioGroupItem value={item?.value} id={item?.value} />
        </div>
      ))}
    </RadioGroup>
  );
};

export default CustomRadio;
