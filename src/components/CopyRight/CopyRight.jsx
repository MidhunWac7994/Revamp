import useSiteUrl from '../../CustomHook/useSireUrl';

const CopyRight = () => {
  const d = new Date();
  const year = d.getFullYear();
  const siteUrl = useSiteUrl();

  return (
    <div className="mobile:border border-t-[#E4E4E4] mobile:py-4">
      <div className="main-container">
        <div className="mobile:flex items-center font-light mobile:text-15 justify-between max-mobile:pt-[30px] max-mobile:pb-[10px] text-14 text-[#474747] mobile:text-black">
          <p>{year} Liwafurniture, All rights reserved. </p>
          <p className="max-mobile:mt-1">
            Designed by{" "}
            <a
              aria-label="wac"
              className="hover:underline transition-all max-mobile:underline"
              target="_blank"
              href={`https://webandcrafts.com/?utm_source=${siteUrl}&utm_medium=referral&utm_campaign=${siteUrl}_referral_wac_client`}
            >
              wac.co
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default CopyRight;
