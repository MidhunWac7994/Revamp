import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "../components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../components/ui/command";
import { cn } from "../lib/utils";

import { IS_REQUIRED_MESSAGE } from "../../utils/formValidator";
import { ChevronDown } from "lucide-react";
import { useToggle } from "../../CustomHook/useToggle";

const SelectBox = (props) => {
  const {
    buttonClassName,
    popupClassName,
    labelClass,
    options,
    search,
    active,
    translate, 
    onChange,
    placeholder,
    label,
  } = props;

  const { status, toggle } = useToggle();

  const handleSelect = (item) => {
    onChange(item);
    toggle();
  };

  let selectedLabel = placeholder;

  if (active?.label) {
    selectedLabel = active.label;
  }

  const isFieldRequired =
    label &&
    props?.validate &&
    props?.validate()?.includes(IS_REQUIRED_MESSAGE) ? (
      <>
        {label}
        <span style={{ color: "red" }}>*</span>
      </>
    ) : (
      label
    );

  return (
    <Popover open={status} onOpenChange={toggle}>
      {label && (
        <label
          className={cn(
            "block text-14 font-medium text-black mb-2",
            labelClass
          )}
        >
          {isFieldRequired}
        </label>
      )}
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-label={label}
          aria-expanded={status}
          className={cn(
            "w-full flex items-center justify-between px-4 py-[15px] rounded-0 border-1 border-[#CBCBCD] focus:outline-0 focus:border-black h-[50px] font-light text-16 data-[state=open]:border-black",
            buttonClassName
          )}
        >
          {selectedLabel}
          <ChevronDown size={16} className="opacity-50" />
        </button>
      </PopoverTrigger>

      <PopoverContent
        className={cn(
          "w-full p-0 relative z-[50] rounded-[5px] border border-[#D9D9D9] select_menu",
          popupClassName
        )}
      >
        <Command>
          {search && (
            <CommandInput placeholder="Search options..." className="h-9" />
          )}
          <CommandList>
            {options?.length > 0 ? (
              <CommandGroup className="p-0">
                {options.map((option, index) => (
                  <CommandItem
                    key={index}
                    value={option?.value}
                    onSelect={() => handleSelect(option)}
                    className={cn(
                      "px-[14px] py-3 text-14 font-normal text-black cursor-pointer hover:bg-[#f9f9f9] transition duration-300 ease-in-out",
                      selectedLabel === option?.label
                        ? "bg-[#F4F4F5] font-medium"
                        : "bg-white"
                    )}
                  >
                    {option.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : (
              <CommandEmpty>No options found.</CommandEmpty>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default SelectBox;
