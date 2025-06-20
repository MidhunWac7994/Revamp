import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "../components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Link, useParams } from "react-router-dom";
import { Button } from "../components/ui/button";

const MainBanner = ({ homeData }) => {
  const slides = homeData?.content || [];
    const { locale } = useParams(); 

  return (
    slides.length > 0 && (
      <div className="relative">
        <Carousel
          plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
        >
          <CarouselContent className="h-[70vh] md:h-[90vh] relative">
            {slides.map((slide) => (
              <CarouselItem key={slide.id} className="relative">
                <div className="relative w-full h-full">
                  {slide.type === "vedio" ? (
                    <video
                      src={slide.media}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <img
                      src={slide.media}
                      alt={slide.alt || `Banner ${slide.id}`}
                      className="w-full h-full object-cover"
                    />
                  )}

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
                    <h4 className="t text-white uppercase font-light text-16 mobile:text-18 mb-3 block">
                      {slide.sub_title || "INTRODUCING"}
                    </h4>
                    <h2 className=" text-white font-lora mobile:text-[96px] text-[55px] leading-[1.1]">
                      {slide.titles}
                    </h2>
                    <Button
                      size={"xl"}
                      variant={"white"}
                      className={
                        "mt-9 max-w-50 w-max min-w-[173px] rounded-none"
                      }
                      asChild
                    >
                      <Link
                        to={`/${locale}/${slide.link}`}
                        className="bg-white text-black px-8 py-3 font-medium hover:bg-opacity-90 transition duration-300 rounded-none"
                      >
                        {slide.button_text}
                      </Link>
                    </Button>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    )
  );
};
export default MainBanner;
