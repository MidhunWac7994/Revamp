import { useState, useEffect } from "react";

const useLazyMount = (isOpen) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setHasMounted(true);
    }
  }, [isOpen]);

  return hasMounted;
};

export default useLazyMount;
