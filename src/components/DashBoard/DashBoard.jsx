import AccountFaq from "../AccountFaq/AccountFaq";
import Link from "../Link";
import {
  User,
  ShoppingBag,
  MapPin,
  Heart,
  Star,
  CreditCard,
} from "lucide-react";

const iconMap = {
  "account-person": User,
  orders: ShoppingBag,
  "account-address": MapPin,
  "account-wishlist": Heart,
  "account-rating": Star,
  "account-credit": CreditCard,
};

const DashboardPage = ({ faqData }) => {
  return (
    <div data-widget="DashboardPage" className="main-container">
      <div className="laptop:max-w-[1402px] m-auto w-full py-4">
        <h1 className="hidden tablet:block text-[28px] font-semibold leading-5 text-black">
          Dashboard
        </h1>
        <div className="mt-5 grid gird-cols-1 mobile:grid-cols-2 laptop:grid-cols-3 gap-x-5 gap-y-4 laptop:gap-y-[26px] ">
          {DASHBOARDLINKS.map((item) => {
            const IconComponent = iconMap[item.iconText];
            return (
              <Link
                key={item.id}
                href={item.link}
                className="block p-5 tablet:p-6 laptop:p-9 text-lw-primary bg-white rounded-[8px] border border-white hover:border-lw-primary transition duration-300 ease-in-out"
              >
                {IconComponent && (
                  <IconComponent size={item.iconSize} color="inherit" />
                )}
                <p className="text-20 mt-[22px] font-medium text-black leading-5">
                  {item.text}
                </p>
                <p className="mt-2 text-16 text-[#545454] leading-5 ">
                  {item.subText}
                </p>
              </Link>
            );
          })}
        </div>
        <div className="pt-7 tablet:pt-10 laptop:pt-[95px]">
          <AccountFaq faqData={faqData} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;

const DASHBOARDLINKS = [
  {
    id: 2,
    text: "Personal Details",
    subText: "Edit account & personal informations",
    link: "/account/personal-details",
    iconText: "account-person",
    iconSize: 40,
  },
  {
    id: 3,
    text: "Your Orders",
    subText: "Track, return, or buy things again",
    link: "/account/orders",
    iconText: "orders",
    iconSize: 40,
  },
  {
    id: 4,
    text: "Your Address Book",
    subText: "Edit addresses for orders and gifts",
    link: "/account/address",
    iconText: "account-address",
    iconSize: 40,
  },
  {
    id: 5,
    text: "Wishlist",
    subText: "View your wish-listed products",
    link: "/wishlist",
    iconText: "account-wishlist",
    iconSize: 40,
  },
  {
    id: 7,
    text: "My Product Reviews",
    subText: "Add your products reviews",
    link: "/account/reviews",
    iconText: "account-rating",
    iconSize: 40,
  },
  {
    id: 6,
    text: "Store Credit",
    subText: "View your store credit balance",
    link: "/account/store-credit",
    iconText: "account-credit",
    iconSize: 40,
  },
];
