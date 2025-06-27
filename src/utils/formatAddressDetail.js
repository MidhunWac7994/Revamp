import { COUNTRY, MAP_DEFAULT_COORDINATES } from  "../components/Constants";
import { isObjectEmpty } from "./objectUtil";

export const formatAddressDetails = (address) => {
  if (address && !isObjectEmpty(address)) {
    const fullName = `${address?.firstname} ${address?.lastname}`;

    const street = address?.street?.[0];
    const city = address?.city ? `${address?.city}, ` : "";
    const region = address?.region?.region
      ? `${address?.region?.region}, `
      : "";

    const fullAddress = `${
      street ? street + ", " : ""
    }${city}${region}${COUNTRY}.`.trim();

    return { fullName, fullAddress };
  }

  return {};
};

export const getAddressFormValues = (address) => {
  return {
    google_map: {
      lat: address?.latitude || MAP_DEFAULT_COORDINATES?.lat,
      lng: address?.longitude || MAP_DEFAULT_COORDINATES?.lng,
    },
    address_form: {
      firstname: address?.firstname,
      lastname: address?.lastname,
      telephone: address?.telephone,
      area: `${address?.region?.region_id}_${address?.region?.region}_${address?.region?.region_code}`,
      type_of_address: address?.type_of_address,
      city: address?.city,
      address: address?.street?.[0],
      default_address: address?.default_shipping,
      landmark: address?.street?.[1],
      country: COUNTRY,
    },
  };
};
