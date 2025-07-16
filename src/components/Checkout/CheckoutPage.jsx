import React from "react";
import { useParams } from "react-router-dom";

import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "../../components/components/ui/breadcrumb";

import CheckoutAccordion from "../Checkout/CheckoutAccordion/CheckoutAccordion";
import CheckoutProvider from "../Checkout/CheckoutProvider/CheckoutProvider";
import CheckoutSummary from "../../components/Checkout/CheckoutSummary/CheckoutSummary";

const Checkout = ({ customerAddress }) => {
  const { locale } = useParams();

  const breadcrumbData = [
    {
      text: "Cart",
      path: `/${locale}/cart`,
    },
    {
      text: "Checkout",
    },
  ];

  return (
    <div data-widget="Checkout" className=" ">
      <div className="mb-8 ml-5">
        <Breadcrumb aria-label="breadcrumb">
          <BreadcrumbList className="text-muted-foreground">
            {breadcrumbData.map((item, index) => (
              <BreadcrumbItem
                key={index}
                className="inline-flex items-center gap-1.5"
              >
                {item.path ? (
                  <BreadcrumbLink
                    href={item.path}
                    className="hover:text-foreground"
                  >
                    {item.text}
                  </BreadcrumbLink>
                ) : (
                  <BreadcrumbPage className="text-foreground font-normal">
                    {item.text}
                  </BreadcrumbPage>
                )}
                {index < breadcrumbData.length - 1 && <BreadcrumbSeparator />}
              </BreadcrumbItem>
            ))}
          </BreadcrumbList>
        </Breadcrumb>
      </div>

      <div>
        <CheckoutProvider customerAddress={customerAddress}>
          <div className="flex gap-4 items-start">
            <div className="w-[600px] ml-44">
              <CheckoutAccordion />
            </div>
            <div className=" ml-96">
              <CheckoutSummary />
            </div>
          </div>
        </CheckoutProvider>
      </div>
    </div>
  );
};

export default Checkout;
