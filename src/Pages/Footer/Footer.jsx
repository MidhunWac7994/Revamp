import React from "react";
import { useLocation } from "react-router-dom";
import { gql, useQuery } from "@apollo/client";
import FooterLinks from './FooterLinks/FooterLinks';
import CopyRight from  '../../components/CopyRight/CopyRight';
import { skipBasedOnPath } from "@/utils/skipBasedOnPath";
import * as LucideIcons from "lucide-react";

const FOOTER = gql`
  query GetFooter {
    Footer
  }
`;

const PATHS_TO_SKIP = ["/checkout", "/guest-checkout"];

const Footer = () => {
  const location = useLocation();
  const pathname = location.pathname;

  const { loading, error, data } = useQuery(FOOTER);

  const footerData = data?.Footer ? JSON.parse(data.Footer) : null;
  const { siteFeatures, footer, socialMediaLinks, contact } = footerData || {};

  // console.log(footerData, "Footer data from GraphQL");

  if (
    skipBasedOnPath(pathname, PATHS_TO_SKIP) ||
    loading ||
    error ||
    !footerData
  ) {
    return null;
  }

  return (
    
    <>
      <div data-widget="Footer" className="py-7 bg-lw-dark-blue">
        <div className="main-container">
          <ul className="font-light max-tabletPro:flex-col flex items-center justify-between ">
            {siteFeatures &&
              siteFeatures.length > 0 &&
              siteFeatures.map((item) => {
                const IconComponent = LucideIcons[item.icon];

                return (
                  <li
                    key={item.icon}
                    className="py-1 w-full text-center flex items-center gap-2 text-white tabletPro:justify-center relative before:block before:w-[1px] before:h-full tabletPro:before:bg-white/20 before:absolute before:end-0 before:top-0 last:before:hidden max-tabletPro:mb-5 max-tabletPro:pb-5 max-tabletPro:border-b max-tabletPro:border-white/10 last:border-0 max-tabletPro:last:mb-0 max-tabletPro:last:pb-0 leading-6"
                  >
                    {IconComponent ? (
                      <IconComponent size={23} className="stroke-current" />
                    ) : null}
                    {item.link}
                  </li>
                );
              })}
          </ul>
        </div>
      </div>

      <footer className="bg-[#F7F7F7]">
        <div className="main-container mobile:pb-10 pt-5 mobile:pt-15">
          <FooterLinks
            footer={footer}
            socialMediaLinks={socialMediaLinks}
            contact={contact}
          />
          <div className="flex gap-[5px] items-center mt-[30px] mobile:mt-[10px]  max-sm-mobile:flex-wrap">
            {paymentOptions.map((item) => (
              <figure
                key={item.id}
                className="h-[30px] min-w-[60px] mobile:min-w-[70px] border-1 border-border-gray rounded-[3px] px-1 py-[5px]"
              >
                <img
                  className="max-h-full max-w-full mx-auto"
                  src={item.imageurl}
                  alt="payment-options"
                />
              </figure>
            ))}
          </div>
        </div>

        <CopyRight />
      </footer>
    </>
  );
};

export default Footer;

const paymentOptions = [
  {
    id: 1,
    imageurl: "/images/payment/apple-pay.svg",
  },
  {
    id: 2,
    imageurl: "/images/payment/g-pay.svg",
  },
  {
    id: 3,
    imageurl: "/images/payment/master-card.svg",
  },
  {
    id: 4,
    imageurl: "/images/payment/visa.svg",
  },
  {
    id: 5,
    imageurl: "/images/payment/samsung-pay.svg",
  },
];
