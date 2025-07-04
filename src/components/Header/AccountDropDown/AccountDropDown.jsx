import { Link } from "react-router-dom";
import { useGlobalData } from  "../../../CustomHook/useGlobalData";
import { useSignout } from "../../../CustomHook/useSignout";

const AccountDropdown = () => {
  const { handleSignOut } = useSignout();
  const { isSignedIn, fullName, email } = useGlobalData();

  return (
    isSignedIn && (
      <div
        data-widget="AccountDropdown"
        className="w-[295px] bg-white px-5 py-6 border border-gray-border"
      >
        <div>
          <h5 className="text-18 font-medium font-beausite text-black leading-5">
            Hi, {fullName}
          </h5>
          <p className="mt-2 text-14 font-light font-beausite text-black leading-5">
            {email}
          </p>
          <ul className="mt-[18px] pt-[6px] border-t border-dropdown-border w-full list-none ps-0">
            {ACCOUNTLINKS.map((item) => (
              <li key={item?.id}>
                <Link
                  to={item?.link}
                  className="block py-3 w-full text-black transition duration-300 ease-in-out hover:text-lw-primary text-16 font-normal tracking-wide"
                >
                  {item?.menu}
                </Link>
              </li>
            ))}
          </ul>
          <button
            className="block h-12 w-full text-black transition duration-300 ease-in-out hover:text-lw-primary text-16 font-normal tracking-wide"
            onClick={handleSignOut}
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default AccountDropdown;

const ACCOUNTLINKS = [
  {
    id: 1,
    link: "/account",
    menu: "My account",
  },
  {
    id: 2,
    link: "/account/personal-details",
    menu: "Personal Details",
  },
  {
    id: 3,
    link: "/account/orders",
    menu: "Orders",
  },
  {
    id: 4,
    link: "/wishlist",
    menu: "Wishlist",
  },
  {
    id: 5,
    link: "/account/address",
    menu: "Addresses",
  },
  {
    id: 6,
    link: "/account/store-credit", // Fixed double slash
    menu: "Store Credit",
  },
  {
    id: 7,
    link: "/account/reviews",
    menu: "Reviews",
  },
];
