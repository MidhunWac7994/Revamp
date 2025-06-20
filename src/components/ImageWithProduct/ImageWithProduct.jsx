import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../components/ui/carousel";
import { Button } from "../components/ui/button";

const ImageWithProduct = ({ homeData }) => {
  return (
    <div className="mt-20 px-10">
      <h2 className="pb-10 text-black text-4xl">
        {homeData?.title || "Shop By Look"}
      </h2>

      <Carousel className="w-full max-w-[1600px] mx-auto relative">
        <CarouselContent>
          {homeData?.content?.map((item) => {
            const { id, banner, product_details } = item;
            const { name, price_range, images } = product_details;
            const price = price_range?.minimum_price?.regular_price?.value;
            const productImage = images?.url;

            return (
              <CarouselItem key={id} className="p-4">
                <div className="flex items-center justify-between gap-4">
                  {banner && (
                    <div className="flex-shrink-0">
                      <img
                        src={banner}
                        alt="Banner"
                        className="w-[800px] h-[700px] object-cover"
                      />
                    </div>
                  )}

                  <div className="w-[800px] h-[700px] bg-[#EDEDED] p-6 flex flex-col justify-center items-center">
                    {productImage && (
                      <img
                        src={productImage}
                        alt={name}
                        className="w-full h-[300px] object-contain mb-4"
                      />
                    )}

                    <h3 className="text-2xl font-medium text-center text-gray-800 mb-2">
                      {name}
                    </h3>
                    <p className="text-lg font-normal text-center">
                      {price ? `KWD ${price}` : "Price Not Available"}
                    </p>
                    <Button>Add to Cart</Button>
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default ImageWithProduct;
