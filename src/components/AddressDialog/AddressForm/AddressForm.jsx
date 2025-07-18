import { Multistep, useFormState, useMultistepApi } from "informed";
import CityList from "../../CityList/CityList";
import FormRadio from "../../FormRadio/FormRadio";
import FormSubmitButton from "../../FormSubmitButton/formSubmitButton";
import FormSwitch from "../../FormSwitch/FormSwitch";
import PhoneEmailSwitcherInput from "../../PhoneEmailSwitcherInput/phoneEmailISwitcherinput";
import RegionList from "../../RegionList/RegionList";
import TextInput from "../../TextInput/TextInput";
import { Button } from "../../components/ui/button";
import combine from "../../../utils/combine";
import {
  isRequired,
  validateEmail,
  validateName,
} from "../../../utils/formValidator";
import { useGlobalData } from "../../../CustomHook/useGlobalData";

const AddressForm = (props) => {
  const {
    isCheckout,
    submitBtnLabel,
    isMutating,
    formTitle,
    headerButton,
    initialCase,
  } = props;

  const { previous } = useMultistepApi();
  const { values } = useFormState();
  const { isSignedIn } = useGlobalData();

  return (
    <Multistep.Step step="address_form">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold">{formTitle}</h2>
        {headerButton && headerButton}
      </div>

      {values?.formatted_address && (
        <div className="my-4  border border-gray-400 px-4 py-3 rounded-none  flex items-center justify-between">
          <p className="text-base font-semibold text-black">
            {values?.formatted_address}
          </p>
          <Button
            className="p-0 no-underline h-fit text-primary-blue"
            variant="link"
            type="button"
            onClick={previous}
          >
            Change
          </Button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-[15px] gap-y-[25px]">
        <TextInput
          type="text"
          name="firstname"
          validateOn="change"
          className="mb-0"
          validate={combine([isRequired, validateName])}
          placeholder="First Name"
          label="First Name"
          maxLength={50}
        />
        <TextInput
          type="text"
          name="lastname"
          validateOn="change"
          className="mb-0"
          validate={combine([isRequired, validateName])}
          placeholder="Last Name"
          label="Last Name"
          maxLength={50}
        />
        {isCheckout && !isSignedIn && (
          <TextInput
            type="text"
            name="email"
            validateOn="change"
            className="mb-0"
            validate={combine([isRequired, validateEmail])}
            placeholder="Email"
            label="Email"
          />
        )}
        <PhoneEmailSwitcherInput
          name="telephone"
          placeholder="Mobile number"
          label="Mobile number"
          mobileNumberOnly
          validateOn="change"
          className="mb-0"
          floating={false}
          step="address_form"
        />
        <TextInput
          type="text"
          name="country"
          className="mb-0"
          validateOn="change"
          validate={combine([isRequired])}
          placeholder="Country or Region"
          label="Country or Region"
          disabled
        />
        <RegionList
          name="area"
          validate={combine([isRequired])}
          placeholder="Area"
          label="Area"
          className="text-base"
        />
        <CityList
          name="city"
          placeholder="City"
          validate={combine([isRequired])}
          label="City"
          className="text-base"
        />
        <div className={isCheckout && !isSignedIn ? "" : "md:col-span-2"}>
          <TextInput
            type="text"
            name="street"
            className="mb-0"
            placeholder="Address"
            validateOn="change"
            validate={combine([isRequired])}
            label="Address"
          />
        </div>
        <div className="md:col-span-2">
          <TextInput
            type="text"
            name="landmark"
            className="mb-0"
            placeholder="Landmark"
            label="Landmark"
          />
        </div>
        <FormRadio
          name="type_of_address"
          label="Type of Address"
          options={TYPE_OF_ADDRESS}
          itemClass="flex-row-reverse gap-2 cursor-pointer"
          className="flex mt-3 justify-start"
        />
        {!isCheckout && (
          <FormSwitch
            className="flex items-center md:justify-end space-x-[15px]"
            name="default_address"
            id="default_address"
            label="Set default address"
          />
        )}
      </div>

      <div className="flex justify-end gap-4 mt-6">
        <Button
          type="button"
          variant="outline"
          className="h-[50px] min-w-[125px] rounded-none border-black"
          onClick={previous}
        >
          Back
        </Button>
        <FormSubmitButton
          className="h-[50px] min-w-[125px] rounded-none  bg-[#2cb5a7] text-white  "
          variant="primary"
          label={submitBtnLabel}
          loading={isMutating}
          step="address_form"
          requiredFields={[
            "firstname",
            "lastname",
            "street",
            "area",
            "telephone",
            "city",
          ]}
        />
      </div>
    </Multistep.Step>
  );
};

export default AddressForm;

export const TYPE_OF_ADDRESS = [
  { value: 0, label: "Home" },
  { value: 1, label: "Office" },
];
