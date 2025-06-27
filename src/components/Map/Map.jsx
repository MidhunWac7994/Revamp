import React, { useState, useEffect } from "react";
import GoogleMap from "google-maps-react-markers";
import locator from "../../components/Map/Marker/marker.svg";

const Map = (props) => {
  const {
    mapData,
    defaultZoom = 13,
    disableTimeout,
    handleMapDrag,
    ...rest
  } = props;
  const [isMapLoaded, setIsMapLoaded] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsMapLoaded(true);
    }, 200);
  }, []);

  return isMapLoaded ? (
    <>
      <GoogleMap
        apiKey={import.meta.env.VITE_API_ENDPOINT_FOR_MAPS}
        defaultZoom={defaultZoom}
        className="w-full h-full"
        options={getMapOptions()}
        onChange={(map) => handleMapDrag?.(map)}
        {...rest}
      >
        {mapData?.length > 0 &&
          mapData?.map((store, index) => {
            return (
              <Marker
                key={index}
                lat={store?.latitude}
                lng={store?.longitude}
                storeName={store?.name}
                storeAddress={store?.street}
              />
            );
          })}
      </GoogleMap>
      <div
        className={
          "absolute top-[50%] left-0 m-auto right-0  translate-y-[-50%] flex items-center justify-center z-80"
        }
      >
        <img src={locator} sizes="10vw" width={70} height={70} alt="center" />
      </div>
    </>
  ) : (
    <div className="tablet:rounded-[7px] aspect-[393/640] mobile:aspect-[700/450] overflow-hidden animate-pulse bg-gray-bg-1 "></div>
  );
};

export default Map;
const getMapOptions = () => ({
  mapTypeControl: false,
  streetViewControl: false,
  gestureHandling: "auto",
  zoomControl: true,
  styles: [
    {
      elementType: "labels.text.fill",
      stylers: [{ color: "#2f3033" }],
    },
    {
      featureType: "road.highway",
      elementType: "geometry",
      stylers: [{ color: "#9fb4cd" }, { weight: 2 }],
    },
    {
      featureType: "road.arterial",
      elementType: "geometry",
      stylers: [{ color: "#b0bec5" }, { weight: 1.5 }],
    },
    {
      featureType: "road.local",
      elementType: "geometry",
      stylers: [{ visibility: "simplified" }, { color: "#e0e0e0" }],
    },
    {
      featureType: "road.local",
      elementType: "labels",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "transit",
      elementType: "all",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "poi",
      elementType: "all",
      stylers: [{ visibility: "off" }],
    },
    {
      featureType: "water",
      elementType: "geometry",
      stylers: [{ color: "#91d6e8" }],
    },
  ],
});
