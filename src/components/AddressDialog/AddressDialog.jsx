import { Form, Multistep } from "informed";
import AddressGoogleMap from "./AddressGoogleMap/AddressGoogleMap";
import AddressForm from "./AddressForm/AddressForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Button } from "../components/ui/button";
import { cn } from "../lib/utils";

const AddressDialog = (props) => {
  const {
    handleSubmit,
    isMutating,
    formApiRef,
    initialValues,
    submitBtnLabel,
    formTitle = "Fill with your personal details",
    isCheckout,
    triggerBtnLabel = "Open",
    triggerBtnClass,
    triggerBtnVariant = "outlineDark",
    triggerBtnIcon,
    status,
    toggle,
    initialCase,
    headerButton,
  } = props;

  return (
    <Dialog open={status} onOpenChange={toggle}>
      {!initialCase && (
        <DialogTrigger asChild>
          <Button
            className={cn("min-w-auto h-10 text-sm rounded", triggerBtnClass)}
            variant={triggerBtnVariant}
          >
            {triggerBtnIcon && triggerBtnIcon}
            {triggerBtnLabel}
          </Button>
        </DialogTrigger>
      )}
      <DialogContent
        closeHidden
        data-widget="AddressDialog"
        className="px-6 py-6 max-w-full sm:max-w-[650px] rounded"
      >
        <DialogHeader className="mb-6 flex justify-between items-center">
          <DialogTitle className="text-lg font-semibold text-black">
            {formTitle}
          </DialogTitle>
          {headerButton && headerButton}
        </DialogHeader>

        <Form
          className="h-full"
          formApiRef={formApiRef}
          onSubmit={handleSubmit}
          initialValues={{
            address_form: initialValues?.address_form,
          }}
        >
          <Multistep>
            <AddressGoogleMap
              isCheckout={isCheckout}
              userCoordinates={{ ...initialValues?.google_map }}
              formApiRef={formApiRef}
              initialCase={initialCase}
              formTitle={formTitle}
              headerButton={headerButton}
            />
            <AddressForm
              isCheckout={isCheckout}
              isMutating={isMutating}
              submitBtnLabel={submitBtnLabel}
              initialCase={initialCase}
              formTitle={formTitle}
              headerButton={headerButton}
            />
          </Multistep>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default AddressDialog;
