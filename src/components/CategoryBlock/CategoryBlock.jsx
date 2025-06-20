import { Button } from "../components/ui/button";
import useCategoryBody from "../../Pages/CategoryLanding/useCategoryBody";
import { Link } from "react-router-dom";

const CategoryBlock = (props) => {
  const { title, categorybanner, childrens, link, id, setActiveCategoryId } =
    props;

  const { targetRef } = useCategoryBody({
    title: id,
    setActive: setActiveCategoryId,
  });

  return (
    <div
      className="pt-9 pb-16"
      id={id}
      ref={targetRef}
      data-widget="CategoryBlock"
    >

      {categorybanner && (
        <Link to={`/${link}`}>
          <figure className="relative aspect-[1236/220] mb-[50px] overflow-hidden rounded-lg">
            <img
              className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
              alt={title}
              src={categorybanner}
            />
            <h4 className="text-[32px] font-normal text-white absolute translate-x-[-50%] translate-y-[-50%] top-[50%] start-[50%]">
              {title}
            </h4>
          </figure>
        </Link>
      )}

      
      <h4 className="text-[24px] font-normal text-black">{title}</h4>

      {childrens?.length > 0 && (
        <div className="grid grid-cols-3 gap-[15px] mt-8">
          {childrens.map((item) => (
            <Link
              to={`/${link}/${item?.url_key}`}
              key={item?.id}
              className="border border-[#F0F0F0] rounded-md overflow-hidden hover:shadow-md transition duration-300">
              <div className="flex flex-col items-center justify-center p-4 h-[200px] bg-white">

                {item?.image_data?.category_short_image ? (
                  <img
                    src={item?.image_data?.category_short_image}
                    alt={item?.name}
                    className="w-[100px] h-[100px] object-contain mb-3"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-[100px] h-[100px] flex items-center justify-center bg-gray-100 text-gray-400 text-sm mb-3">
                    No Image
                  </div>
                )}
                <p className="text-[16px] font-medium text-center text-black">
                  {item?.name}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}

      
      <Button
        asChild
        className="text-16 font-normal mt-[50px] px-0"
        variant="link"
      >
        <Link to={`/${link}`}>View All Products</Link>
      </Button>
    </div>
  );
};

export default CategoryBlock;
