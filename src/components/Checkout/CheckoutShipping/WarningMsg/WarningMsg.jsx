import { AlertTriangle } from "lucide-react";

const WarningMsg = ({ warningMsg }) => {
  const hasMsg = warningMsg?.some((item) => item?.msg);

  return (
    warningMsg?.length > 0 &&
    hasMsg && (
      <div
        data-widget="WarningMsg"
        className="mt-3 w-fit bg-amber-50 rounded-md px-2"
      >
        {warningMsg?.map(
          (item, index) =>
            item?.msg && (
              <div className="flex items-start" key={index}>
                <div className="mt-[2px]">
                  <AlertTriangle size={14} className="text-orange-500" />
                </div>
                <div className="ps-2 tablet:ps-1">
                  <p className="text-14 py-1">{item?.msg}</p>
                </div>
              </div>
            )
        )}
      </div>
    )
  );
};

export default WarningMsg;
