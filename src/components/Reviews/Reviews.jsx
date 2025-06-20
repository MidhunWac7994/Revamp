import React from "react";
import { Link } from "react-router-dom";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
} from "../components/ui/carousel";
import { Button } from "../components/ui/button";

const Reviews = ({ homeData }) => {
  const reviews = homeData?.content || [];
  const mainTitle = homeData?.main_title;

  return (
    <div className="py-10 px-4 text-center">
      <Carousel className="w-full h-full">
        <CarouselContent>
          {reviews.length > 0 ? (
            reviews.map((review, index) => (
              <CarouselItem
                key={index}
                className="flex justify-center items-center w-full h-full"
              >
                <div className="w-[90%] h-[800px] flex flex-col justify-center items-center bg-[#272838] text-white p-4">
                  <h2 className="text-5xl font-extrabold text-white mb-2">
                    {mainTitle}
                  </h2>

                  {homeData?.botton_text && (
                    <Button className="bg-transparent border-2 border-white text-white px-12 py-5 text-xl rounded-none hover:bg-white hover:text-black transition-all duration-300">
                      {homeData.botton_text}
                    </Button>
                  )}

                  <div className="flex w-full h-full">
                    {/* Image without rounded corners */}
                    {review.image && (
                      <div className="w-1/2 h-full flex justify-center items-center">
                        <img
                          src={review.image}
                          alt={review.alt || "Review Image"}
                          className="max-w-[300px] h-auto object-cover"
                        />
                      </div>
                    )}

                    {/* Content Section */}
                    <div className="w-1/2 h-full flex flex-col justify-center items-center px-4">
                      <div className="text-center mb-4">
                        <h3 className="text-xl font-bold">{review.author}</h3>
                        <p className="text-center mb-4">
                          {review.comment || review.description}
                        </p>

                        <Link to={`/product/${review.link}`}>
                          <Button className="bg-transparent border-2 border-white text-white px-12 py-5 text-xl rounded-none hover:bg-white hover:text-black transition-all duration-300">
                            {review.button_text}
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </CarouselItem>
            ))
          ) : (
            <p>No reviews available</p>
          )}
        </CarouselContent>

        <CarouselPrevious className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white" />
        <CarouselNext className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white" />
      </Carousel>
    </div>
  );
};

export default Reviews;
