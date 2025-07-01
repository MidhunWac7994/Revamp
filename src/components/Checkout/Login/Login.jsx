import { useCheckoutContext } from "../CheckoutProvider/CheckoutProvider";
import {
  setLocalStorageWithExpiry,
 
} from "../../../utils/storageUtil";
import { GUEST_USER_KEY } from "../../Constants"

const LoginOrGuest = () => {
  const { updatePurchaseMode } = useCheckoutContext();

  const handleLogin = () => {
    
    console.log("User logged in");
    
  };

  const handleGuest = () => {
    
    const guestData = { mobile: "1234567890" }; 
    setLocalStorageWithExpiry(GUEST_USER_KEY, guestData, 24 * 60 * 60 * 1000); 
    console.log("Guest data submitted:", guestData);
    updatePurchaseMode("home_delivery"); 
  };

  return (
    <div className="p-4">
      <button onClick={handleLogin}>Log In</button>
      <button onClick={handleGuest}>Continue as Guest</button>
    </div>
  );
};

export default LoginOrGuest;
