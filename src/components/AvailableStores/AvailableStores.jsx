import { PackageCheck } from "lucide-react";
import AvailableStoresModal from "./AvailableStoresModal/AvailableStoresModal";

const AvailableStores = ({ sku, combinationNotFound }) => {
  return (
    <div
      data-widget="AvailableStores"
      className="border-t-1 border-lw-grey mt-[30px] pt-[30px]"
    >
      <h4 className="text-18 font-semibold text-black leading-6">
        Check available stores
      </h4>
      <div className="laptop:flex laptop:items-center gap-2 mt-[18px]">
        <p className="text-14 font-normal text-black">
          Check the products available in which stores
        </p>
     
     

     <div>
          <AvailableStoresModal
            sku={sku}
            combinationNotFound={combinationNotFound}
          />
        </div>
      </div>
      <div className="flex items-center gap-[6px] mt-4 tablet:mt-3">
        <PackageCheck size={18} color="#000000" />
        <p className="text-14 font-normal text-black">
          Collect Product in between
        </p>
      </div>
    </div>
  );
};

export default AvailableStores;
