import { useCheckoutContext } from "../CheckoutProvider/CheckoutProvider";

const LoginOrGuest = ({ onLoginClick }) => {
  const { updatePurchaseMode } = useCheckoutContext();

  const handleLogin = () => {
    if (typeof onLoginClick === "function") {
      onLoginClick();
    }
    updatePurchaseMode("home_delivery"); 
  };

  return (
    <div className="p-4">
      <button
        className=" min-w-52  mt-6 h-11 rounded-none  bg-[#2cb5a7] text-white"
        onClick={handleLogin}
      >
        Log In
      </button>
    </div>
  );
};

export default LoginOrGuest;

