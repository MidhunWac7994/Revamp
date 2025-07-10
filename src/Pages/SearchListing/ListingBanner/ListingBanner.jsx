import { Link } from "react-router-dom";

const ListingBanner = ({ banner, link }) => {
  if (!banner) return null;

  return (
    <div data-widget="ListingBanner" className="max-mobile:-mx-[20px]">
      <div className="w-full ">
        <Link
          to={link}
          className="w-full block relative before:block   mobile:before:pb-[calc((240/1680)*100%)] before:pb-[calc((120/393)*100%)] bg-[#f5f5f5]"
        >
          <img
            src={banner}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
            fill
            alt={"category listing banner"}
            priority
          />
        </Link>
      </div>
    </div>
  );
};

export default ListingBanner;
