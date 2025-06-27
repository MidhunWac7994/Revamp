import FormSelectBox from "../FormSelectBox/FormSelectBox";
import InformedSelect from "../InformedSelect/InformedSelect";

const FormSelect = (props) => {
  return (
    <>
      <div className="tablet:hidden">
        <InformedSelect {...props} />
      </div>
      <div className="hidden tablet:block">
        <FormSelectBox {...props} />
      </div>
    </>
  );
};

export default FormSelect;
