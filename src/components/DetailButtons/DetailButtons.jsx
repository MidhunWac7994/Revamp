import { toast } from "sonner";
import ProductActionButtons from "../ProductActionButtons/ProductActionButtons";

const DetailButtons = (props) => {
  const { combinationNotFound, selectedVariantsUid, id, name, sku } = props;


  return (
    <>
      <ProductActionButtons
        isPDP
        sku={sku}
        id={id} // ✅ Pass product ID
        name={name} // ✅ Pass product name
        selectedVariantsUid={selectedVariantsUid}
        throwError={
          combinationNotFound
            ? () => toast.error("Please select a variant")
            : null
        }
      />
    </>
  );
};

export default DetailButtons;
