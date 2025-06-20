import { useState } from "react";

const useProductActionButtons = () => {
  const [qty, setQty] = useState(1);

  const handleReset = () => setQty(1);
  const handleIncrement = () => setQty((prev) => prev + 1);
  const handleDecrement = () => {
    if (qty > 1) setQty((prev) => prev - 1);
  };

  return { handleDecrement, handleIncrement, handleReset, qty };
};

export default useProductActionButtons;
