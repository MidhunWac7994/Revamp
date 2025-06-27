import { useGlobalData } from "./useGlobalData";
import {
  COUNTRY,
  DELIVERY_LOCATION_KEY,
  MAP_DEFAULT_COORDINATES,
} from "../components/Constants"
import useRegionList from '../components/RegionList/useRegionList';

const useFormInitialValue = () => {
  const { firstname, lastname, phoneNumber } = useGlobalData();
  const locationString =
    typeof window !== "undefined"
      ? localStorage.getItem(DELIVERY_LOCATION_KEY)
      : null;

  const parsedLocation = locationString ? JSON.parse(locationString) : [];
  const [city, , , , regionCode, coordinates] = parsedLocation;

  const { regions } = useRegionList();
  const area =
    regions?.find((ele) => ele?.value?.includes(regionCode))?.value || "";

  const existingUserFormValues = {
    google_map: {
      lat: coordinates?.lat || MAP_DEFAULT_COORDINATES.lat,
      lng: coordinates?.lng || MAP_DEFAULT_COORDINATES.lng,
    },
    address_form: {
      firstname: firstname || "",
      lastname: lastname || "",
      telephone: phoneNumber || "",
      type_of_address: 0,
      defaultAddress: false,
      area,
      city,
      country: COUNTRY,
    },
  };

  return { existingUserFormValues };
};

export default useFormInitialValue;
