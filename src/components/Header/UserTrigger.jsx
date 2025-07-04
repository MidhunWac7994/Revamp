import { useState, lazy, Suspense } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { User } from "lucide-react"; // Lucide icon
import { useGlobalData } from "../../CustomHook/useGlobalData";

const AccountDropdown = lazy(() => import("./AccountDropdown"));

const UserTrigger = () => {
  const { isSignedIn } = useGlobalData();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const handleTrigger = () => {
    if (isSignedIn) {
      navigate("/account");
    } else {
      searchParams.set("auth", "true");
      setSearchParams(searchParams);
    }
  };

  return (
    <div
      className="mobile:block hidden relative group before:absolute ltr:before:start-1/2 before:-translate-x-1/2 rtl:before:end-1/2 before:w-[295px] before:-bottom-5 before:h-8 before:pointer-events-none hover:before:pointer-events-auto"
      data-widget="UserTrigger"
    >
      <button
        aria-label="User Login"
        className="p-header-icons"
        onClick={handleTrigger}
      >
        <User size={19} stroke="currentColor" />
      </button>

      <div className="opacity-0 pointer-events-none absolute top-[135%] ltr:start-1/2 -translate-x-1/2 rtl:end-1/2 transition duration-300 ease-in-out will-change-transform group-hover:pointer-events-auto group-hover:opacity-100 translate-y-[10px] group-hover:translate-y-0">
        <Suspense fallback={null}>
          <AccountDropdown />
        </Suspense>
      </div>
    </div>
  );
};

export default UserTrigger;
