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
import { useParams } from "react-router-dom";

const CheckoutAccordion = () => {
  const { isSignedIn, user, loading } = useGlobalData();
  const {
    purchaseMethod,
    activeAccordion,
    changeCurrentAccordion,
    disabled,
    getComletedSteps,
  } = useCheckoutContext();
  const locale =useParams();
  console.log("CheckoutAccordion State:", {
    isSignedIn,
    loading,
    user,
    purchaseMethod,
    activeAccordion,
    disabled,
    completedSteps: getComletedSteps(),
  });
  console.log(locale)

  const guestData = getLocalStorageWithExpiry(GUEST_USER_KEY);
  const { mobile } = guestData || {};

  const fullName = user
    ? `${user.firstname || ""} ${user.lastname || ""}`.trim()
    : "";
  const phoneNumber = user?.mobile_number || "";

  const getUserName = () => {
    if (fullName && phoneNumber) return `${fullName}, ${phoneNumber}`;
    if (phoneNumber) return phoneNumber;
    if (fullName) return fullName;
    return "Guest";
  };

  const userName = getUserName();

  const userInfoTitle = loading ? (
    <div className="shine">Loading...</div>
  ) : isSignedIn ? (
    <>Continue as {userName}</>
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
      jsxComponent: isSignedIn ? (
        <div className="text-16 text-black p-4">Signed in as {userName}</div>
      ) : (
        <LoginOrGuest />
      ),
    },
    {
      position: "02",
      eventKey: "customer_address",
      title: "Delivery or Pickup",
      jsxComponent: <CustomerAddress />,
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
        onValueChange={(value) => {
          console.log(`Accordion value change: ${value}`);
          changeCurrentAccordion(value, purchaseMethod);
        }}
        collapsible
        className="w-full flex flex-col gap-2"
      >
        {checkoutSteps.map((item) => (
          <CustomAccordionItem
            key={item.eventKey}
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
