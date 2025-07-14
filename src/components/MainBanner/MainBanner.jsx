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
          <CarouselContent className="h-screen relative">
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

                  <div className="absolute inset-0 flex flex-col items-start justify-center text-white px-4 md:px-8 mt-80 ml-10">
                    <h4 className="text-white uppercase font-light text-16 mobile:text-18 mb-3">
                      {slide.sub_title || "INTRODUCING"}
                    </h4>
                    <h1 className="text-white font-serif text-[36px] sm:text-[60px] md:text-[72px] lg:text-[90px] leading-[1.1] font-extrabold tracking-tight drop-shadow-lg">
                      {slide.titles}
                    </h1>

                    <Button
                      size={"xl"}
                      variant={"white"}
                      className={
                        "mt-9 max-w-50 w-max min-w-[173px] h-14 rounded-none"
                      }
                      asChild
                    >
                      <Link
                        to={`/${locale}/${slide.link}`}
                        className="bg-white text-black px-8 py-3 font-medium hover:bg-[#2cb5a4] hover:text-white transition duration-300 rounded-none"
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
