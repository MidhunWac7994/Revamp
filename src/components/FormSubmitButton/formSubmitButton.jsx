import { FormStateAccessor } from "informed";
import { Button } from "../components/ui/button";
import { isObjectEmpty } from "../../utils/objectUtil";
import { Progress } from "../components/ui/progress";

const FormSubmitButton = (props) => {
  const {
    loading,
    requiredFields = [],
    label = "Submit",
    disabled = () => false,
    step,
    ...rest
  } = props;

  return (
    <FormStateAccessor>
      {(formValues) => {
        const { values, modified } = formValues;

        const isDisabled =
          loading ||
          isObjectEmpty(values) ||
          requiredFields?.some((field) =>
            step ? !values?.[step]?.[field] : !values?.[field]
          ) ||
          disabled(values, modified);

        return (
          <Button
            type="submit"
            disabled={isDisabled}
            className="bg-[#56c4b9] text-white hover:opacity-90 disabled:opacity-50"
            {...rest}
          >
            {loading ? <Progress className="border-white" /> : label}
          </Button>
        );
      }}
    </FormStateAccessor>
  );
};

export default FormSubmitButton;
