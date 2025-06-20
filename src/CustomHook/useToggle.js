import { useState } from "react";

export const useToggle = () => {
  const [status, setStatus] = useState(false);

  const toggle = () => setStatus((prevStatus) => !prevStatus);
  const setFalse = () => setStatus(false);
  const setTrue = () => setStatus(true);

  return { status, toggle, setTrue, setFalse };
};


