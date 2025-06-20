import { Button } from '../../components/components/ui/button';
import { Link } from "react-router-dom";
import { cn } from '../../components/lib/utils';

const EmptyPages = (props) => {
  const {
    title,
    subTitle,
    variant,
    icon = emptyWishlist,
    iconWidth,
    iconHeight,
    buttonLabel,
    className,
  } = props;

  return (
    <div data-widget="EmptyPages">
      <div
        className={cn(
          "min-h-[70vh] flex flex-col items-center justify-center ",
          className
        )}
      >
        <img
          src={icon}
          alt={"empty-page"}
          width={iconWidth ? iconWidth : "150"}
          height={iconHeight ? iconHeight : "150"}
          sizes="(max-width: 768px) 80vw, (max-width: 1200px) 35vw, 35vw"
          className="max-mobile:max-w-[80%] mx-auto"
        />
        <h5 className="text-16 laptop:text-2xl font-medium font-beausite text-black mt-6">
          {title ? title : "Page not Found"}
        </h5>
        <p className="max-mobile:max-w-[85%] text-center text-14 font-light text-font-color mt-3">
          {subTitle
            ? subTitle
            : "Oops! The Page You're Looking for Couldn't be Found."}
        </p>
        {buttonLabel && (
          <Button
            className="w-[160px] h-[45px] mt-6 "
            variant={variant ? variant : "primary"}
            asChild
          >
            <Link to={"/"}>{buttonLabel}</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default EmptyPages;
