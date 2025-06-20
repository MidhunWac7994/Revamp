import { Lock as SecureIcon, CreditCard as CardIcon } from "lucide-react";

const PaymentDetails = () => {
  return (
    <div data-widget="PaymentDetails" className="mt-[25px]">
      <div className="flex gap-[5px] items-center">
        {paymentOptions?.map((item) => (
          <figure
            key={item?.id}
            className="h-[25px] min-w-[50px] border-1 border-border-gray rounded-[3px] px-1 py-[5px]"
          >
            <img
              className="max-h-full max-w-full mx-auto"
              src={item?.imageurl}
              alt="payment-option"
            />
          </figure>
        ))}
      </div>

      <div className="mt-[25px] flex items-center group">
        {secureDetails?.map((item, index) => {
          const IconComponent = iconMap[item.icon];
          return (
            <div
              key={item?.id}
              className={`flex gap-3 items-center flex-1 ${
                index === 0
                  ? "ms-0 ps-0 border-0"
                  : "ms-0 ps-[10px] laptop:ms-4 laptop:ps-4 border-border-color laptop:border-s"
              } 
        ${
          index !== secureDetails.length - 1
            ? "border-r border-gray-300 pr-6"
            : "pr-0"
        }
        `}
            >
              <div className="flex-[0_0_30px] laptop:flex-[0_0_36px] h-[30px] laptop:h-9 rounded-full border border-border-color-1 flex items-center justify-center">
                <IconComponent size={20} color="#000000" />
              </div>
              <div className="flex-1">
                <p className="text-[12px] tablet:text-13 text-black font-medium leading-4">
                  {item?.title}
                </p>
                <p className="text-[12px] text-black font-normal leading-4 mt-[3px]">
                  {item?.text}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default PaymentDetails;

const paymentOptions = [
  {
    id: 1,
    imageurl: "/public/apple-pay.png",
  },
  { id: 2, imageurl: "/public/g-pay.png" },
  { id: 3, imageurl: "/public/master-card.png" },
  { id: 4, imageurl: "/public/visa.png" },
  { id: 5, imageurl: "/public/samsung-pay.png" },
];

const secureDetails = [
  {
    id: 1,
    icon: "secure",
    title: "Secure Shopping",
    text: "Your data is always protected",
  },
  {
    id: 2,
    icon: "card",
    title: "Secure Payments",
    text: "100% secure payment",
  },
];

const iconMap = {
  secure: SecureIcon,
  card: CardIcon,
};
