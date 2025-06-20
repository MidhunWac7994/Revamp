import { useState, useEffect } from "react";

const START_POINT = 60;

export const useOtpTimer = (props) => {
  const { resendClick } = props;
  const [timeLeft, setTimeLeft] = useState(START_POINT);

  useEffect(() => {
    if (!timeLeft) return;

    const intervalId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, [timeLeft]);

  const onClickResend = () => {
    resendClick();
    setTimeLeft(START_POINT);
  };

  const isButtonDisabled = timeLeft !== 0;

  return { timeLeft, onClickResend, isButtonDisabled };
};
