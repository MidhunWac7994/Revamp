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
} from '../components/ui/command';
import { cn } from '../lib/utils';
import { ChevronDown } from "lucide-react"; 
import React from "react";

const SelectBox = ({
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
}) => {
  const [open, setOpen] = React.useState(false);

  const handleSelect = (item) => {
    onChange(item);
    setOpen(false);
  };

  let selectedLabel = active?.label || placeholder;

  return (
    <Popover open={open} onOpenChange={setOpen}>
      {label && (
        <label
          className={cn(
            "block text-14 font-medium text-black mb-2",
            labelClass
          )}
        >
          {label}
        </label>
      )}
      <PopoverTrigger asChild>
        <button
          role="combobox"
          aria-label={label}
          aria-expanded={open}
          className={cn(
            "w-full flex items-center justify-between px-4 py-[15px] rounded-0 border-1 border-[#CBCBCD] focus:outline-0 focus:border-black focus:outline-none h-[50px] font-light text-16",
            buttonClassName
          )}
        >
          {selectedLabel || placeholder}
          <ChevronDown size={12} className="opacity-50" />
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
                      "px-[14px] cursor-pointer py-3 text-14 font-normal text-black transition duration-300 ease-in-out hover:bg-[#f9f9f9] rounded-none",
                      selectedLabel === option?.label
                        ? "bg-[#F4F4F5] font-medium"
                        : "bg-white"
                    )}
                  >
                    {translate ? t(option?.label) : option?.label}
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
