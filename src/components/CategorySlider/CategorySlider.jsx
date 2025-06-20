import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

const CategorySlider = ({ homeData }) => {
  const categories = homeData?.categories || homeData?.content || [];

  return (
    <div className="mt-30 ml-20 mr-20">
      <h2 className="pb-10 mt-20 text-black text-4xl">{homeData?.title}</h2>

      {categories.length > 0 ? (
        <Carousel className="w-full">
          <CarouselContent className="-ml-2">
            {categories.map((category) => (
              <CarouselItem
                key={category?.id}
                className="pl-2 basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5"
              >
                <div className="category-item p-4 rounded-lg text-center relative group overflow-hidden">
                  <div className="relative w-full h-[500px] overflow-hidden">
                    <img
                      src={category?.image}
                      alt={category?.name || "category"}
                      className="w-full h-full object-cover transition-transform duration-500 ease-in-out group-hover:scale-105"
                    />

                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-white text-center w-full px-2">
                      {category?.name && (
                        <p className="text-2xl  font-bold">{category.name}</p>
                      )}

                      {homeData?.button_text && (
                        <div className="text-lg underline mt-2">
                          {homeData.button_text}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious className="left-0" />
          <CarouselNext className="right-0" />
        </Carousel>
      ) : (
        <p>No categories available</p>
      )}
    </div>
  );
};

export default CategorySlider;
