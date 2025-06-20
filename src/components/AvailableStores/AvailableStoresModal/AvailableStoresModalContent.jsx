import { Fragment } from "react";
import Map from "../../Map/Map";
import StoreCard from "../../StoreCard/StoreCard";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import useFindStore from "./useFindStores";
import { MAP_DEFAULT_COORDINATES } from "../../Constants";
import { Locate } from "lucide-react";

const AvailableStoresModalContent = ({ sku, combinationNotFound }) => {
  const {
    stores,
    isLoading,
    onGoogleApiLoaded,
    updateStoreDetails,
    handleCurrentLocation,
  } = useFindStore({ sku });

  return (
    <DialogContent className="px-4 py-5 tablet:px-6 tablet:py-6 tabletPro:px-[45px] tabletPro:py-[50px] max-w-full sm:max-w-[550px] tablet:max-w-[650px] tabletPro:max-w-[800px] laptop:max-w-[878px] desktop-xl:max-w-[1220px] max-h-full overflow-hidden overflow-y-auto search-wrap">
      <DialogHeader className="hidden">
        <DialogTitle>Available stores</DialogTitle>
      </DialogHeader>
      <div className="grid gap-5 grid-cols-1 tablet:grid-cols-2">
        <h4 className="mobile:hidden text-20 text-black font-medium leading-6 mb-2">
          Available stores
        </h4>
        <div className="relative">
          <button
            className="absolute min-w-[132px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] top-[14px] start-[14px] z-[1] rounded-[36px] bg-white px-[6px] py-2 h-9 text-14 font-medium text-black flex justify-center items-center gap-[6px] hover:bg-black hover:text-white transition ease-in-out duration-300 "
            onClick={handleCurrentLocation}
            disabled={isLoading}
          >
            <Locate size={16} color="currentColor" />
            Locate Me
          </button>
          <div className="rounded-[7px] aspect-square tablet:aspect-[400/416] overflow-hidden">
            {isLoading ? (
              <div className="rounded-[7px] bg-gray-bg animate-pulse aspect-square tablet:aspect-[400/416] overflow-hidden"></div>
            ) : (
              <Map
                onGoogleApiLoaded={onGoogleApiLoaded}
                mapData={stores}
                defaultCenter={MAP_DEFAULT_COORDINATES}
                loadingContent={
                  <div className="rounded-[7px] bg-gray-bg animate-pulse aspect-square tablet:aspect-[400/416] overflow-hidden"></div>
                }
              />
            )}
          </div>
        </div>
        {combinationNotFound ? (
          <div className="flex flex-col items-center justify-center">
            <h4 className="text-22 font-medium text-black ">
              Please select a combination
            </h4>
          </div>
        ) : stores?.length > 0 ? (
          <div>
            <h4 className="max-mobile:hidden text-20 text-black font-medium leading-6 mb-4">
              Available stores
            </h4>
            <div className="max-h-[360px] flex flex-col gap-y-2 overflow-hidden overflow-y-auto pe-1 search-wrap">
              {stores?.map((item) => (
                <Fragment key={item?.name}>
                  <StoreCard content={item} />
                </Fragment>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center">
            <h4 className="text-22 font-medium text-black ">
              No stores available
            </h4>
          </div>
        )}
      </div>
    </DialogContent>
  );
};

export default AvailableStoresModalContent;
