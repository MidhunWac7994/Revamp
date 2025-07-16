import { useEffect, useMemo, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../../components/ui/dialog";
import { X } from "lucide-react";

const MyFatoorahPortal = ({ myFatoorahConfig, title, handlePlaceOrder }) => {
  const ref = useRef(null);
  const initialized = useRef(false); 
  const { locale } = useParams();
  const navigate = useNavigate();

  const payment = (response) => {
    if (response.isSuccess) {
      console.log("success", response);
      if (response.paymentType === "Card") {
        handlePlaceOrder(response?.sessionId);
      }
    } else {
      console.log("error", response);
      if (response?.error !== "Card details are invalid or missing!") {
        navigate(`/${locale}/payment-receipt?status=0`);
      }
    }
  };

  const sessionCanceled = () => console.log("Session canceled");
  const sessionStarted = () => console.log("Session started");
  const submit = () => {
    console.log("Submit clicked");
    ref.current?.submitCardPayment?.();
  };

  const config = useMemo(() => {
    if (!myFatoorahConfig?.SessionId || !myFatoorahConfig?.paymentOptions) {
      return null;
    }
    return {
      sessionId: myFatoorahConfig?.SessionId,
      countryCode: myFatoorahConfig?.CountryCode,
      currencyCode: myFatoorahConfig?.currencyCode,
      amount: String(myFatoorahConfig?.amount),
      callback: payment,
      containerId: "embedded-payment",
      paymentOptions: myFatoorahConfig?.paymentOptions,
      language: locale,
      settings: getStyleConfig(locale, sessionStarted, sessionCanceled, submit),
    };
  }, [myFatoorahConfig, locale]);

  useEffect(() => {
    const scriptSrc = import.meta.env.VITE_API_FATOORAH;

    if (!scriptSrc) {
      console.error("VITE_API_FATOORAH environment variable is not set!");
      return;
    }

    if (!config) {
      console.warn("Waiting for valid config...");
      return;
    }

    const initMyFatoorah = () => {
      if (initialized.current) return;

      if (!window.myfatoorah) {
        console.error("MyFatoorah SDK not available after script load.");
        return;
      }

      const container = document.getElementById("embedded-payment");
      if (!container) {
        console.error("Container with id 'embedded-payment' not found.");
        return;
      }

      console.log("Initializing MyFatoorah with config:", config);
      ref.current = window.myfatoorah;
      window.myfatoorah.init(config);
      initialized.current = true;
    };

    const existingScript = document.querySelector(`script[src="${scriptSrc}"]`);

    if (!existingScript) {
      const script = document.createElement("script");
      script.src = scriptSrc;
      script.async = true;
      script.onload = initMyFatoorah;
      document.body.appendChild(script);
    } else {
      // script already loaded
      if (window.myfatoorah) {
        initMyFatoorah();
      } else {
        existingScript.addEventListener("load", initMyFatoorah);
      }
    }
  }, [config]);

  return (
    <DialogContent
      closeHidden
      className="px-4 pb-5 tablet:px-6 tablet:py-6 tabletPro:px-7 tabletPro:py-7 max-w-full sm:max-w-[550px] tablet:max-w-[650px] tabletPro:max-w-[800px] laptop:max-w-[650px] rounded-none max-mobile:h-full desktop:max-w-[780px] desktop-lg:max-w-[878px] max-mobile:pt-mob-header-heaight max-mobile:px-0 max-mobile:py-0"
    >
      <DialogHeader className="tablet:mb-[30px] max-mobile:fixed max-mobile:z-10 max-mobile:top-0 max-mobile:start-0 max-mobile:w-full max-mobile:bg-white max-mobile:h-auto max-mobile:py-[14px] max-mobile:px-5 max-mobile:border-b border-[#E9E9E9] flex justify-between items-center">
        <DialogTitle className="text-20 text-black font-semibold leading-6">
          {title}
        </DialogTitle>
        <DialogClose className="z-10 flex items-center justify-center w-[29px] ps-[7px] h-full cursor-pointer">
          <X size={20} className="text-black" />
        </DialogClose>
      </DialogHeader>

      <div id="embedded-payment" className="w-full h-full max-mobile:px-4" />
    </DialogContent>
  );
};

export default MyFatoorahPortal;

const getStyleConfig = (locale, sessionStarted, sessionCanceled, submit) => ({
  card: {
    style: {
      hideNetworkIcons: false,
      cardHeight: "200px",
      tokenHeight: "230px",
      input: {
        color: "black",
        fontSize: "15px",
        inputHeight: "32px",
        inputMargin: "3px",
        borderColor: "black",
        backgroundColor: "white",
        placeHolder: {
          holderName: "Name On Card",
          cardNumber: "Number",
          expiryDate: "MM/YY",
          securityCode: "CVV",
        },
      },
      text: {
        saveCard: "Save card info for future payments",
        addCard: "Use another Card!",
        deleteAlert: {
          title: "Delete",
          message: "Are you sure?",
          confirm: "YES",
          cancel: "NO",
        },
      },
      label: {
        display: true,
        color: "black",
        fontSize: "13px",
        fontWeight: "bold",
        text: {
          holderName: "Card Holder Name",
          cardNumber: "Card Number",
          expiryDate: "Expiry Date",
          securityCode: "Security Code",
        },
      },
      error: {
        borderColor: "red",
      },
      button: {
        useCustomButton: false,
        onButtonClicked: submit,
        fontSize: "16px",
        color: "white",
        backgroundColor: "#4daee0",
        height: "30px",
        width: "70%",
        margin: "0 auto",
        cursor: "pointer",
      },
      separator: {
        useCustomSeparator: false,
        textContent: "Fill your card info",
        fontSize: "20px",
        color: "#4daee0",
        textSpacing: "2px",
        lineStyle: "dashed",
        lineColor: "black",
        lineThickness: "3px",
      },
    },
  },
  applePay: {
    style: {
      frameHeight: "40px",
      frameWidth: "100%",
      button: {
        height: "40px",
        type: "buy",
      },
    },
    useCustomButton: false,
    sessionStarted,
    sessionCanceled,
    requiredShippingContactFields: ["postalAddress", "name", "phone", "email"],
    requiredBillingContactFields: ["postalAddress", "name", "phone"],
  },
  googlePay: {
    style: {
      frameHeight: "55px",
      frameWidth: "100%",
      button: {
        height: "40px",
        type: "pay",
        color: "white",
        language: locale === "en" ? "EN" : "AR",
      },
    },
  },
});
