import React from "react";
import { Link } from "react-router-dom";
import ConnectWithUs from '../../../components/ConnectWithUs/ConnectWithUs';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../../../components/components/ui/accordion';

const FooterLinks = (props) => {
  const { footer = [], socialMediaLinks, contact } = props;

  return (
    <>
      
      <div className="mobile:flex justify-between gap-10 hidden max-tabletPro:flex-wrap">
        {footer?.length > 0 &&
          footer.map((item) => (
            <React.Fragment key={item?.id}>
              <ul>
                <li>
                  <h3 className="text-16 uppercase mb-5">{item?.name}</h3>
                </li>

                {item?.children?.content?.length > 0 &&
                  item.children.content.map((menu) => (
                    <li className="my-1" key={menu?.id}>
                      <Link
                        className="transition-all py-1 block text-light-gray text-16 font-light hover:text-black"
                        to={menu?.link}
                      >
                        {menu?.name}
                      </Link>
                    </li>
                  ))}
              </ul>
            </React.Fragment>
          ))}

        <ConnectWithUs
          socialMediaLinks={socialMediaLinks}
          contactData={contact}
        />
      </div>

      {/* Mobile View */}
      <div className="w-full mobile:hidden">
        <Accordion type="single" collapsible className="w-full">
          {footer?.length > 0 &&
            footer.map((item, index) => (
              <AccordionItem key={item?.id} value={`item-${index}`}>
                <AccordionTrigger className="text-20 uppercase font-light text-black tracking-wider">
                  {item?.name}
                </AccordionTrigger>
                <AccordionContent>
                  <ul>
                    {item?.children?.content?.length > 0 &&
                      item.children.content.map((menu, menuIndex) => (
                        <li className="my-1" key={`${index}-${menuIndex}`}>
                          <Link
                            className="transition-all py-1 block text-light-gray text-16 font-light hover:text-black"
                            to={menu?.link}
                          >
                            {menu?.name}
                          </Link>
                        </li>
                      ))}
                  </ul>
                </AccordionContent>
              </AccordionItem>
            ))}

          <div className="mt-8">
            <ConnectWithUs
              socialMediaLinks={socialMediaLinks}
              contactData={contact}
            />
          </div>
        </Accordion>
      </div>
    </>
  );
};

export default FooterLinks;
