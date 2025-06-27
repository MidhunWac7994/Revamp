import { useCheckoutContext } from "../CheckoutProvider/CheckoutProvider";
import {
  setLocalStorageWithExpiry,
 
} from "../../../utils/storageUtil";
import { GUEST_USER_KEY } from "../../Constants"

const LoginOrGuest = () => {
  const { updatePurchaseMode } = useCheckoutContext();

  const handleLogin = () => {
    // Simulate login (set isSignedIn via useGlobalData, not shown here)
    console.log("User logged in");
    // Assume isSignedIn becomes true via useGlobalData
  };

  const handleGuest = () => {
    // Simulate guest submission
    const guestData = { mobile: "1234567890" }; // Example data
    setLocalStorageWithExpiry(GUEST_USER_KEY, guestData, 24 * 60 * 60 * 1000); // 24-hour expiry
    console.log("Guest data submitted:", guestData);
    updatePurchaseMode("home_delivery"); // Optional: set default purchase mode
  };

  return (
    <div className="p-4">
      <button onClick={handleLogin}>Log In</button>
      <button onClick={handleGuest}>Continue as Guest</button>
    </div>
  );
};

export default LoginOrGuest;
