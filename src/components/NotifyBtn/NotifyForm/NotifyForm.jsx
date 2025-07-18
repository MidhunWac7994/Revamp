import FormSubmitButton from "../../FormSubmitButton/formSubmitButton";
import Price from "../../Price/Price"
import TextInput from "../../TextInput/TextInput";
import combine from "../../../utils/combine";
import { isRequired, validateEmail } from "../../../utils/formValidator";
import { Form } from "informed";
import useNotify from "../useNotify";

const NotifyForm = (props) => {
  const { toggle, id, name, image, minPrice, maxPrice, attributeDetails } =
    props;

  const { formApiRef, handleNotify, isMutating } = useNotify({ id, toggle });

  return (
    <div className="mt-[30px]">
      {/* Product Card */}
      <div className="flex items-center py-5 gap-5 border-y-1 border-[#EFEFEF]">
        <figure className="relative flex-[0_0_100px] overflow-hidden aspect-square bg-gray-bg-1">
          <img
            src={image}
            fill
            priority
            alt={name}
            className="object-cover w-full h-full group-hover:scale-[1.05] duration-300 transition ease-in-out will-change-transform"
            sizes="(max-width: 768px) 30vw, (max-width: 1200px) 30vw, 30vw"
          />
        </figure>
        <div>
          <p className="text-black leading-5 text-16 font-medium line-clamp-2">
            {name}
          </p>

          {attributeDetails?.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-3">
              {attributeDetails.map((item, i) => (
                <li key={i} className="text-14 leading-5 text-black">
                  {item?.code
                    ?.replace(/_/g, " ")
                    ?.replace(/\b\w/g, (c) => c.toUpperCase())}
                  : {item?.label}
                </li>
              ))}
            </ul>
          )}

          <div className="mobile:hidden mt-4">
            <Price
              className="flex flex-col items-start"
              sizeOffer="text-16 !font-semibold"
              sizeNormal="!text-13 text-[#8A8A8A]"
              regularPrice={maxPrice}
              offerPrice={minPrice}
            />
          </div>
        </div>
        <div className="hidden mobile:block">
          <Price
            className="flex flex-col gap-1 items-end"
            sizeOffer="text-16 !font-semibold"
            sizeNormal="!text-13 text-[#8A8A8A]"
            regularPrice={maxPrice}
            offerPrice={minPrice}
          />
        </div>
      </div>

      <Form
        formApiRef={formApiRef}
        onSubmit={handleNotify}
        className="mt-[30px] tabletPro:mt-10"
      >
        <TextInput
          type="email"
          name="email"
          id="floatLogin"
          validateOn="change"
          className="mb-8"
          validate={combine([isRequired, validateEmail])}
          placeholder="Email"
          label="Email"
          floating
        />
        <FormSubmitButton
          className="mt-2 h-10 px-6 bg-[#53bcb7] text-white rounded-none hover:bg-[#45a9a4] transition-colors , btnClassName"
          variant="primary"
          label="Notify Me"
          loading={isMutating}
        />
      </Form>

      <p className="mt-4 tabletPro:mt-5 max-mobile:max-w-[90%] mx-auto text-center text-14 font-normal text-[#4E4E51]">
        We respect your privacy and don't share your email with anybody
      </p>
    </div>
  );
};

export default NotifyForm;
