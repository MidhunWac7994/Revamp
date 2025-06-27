import { useFormState, useMultistepApi, Multistep } from "informed";
import PlacesAutoComplete from "../../PlacesAutoComplete/PlacesAutoComplete";
import { Button } from "../../components/ui/button";
import { DialogClose } from "../../components/ui/dialog";
import { LocateFixed } from "lucide-react";
import useAddressGoogleMap from "./useAddressGoogleMap";
import Map from "../../Map/Map";

const AddressGoogleMap = (props) => {
  const {
    formApiRef,
    userCoordinates,
    initialCase,
    headerButton,
    formTitle = "Complete Your Address",
  } = props;

  const { next } = useMultistepApi();
  const lat = formApiRef.current?.getValue("lat");
  const lng = formApiRef.current?.getValue("lng");

  const formState = useFormState();
  const { errors } = formState;

  const {
    handleCurrentLocation,
    handleChangeAutoComplete,
    handleMapDrag,
    onGoogleApiLoaded,
    mapReady,
  } = useAddressGoogleMap({ formApiRef });

  return (
    <Multistep.Step step="google_map">
      <div className="relative w-full h-full space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold">{formTitle}</h2>
          {headerButton && headerButton}
        </div>

        {mapReady ? (
          <PlacesAutoComplete
            handleChangeAutoComplete={handleChangeAutoComplete}
            loader={<div className="h-[50px] bg-gray-100 animate-pulse" />}
          />
        ) : (
          <div className="h-[50px] bg-gray-100 animate-pulse" />
        )}

        <div className="relative w-full h-[400px] overflow-hidden rounded border">
          <button
            type="button"
            onClick={handleCurrentLocation}
            className="absolute z-10 top-4 left-4 bg-white text-black shadow-md px-3 py-2 rounded-md text-sm font-medium flex items-center gap-2 hover:bg-black hover:text-white transition"
          >
            <LocateFixed size={16} />
            Locate Me
          </button>

          <Map
            onGoogleApiLoaded={onGoogleApiLoaded}
            handleMapDrag={handleMapDrag}
            defaultCenter={{
              lat: lat ?? userCoordinates?.lat,
              lng: lng ?? userCoordinates?.lng,
            }}
            loadingContent={
              <div className="h-full w-full bg-gray-100 animate-pulse" />
            }
          />
          {errors?.wrong_country && (
            <p className="absolute right-4 bottom-2 text-sm text-red-500">
              {errors?.wrong_country}
            </p>
          )}
        </div>

        <div className="flex justify-end gap-4 pt-4">
          {!initialCase && (
            <DialogClose asChild>
              <Button variant="outline" type="button">
                Close
              </Button>
            </DialogClose>
          )}
          <Button
            variant="default"
            type="button"
            onClick={next}
            disabled={!!errors?.wrong_country}
          >
            Continue
          </Button>
        </div>
      </div>
    </Multistep.Step>
  );
};

export default AddressGoogleMap;
