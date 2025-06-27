import { Accordion } from "../../components/ui/accordion";
import LoginOrGuest from "../Login/Login";
import { useGlobalData } from "../../../CustomHook/useGlobalData";
import CustomAccordionItem from "../CustomAccordionItem/CustomAccordionItem";
import { useCheckoutContext } from "../CheckoutProvider/CheckoutProvider";
import CustomerAddress from "../CustomerAddress/CustomerAdress";
import CheckoutShipping from "../CheckoutShipping/CheckoutShipping";
import Payment from "../Payment/Payment";
import { getLocalStorageWithExpiry } from "../../../utils/storageUtil";
import { GUEST_USER_KEY } from "../../Constants";

const CheckoutAccordion = () => {
  const { isSignedIn, userLoading, fullName, phoneNumber } = useGlobalData();
  const {
    purchaseMethod,
    activeAccordion,
    changeCurrentAccordion,
    disabled,
    getComletedSteps,
  } = useCheckoutContext();
  const guestData = getLocalStorageWithExpiry(GUEST_USER_KEY);
  const { mobile } = guestData || {};

  const getUserName = () => {
    if (fullName && phoneNumber) return `${fullName}, ${phoneNumber}`;
    if (phoneNumber) return phoneNumber;
    if (fullName) return fullName;
    return "";
  };

  const userName = getUserName();

  const userInfoTitle = isSignedIn ? (
    <>Continue as {userLoading ? <div className="shine" /> : userName}</>
  ) : mobile ? (
    <>Continue as guest {mobile}</>
  ) : (
    "Login or Continue as Guest user"
  );

  const checkoutSteps = [
    {
      position: "01",
      eventKey: "customer_info",
      title: userInfoTitle,
      jsxComponent: <LoginOrGuest />,
    },
    {
      position: "02",
      eventKey: "customer_address",
      title: "Delivery or Pickup",
      jsxComponent: <CustomerAddress isSignedIn={isSignedIn} />,
    },
    ...(purchaseMethod === "home_delivery"
      ? [
          {
            position: "03",
            eventKey: "shipping",
            title: "Choose shipping method",
            jsxComponent: <CheckoutShipping />,
          },
        ]
      : []),
    {
      position: purchaseMethod === "storepickup" ? "03" : "04",
      eventKey: "payment",
      title: "Payment Options",
      jsxComponent: <Payment />,
    },
  ];

  return (
    <div data-widget="CheckoutAccordion">
      <Accordion
        type="single"
        value={activeAccordion}
        onValueChange={(value) => changeCurrentAccordion(value, purchaseMethod)}
        collapsible
        className="w-full flex flex-col gap-2"
      >
        {checkoutSteps?.map((item) => (
          <CustomAccordionItem
            key={item?.eventKey}
            disabled={disabled}
            completed={getComletedSteps(checkoutSteps)}
            {...item}
          />
        ))}
      </Accordion>
    </div>
  );
};

export default CheckoutAccordion;
