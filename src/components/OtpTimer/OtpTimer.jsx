import { makeTwoDigitNumber } from  '../../utils/authUtil'
import { useOtpTimer } from  '../../components/OtpTimer/useOtpTimer'
import { Button } from '../../components/components/ui/button'

const OtpTimer = (props) => {
  const { resendClick, resendingOtp } = props;
  

  const { timeLeft, onClickResend, isButtonDisabled } = useOtpTimer({
    resendClick,
  });

  return (
    <div className="text-15 tablet:text-16 text-[#4E4E51]">
      <span className="">{("NotReceivedYourCode")} </span>
      {isButtonDisabled ? (
        <span className="text-[#687EC1]">
          <span>{makeTwoDigitNumber(timeLeft)}</span>
        </span>
      ) : (
        <Button
          variant={"link"}
          size={"link"}
          className={
            "text-primary-blue border-0 text-[15px] hover:text-black transition ease-in-out duration-300"
          }
          disabled={isButtonDisabled || resendingOtp}
          onClick={onClickResend}
        >
          {("Resend")}
        </Button>
      )}
    </div>
  );
};

export default OtpTimer;
