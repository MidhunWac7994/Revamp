import { useRef, useState } from "react";
import { useFormApi } from "informed";
import {
  geocodeByLatLng,
  geocodeByPlaceId,
  getLatLng,
} from "../../../utils/placesAutoComplete";
import { toast } from "sonner";
import { COUNTRY } from "../../Constants";

const useAddressGoogleMap = ({ formApiRef }) => {
  const mapRef = useRef(null);
  const formApi = useFormApi();
  const [mapReady, setMapReady] = useState(false);

  const handleChangeAutoComplete = (placeId) => {
    geocodeByPlaceId(placeId).then((result) => {
      if (result?.[getIndex(result, 0)]?.address_components[0]?.long_name) {
        if (getCountry(result)) {
          formApi.setError("wrong_country", null);
        } else {
          formApi.setError(
            "wrong_country",
            "Locations outside Kuwait are invalid"
          );
        }

        formApi.setValue(
          "formatted_address",
          `${result?.[getIndex(result, 3)]?.address_components[0]?.long_name}${
            result?.[getIndex(result, 6)]?.formatted_address
              ? `, ${result?.[getIndex(result, 6)]?.formatted_address}`
              : ""
          }`
        );
        formApi.setValue(
          "address_form.street",
          result?.[getIndex(result, 3)]?.address_components[0]?.long_name
        );
      }

      getLatLng(result?.[getIndex(result, 0)]).then(({ lat, lng }) => {
        mapRef.current.setCenter({ lat, lng });
        formApiRef.current.setValue("lat", lat);
        formApiRef.current.setValue("lng", lng);
      });
    });
  };

  const errorlocation = (error) => {
    if (error.code === 1) {
      toast.error("Please enable location access in your browser.", {
        id: "error-fetching-location",
      });
    }
  };

  const success = (position) => {
    const { latitude, longitude } = position.coords;
    mapRef.current.setCenter({ lat: latitude, lng: longitude });

    geocodeByLatLng({ lat: latitude, lng: longitude }).then((result) => {
      const country = result?.find((ele) =>
        ele?.types?.includes("country")
      )?.formatted_address;

      if (country !== COUNTRY) {
        formApi.setError(
          "wrong_country",
          "Locations outside Kuwait are invalid"
        );
      } else {
        formApi.setError("wrong_country", null);
      }

      if (result?.[getIndex(result, 6)]?.address_components[0]?.long_name) {
        formApi.setValue(
          "formatted_address",
          `${result?.[getIndex(result, 3)]?.address_components[0]?.long_name}${
            result?.[getIndex(result, 6)]?.formatted_address
              ? `, ${result?.[getIndex(result, 6)]?.formatted_address}`
              : ""
          }`
        );
        formApi.setValue(
          "address_form.street",
          result?.[getIndex(result, 3)]?.address_components[0]?.long_name
        );
      }

      formApi.setValue("google_map.locationSearch", [
        {
          label: result?.[getIndex(result, 0)]?.formatted_address,
          value: result?.[getIndex(result, 0)],
        },
      ]);
      formApiRef.current.setValue("lat", latitude);
      formApiRef.current.setValue("lng", longitude);
    });
  };

  const handleCurrentLocation = () => {
    if (!navigator?.geolocation) {
      console.log("Geolocation is not supported by your browser");
    } else {
      navigator?.geolocation?.getCurrentPosition(success, errorlocation);
    }
  };

  const handleMapDrag = (map) => {
    geocodeByLatLng({ lat: map?.center[1], lng: map?.center[0] }).then(
      (result) => {
        const country = result?.find((ele) =>
          ele?.types?.includes("country")
        )?.formatted_address;

        if (country !== COUNTRY) {
          formApi.setError(
            "wrong_country",
            "Locations outside Kuwait are invalid"
          );
        } else {
          formApi.setError("wrong_country", null);
        }

        if (result?.[getIndex(result, 6)]?.address_components[0]?.long_name) {
          formApi.setValue(
            "formatted_address",
            `${
              result?.[getIndex(result, 3)]?.address_components[0]?.long_name
            }${
              result?.[getIndex(result, 6)]?.formatted_address
                ? `, ${result?.[getIndex(result, 6)]?.formatted_address}`
                : ""
            }`
          );
          formApi.setValue(
            "address_form.street",
            result?.[getIndex(result, 3)]?.address_components[0]?.long_name
          );
        }

        formApi.setValue("google_map.locationSearch", [
          {
            label: result?.[getIndex(result, 0)]?.formatted_address,
            value: result?.[getIndex(result, 0)],
          },
        ]);
        formApiRef.current.setValue("lat", map?.center[1]);
        formApiRef.current.setValue("lng", map?.center[0]);
      }
    );
  };

  const onGoogleApiLoaded = ({ map }) => {
    mapRef.current = map;
    setMapReady(true);
  };

  return {
    handleCurrentLocation,
    handleChangeAutoComplete,
    mapReady,
    handleMapDrag,
    onGoogleApiLoaded,
  };
};

export default useAddressGoogleMap;

// Helpers
const getIndex = (result, defaultIndex) => {
  const resultLength = result?.length || 0;
  const position =
    resultLength <= defaultIndex ? resultLength - 1 : defaultIndex;
  return resultLength === 1 ? 0 : position;
};

const getCountry = (place) => {
  for (const element of place) {
    for (const address of element?.address_components || []) {
      if (address?.long_name === COUNTRY) {
        return address?.long_name;
      }
    }
  }
  return null;
};
