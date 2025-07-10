import { useEffect, useRef } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useToggle } from "../../../CustomHook/useToggle";


const useSearchTrigger  = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const formApiRef = useRef();
  const textInputRef = useRef(null);
  const popupRef = useRef(null);
  const { status, toggle } = useToggle();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("query") || "";

  const initialValue = { search_input: searchQuery };

  const handleSubmit = ({ values }) => {
    const { search_input } = values || {};
    if (!!search_input?.trim()) {
      navigate(`/search?query=${encodeURIComponent(search_input)}`);
    }
    toggle();
    textInputRef.current?.blur();
  };

  const handleClearSearch = () => {
    formApiRef.current?.setValueQuietly("search_input", "");
    textInputRef.current?.focus();
  };  

  useEffect(() => {
    if (location.pathname !== "/search" || !!searchQuery) {
      formApiRef?.current?.reset();
    }
  }, [searchQuery, location.pathname]);

  const showAutoComplete = (formState) => {
    const inputLength = formState.values.search_input?.length || 0;
    const isModified = formState.modified?.search_input;
    const isSubmitted = formState.submitted;

    if (inputLength > 1 && !isSubmitted && isModified) return true;
    if (isSubmitted && isModified) return false;
    if (!isModified && inputLength) return false;
    if (isModified && inputLength && !isSubmitted) return true;

    return false;
  };

  const handleClickOutside = (event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      formApiRef.current?.reset();
    }
  };

  const handleChange = (formState) => {
    if (formState?.dirt?.search_input) {
    }
  };

  return {
    handleSubmit,
    formApiRef,
    handleClearSearch,
    searchQuery,
    initialValue,
    textInputRef,
    showAutoComplete,
    popupRef,
    handleClickOutside,
    handleChange,
    status,
    toggle,
  };
};

export default useSearchTrigger;
