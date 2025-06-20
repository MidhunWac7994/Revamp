import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";

const ThreeImage = ({ homeData }) => {
  // Assuming the images are part of the content_three_image array in homeData
  const images = homeData?.content_three_image || [];

  return (
    <div className="three-image mt-30 ml-20 mr-20">
      <h2 className="pb-10 text-black text-4xl">{homeData?.main_title}</h2>

      {images.length > 0 ? (
        <Carousel>
          <CarouselContent className="-ml-4">
            {images.map((image, index) => (
              <CarouselItem key={index} className="p-2">
                <div className="image-item text-center">
                  {/* Display image */}
                  <img
                    src={image.image}
                    alt={image.alt || "Image"}
                    className="w-full h-72 object-cover rounded-md mb-4"
                  />
                  {/* Title and Description */}
                  <h3 className="text-xl font-semibold">{image.title}</h3>
                  <p className="text-gray-600">{image.description}</p>

                  {/* Link Button */}
                  <a
                    href={image.link}
                    className="inline-block mt-4 px-6 py-2 bg-blue-500 text-white rounded-md"
                  >
                    {image.link_text || "Shop Now"}
                  </a>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      ) : (
        <p>No images available</p>
      )}
    </div>
  );
};

export default ThreeImage;
