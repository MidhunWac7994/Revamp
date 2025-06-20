import { useQuery, gql } from "@apollo/client";
import {  useState } from "react";
import { getLatLngFromAddress } from '../../utils/googlePlaces';
import { COUNTRY } from "../Constants";

const DELIVERY_LOCATIONS_WITH_DATE = gql`
  query GetDeliveryLocationsWithDate {
    getAreas(code: "") {
      items {
        id
        name
        from_days
        code
        to_days
        is_free_delivery
      }
    }
  }
`;

const LOCAL_STORAGE_KEY = "delivery_location";


const useExpectedDelivery = () => {

  const [selectedLocation, setSelectedLocation] = useState(() => {
    const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  });

  const [location, fromDay = "5", toDay = "7"] = selectedLocation;

  const { data, loading } = useQuery(DELIVERY_LOCATIONS_WITH_DATE);



  const deliveryLocationsDayRange = data?.getAreas?.items || [];

  console.log(deliveryLocationsDayRange, "deliveryLocationsDayRange");
  const options = deliveryLocationsDayRange.map((loc) => ({
    value: `${loc?.name?.trim()}|${loc?.from_days}|${loc?.to_days}|${
      loc?.is_free_delivery
    }|${loc?.code}`,
    label: loc?.name?.trim(),
  }));

  const handleLocationChange = async (value) => {
    let parts = value?.split("|") || [];
    const [location] = parts;

    if (location) {
      try {
        const coords = await getLatLngFromAddress(`${location}, ${COUNTRY}`);
        parts.push(coords);
      } catch (error) {
        console.error("Failed to fetch coordinates:", error);
      }
    }

    setSelectedLocation(parts);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(parts));
  };

  const active = {
    value: selectedLocation,
    label: location,
  };

  return { options, fromDay, toDay, handleLocationChange, active, loading };
};

export default useExpectedDelivery;
