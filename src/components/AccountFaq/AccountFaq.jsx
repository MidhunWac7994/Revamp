import RichText from "../RichText/RichText";

const AccountFaq = ({ faqData }) => {

  return (
    faqData &&
    faqData?.length > 0 && (
      <div data-widget="AccountFaq">
        <h2 className="text-18 font-medium leading-5 text-black">{("FAQ")}</h2>
        <div className="mt-[18px]">
          {faqData?.map((item) => (
            <div className="mb-6 last:mb-0" key={item?.id}>
              <p className="text-16 font-medium text-black leading-6">
                {item?.question}
              </p>
              <RichText
                className="text-14 mt-[10px] text-[#545454] leading-6"
                content={item?.answer}
              />
            </div>
          ))}
        </div>
      </div>
    )
  );
};

export default AccountFaq;
