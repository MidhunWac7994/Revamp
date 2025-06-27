import {
  Multistep,
  useFormState,
  useMultistepApi,
  useMultistepState,
} from "informed";
import { MapPin, Truck } from "lucide-react";
import PhoneEmailSwitcherInput from "../../../../PhoneEmailSwitcherInput/phoneEmailISwitcherinput";
import StoreCard from "../../../../StoreCard/StoreCard";
import TextInput from "../../../../TextInput/TextInput";
import combine from "../../../../../utils/combine";
import {
  isRequired,
  validateEmail,
  validateName,
} from "../../../../../utils/formValidator";
import { Button } from "../../../../../components/components/ui/button";
import FormSubmitButton from "../../../../FormSubmitButton/formSubmitButton";
import StoreList from "../../StoreList/StoreList";
import { MAP_DEFAULT_COORDINATES } from "../../../../Constants";
import Map from "../../../../Map/Map";

const PickupStoreAndForm = (props) => {
  const {
    stores,
    handleSelectStore,
    isMutating,
    active,
    handleCurrentLocation,
    isLoading,
    onGoogleApiLoaded,
    handleDeliveryType,
  } = props;

  const { next, previous } = useMultistepApi();
  const { current } = useMultistepState();
  const formState = useFormState();
  const { values } = formState;

  const handleNext = (storeCode) => {
    next();
    handleSelectStore(storeCode);
  };

  return (
    <div className={`grid gap-5 grid-cols-1 tablet:grid-cols-2 relative`}>
      <div className="relative">
        <button
          className="absolute min-w-[132px] shadow-md top-[14px] start-[14px] z-[1] border border-black rounded-[36px] bg-white px-[6px] py-2 text-14 font-medium text-black flex justify-center items-center gap-[6px] hover:bg-black hover:text-white transition ease-in-out duration-300 h-9"
          onClick={handleCurrentLocation}
          disabled={isLoading}
        >
          <MapPin size={16} />
          Locate Me
        </button>
        <div className="rounded-0 aspect-[400/416] overflow-hidden">
          {isLoading ? (
            <div className="bg-gray-bg animate-pulse rounded-0 aspect-[400/416] overflow-hidden" />
          ) : (
            <Map
              onGoogleApiLoaded={onGoogleApiLoaded}
              mapData={stores}
              defaultCenter={MAP_DEFAULT_COORDINATES}
              loadingContent={
                <div className="bg-gray-bg animate-pulse rounded-0 aspect-[400/416] overflow-hidden" />
              }
            />
          )}
        </div>
      </div>

      <Multistep.Step step="stores">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-18 font-semibold text-black">Pick a Store</h3>
          <Button
            size="xl"
            variant="outlinePrimary"
            onClick={() => handleDeliveryType("home_delivery")}
          >
            <Truck size={22} />
            <span className="ml-2">Home Delivery</span>
          </Button>
        </div>

        {stores?.length > 0 ? (
          <StoreList
            stores={stores}
            handleNext={handleNext}
            isMutating={isMutating}
            active={active}
            values={values}
          />
        ) : (
          <p className="text-red-600">
            Store pickup not available for products in your cart.
          </p>
        )}
      </Multistep.Step>

      <Multistep.Step step="pickup_form">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-18 font-semibold text-black">Contact Details</h3>
          <Button
            size="xl"
            variant="outlinePrimary"
            onClick={() => handleDeliveryType("home_delivery")}
          >
            <Truck size={22} />
            <span className="ml-2">Home Delivery</span>
          </Button>
        </div>

        <div className="overflow-y-auto pe-1">
          <StoreCard
            content={values?.storeCode}
            isSelectedStore
            handleClick={previous}
            jsxComponent={
              <div className="border border-black py-1 px-3 text-14 font-normal mt-4 w-fit cursor-pointer">
                Change Store
              </div>
            }
          />

          <div className="mt-6 space-y-4">
            <TextInput
              name="fullName"
              label="Full name"
              placeholder="Full name"
              validateOn="change"
              floating
              validate={combine([isRequired, validateName])}
            />
            <TextInput
              name="email"
              label="Email"
              placeholder="Email"
              validateOn="change"
              floating
              validate={combine([isRequired, validateEmail])}
            />
            <PhoneEmailSwitcherInput
              name="phone"
              label="Phone Number"
              validateOn="change"
              floating
              mobileNumberOnly
              step="pickup_form"
            />
          </div>

          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="outlineDark"
              className="text-16 text-primary font-semibold h-[48px] min-w-[125px]"
              onClick={previous}
            >
              Back
            </Button>

            <FormSubmitButton
              requiredFields={["fullName", "phone", "email"]}
              loading={isMutating}
              variant="primary"
              label="Confirm"
              step="pickup_form"
              className="min-w-[200px] h-[48px]"
            />
          </div>
        </div>
      </Multistep.Step>
    </div>
  );
};

export default PickupStoreAndForm;
