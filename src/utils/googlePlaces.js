export const geocodeByLatLng = (latLng) => {
  if (typeof window === "undefined" || !window.google || !window.google.maps)
    return null;

  const geocoder = new window.google.maps.Geocoder();
  const OK = window?.google?.maps?.GeocoderStatus?.OK;

  return new Promise((resolve, reject) => {
    geocoder.geocode({ location: latLng }, (results, status) => {
      if (status !== OK) return reject(status);

      return resolve(results);
    });
  });
};

export const geocodeByPlaceId = (placeId) => {
  if (typeof window === "undefined" || !window.google || !window.google.maps)
    return null;

  const geocoder = new window.google.maps.Geocoder();
  const OK = window?.google?.maps?.GeocoderStatus?.OK;

  return new Promise((resolve, reject) => {
    geocoder.geocode({ placeId }, (results, status) => {
      if (status !== OK) {
        return reject(status);
      }
      return resolve(results);
    });
  });
};

export const getLatLng = (result) =>
  new Promise((resolve, reject) => {
    try {
      const latLng = {
        lat: result.geometry.location.lat(),
        lng: result.geometry.location.lng(),
      };
      return resolve(latLng);
    } catch (e) {
      return reject(e);
    }
  });

export const getLatLngFromAddress = async (address) => {
  const endpoint = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(
    address
  )}&key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}`;

  const response = await fetch(endpoint);
  const data = await response.json();

  if (data.status === "OK") {
    const { lat, lng } = data?.results?.[0]?.geometry?.location;
    return { lat, lng };
  } else {
    return null;
  }
};
