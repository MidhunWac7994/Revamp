import { useState } from "react";
import { Accordion } from "../../components/ui/accordion";
import LoginOrGuest from "../Login/Login";
import { useGlobalData } from "../../../CustomHook/useGlobalData";
import CustomAccordionItem from "../CustomAccordionItem/CustomAccordionItem";
import { useCheckoutContext } from "../CheckoutProvider/CheckoutProvider";
import CustomerAddress from "../CustomerAddress/CustomerAdress";
import CheckoutShipping from "../CheckoutShipping/CheckoutShipping";
import Payment from "../Payment/Payment";
import Spinner from "../../Spinner/Spinner";
import AuthBlocks from "../../../Pages/Auth/AuthBlocks/AuthBlock";

const CheckoutAccordion = () => {
  const { isSignedIn, user, loading } = useGlobalData();
  const {
    purchaseMethod,
    activeAccordion,
    changeCurrentAccordion,
    disabled,
    getComletedSteps,
  } = useCheckoutContext();

  const [showAuthModal, setShowAuthModal] = useState(false); 

  const fullName = user
    ? `${user.firstname || ""} ${user.lastname || ""}`.trim()
    : "";
  const phoneNumber = user?.mobile_number || "";

  const getUserName = () => {
    if (fullName && phoneNumber) return `${fullName}, ${phoneNumber}`;
    if (phoneNumber) return phoneNumber;
    if (fullName) return fullName;
    return "User";
  };

  const userName = getUserName();

  const userInfoTitle = loading ? (
    <div className="shine">
      <Spinner />
    </div>
  ) : isSignedIn ? (
    <>Continue as {userName}</>
  ) : (
    "Login to continue"
  );

  const checkoutSteps = [
    {
      position: "01",
      eventKey: "customer_info",
      title: userInfoTitle,
      jsxComponent: isSignedIn ? (
        <div className="text-16 bg-gray-200 text-black p-4">Signed in as {userName}</div>
      ) : (
        <LoginOrGuest onLoginClick={() => setShowAuthModal(true)} />
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
    <div className="w-[600px] ml-44 ">
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

      {showAuthModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          
          <div
            className="absolute inset-0  bg-opacity-40"
            onClick={() => setShowAuthModal(false)} 
          ></div>

          <div className="relative z-10 bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-black"
              onClick={() => setShowAuthModal(false)}
            >
              ✕
            </button>
            <AuthBlocks onClose={() => setShowAuthModal(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default CheckoutAccordion;
