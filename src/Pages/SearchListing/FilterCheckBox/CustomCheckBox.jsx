import { Checkbox } from "../../../components/components/ui/checkbox";
const CustomCheckBox = (props) => {
  const { label, onChange, checked, id = 0, ...rest } = props;

  return (
    <>
      <Checkbox
        id={id}
        checked={checked}
        onCheckedChange={onChange}
        {...rest}
      />
      <label
        htmlFor={id}
        className="text-[15px] font-light leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 w-full text-[#585858] cursor-pointer"
      >
        {label}
      </label>
    </>
  );
};

export default CustomCheckBox;
