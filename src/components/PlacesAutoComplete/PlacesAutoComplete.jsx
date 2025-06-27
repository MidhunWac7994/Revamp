import { components } from "react-select";
import ReactSelect from  '../ReactSelect /ReactSelect';
import usePlaces from "./usePlaces";
import { Search } from "lucide-react";

const PlacesAutocomplete = ({ handleChangeAutoComplete, loader }) => {
  const { handleChange, handleInputChange, suggestions, scriptLoaded } =
    usePlaces(handleChangeAutoComplete);

  return scriptLoaded ? (
    <div className="w-full">
      <ReactSelect
        name="locationSearch"
        options={suggestions}
        onChange={handleChange}
        onInputChange={handleInputChange}
        placeholder="Search location"
        components={{
          DropdownIndicator: () => null,
          IndicatorSeparator: () => null,
          Control,
        }}
        emoji={<Search size={16} color="#2cb5a7" />}
        isSearchable
        closeMenuOnScroll
        isClearable
      />
    </div>
  ) : (
    loader
  );
};

export default PlacesAutocomplete;

const Control = ({ children, ...props }) => {
  const { emoji, onEmojiClick } = props.selectProps;

  return (
    <components.Control {...props}>
      <span onMouseDown={onEmojiClick} className="flex items-center">
        {emoji}
      </span>
      {children}
    </components.Control>
  );
};
