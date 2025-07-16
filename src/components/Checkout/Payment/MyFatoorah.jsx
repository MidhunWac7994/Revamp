import { useToggle } from "../../../CustomHook/useToggle";
import { Dialog, DialogTrigger } from "../../components/ui/dialog";
import MyFatoorahPortal from "./MyFatoorahPortal";

const MyFatoorah = (props) => {
  const {
    myFatoorahConfig,
    handleChangePaymentMode,
    mode,
    active,
    handlePlaceOrder,
    placeOrderLoading,
    settingPaymentMethod,
    isLoading,
    isRedirecting,
  } = props;


  const { status, setFalse, setTrue } = useToggle();                                                                         
  return (
    <Dialog
      open={status}
      onOpenChange={(value) => {
        if (value) {
          if (active === mode?.code) setTrue();
          else handleChangePaymentMode(mode?.code, () => setTrue());
        } else {
          setFalse();
        }
      }}
    >
      <DialogTrigger asChild>   
        <div className="flex flex-col gap-y-4 mobile:border-b border-border-color mobile:first-of-type:border-t first-of-type:border-t-border">
          <button
            data-widget="MyFatoorah"
            className="max-mobile:mt-4 flex items-center gap-x-3 text-16 font-semibold text-black py-4 w-full max-mobile:p-4 max-mobile:border max-mobile:border-border-color "
            disabled={
              isLoading ||
              settingPaymentMethod ||
              isRedirecting ||
              placeOrderLoading
            }
          >
            <span
              className={`${
                status ? "border-lw-primary" : ""
              } size-6 rounded-full border border-[#CBCBCD] relative flex items-center justify-center transition-all duration-300 max-mobile:hidden`}
            >
              <span
                className={`${
                  status ? "opacity-100" : "opacity-0"
                } size-4 bg-lw-primary rounded-full transition-all duration-300 `}
              ></span>
            </span>

            <span className="text-16 font-semibold text-black max-mobile:flex-1">
              {mode?.title}
            </span>
            <span
              className={`${
                status ? "border-lw-primary" : ""
              } size-6 rounded-full border border-[#CBCBCD] relative flex items-center justify-center transition-all duration-300 mobile:hidden`}
            >
              <span
                className={`${
                  status ? "opacity-100" : "opacity-0"
                } size-4 bg-lw-primary rounded-full transition-all duration-300 `}
              ></span>
            </span>
          </button>
        </div>
      </DialogTrigger>
      {status && mode?.myfatoorah_embed_data && (
        <MyFatoorahPortal
          myFatoorahConfig={mode.myfatoorah_embed_data}
          title={mode?.title}
          handlePlaceOrder={handlePlaceOrder}
        />
      )}
      
    </Dialog>
  );
};

export default MyFatoorah;
