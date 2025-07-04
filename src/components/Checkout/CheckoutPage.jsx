import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from '../../components/components/ui/breadcrumb'
import CheckoutAccordion from "../Checkout/CheckoutAccordion/CheckoutAccordion";
import CheckoutProvider from "../Checkout/CheckoutProvider/CheckoutProvider";
import CheckoutSummary from "../../components/Checkout/CheckoutSummary/CheckoutSummary";  

const Checkout = ({ customerAddress, guestCheckout }) => {
  const breadcrumbData = [
    {
      text: "Cart",
      path: "/cart",
    },
    {
      text: guestCheckout ? "Guest Checkout" : "Checkout",
    },
  ];

  return (
    <div
      data-widget={guestCheckout ? "GuestCheckout" : "Checkout"}
      className="inner-pages max-mobile:!pt-mob-header-heaight pb-10 relative min-h-[80vh] desktop:min-h-[100vh] bg-[#F6F6F6]"
    >
      <div className="main-container max-mobile:px-0">
        
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

        <div className=" ">
          <CheckoutProvider customerAddress={customerAddress}>
            <div className="">
              <CheckoutAccordion />
            </div>
            <CheckoutSummary />
          </CheckoutProvider>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
