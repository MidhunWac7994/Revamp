import { useEffect, useRef, useState } from "react";
import { debounce } from '../../utils/debounce';

const usePlaces = (handleChangeAutoComplete) => {
  const [suggestions, setSuggestions] = useState([]);
  const autocompleteService = useRef(null);
  const [scriptLoaded, setScriptLoaded] = useState(false);

  useEffect(() => {
    try {
      if (!window.google) {
        const script = document.createElement("script");
        script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAP_APIKEY}&libraries=places`;
        script.async = true;
        script.defer = true;
        script.onload = () => {
          setScriptLoaded(true);
          initAutocompleteService();
        };
        document.head.appendChild(script);
      } else {
        setScriptLoaded(true);
        initAutocompleteService();
      }
    } catch (error) {
      console.log(error);
    }
  }, []);

  const initAutocompleteService = () => {
    if (window.google && window.google.maps) {
      autocompleteService.current =
        new window.google.maps.places.AutocompleteService();
    }
  };

  const handleInputChange = debounce((value) => {
    if (value && autocompleteService.current) {
      autocompleteService.current.getPlacePredictions(
        { input: value, types: ["geocode"] },
        (predictions, status) => {
          if (
            status === window.google.maps.places.PlacesServiceStatus.OK &&
            predictions
          ) {
            const places =
              predictions?.length > 0 &&
              predictions?.map((place) => {
                return {
                  label: place?.description,
                  value: place,
                };
              });
            setSuggestions(places);
          }
        }
      );
    }
  }, 300);

  const handleChange = (formVal, place) => {
    if (formVal?.value)
      handleChangeAutoComplete?.(formVal?.value?.[0]?.value?.place_id);
  };

  return { suggestions, handleInputChange, handleChange, scriptLoaded };
};

export default usePlaces;
