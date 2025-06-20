
import { Button } from "../components/ui/button";
import * as LucideIcons from "lucide-react";

const SwitchView = (props) => {
  const {
    onClick,
    buttonLabel = "",
    text,
    className = {},
    variant = "link",
    size = "link",
    icon,
    iconSize = 18,
  } = props;
  const IconComponent = icon && LucideIcons[icon];

  return (
    <div
      className={`mt-5 text-center flex items-center justify-center gap-x-1 leading-normal ${className?.wrapper}`}
    >
      {text && <span className={`text-16 ${className?.text}`}>{text}</span>}
      <Button
        className={`text-primary-blue text-[16px]  hover:text-black font-light border-b-0 ${className?.button}`}
        size={size}
        variant={variant}
        onClick={onClick}
      >
        {IconComponent && <IconComponent size={iconSize} />}
        {buttonLabel}
      </Button>
    </div>
  );
};

export default SwitchView;
