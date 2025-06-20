import React, { useState } from "react";
import { useParams, Link } from "react-router-dom"; 
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../components/ui/carousel";
import AddToCartButton from "../AddtoCartButton";

const ProductsSlider = ({ homeData }) => {
  const products = homeData?.products || [];
  const [hoveredImage, setHoveredImage] = useState(null);
  const { locale } = useParams(); 

  return (
    <div className="mt-30 ml-20 mr-20">
      <h2 className="pb-10 text-black text-4xl">{homeData.title}</h2>
      <Carousel>
        <CarouselContent className="-ml-4">
          {products.map((product, index) => {
            const productUrl = `/${locale}/${product.url_key}`; 
            return (
              <CarouselItem
                key={index}
                className="pl-1 md:basis-1 lg:basis-1/4"
              >
                <div
                  className="image-item text-center p-2 relative"
                  onMouseEnter={() => setHoveredImage(index)}
                  onMouseLeave={() => setHoveredImage(null)}
                >
                  <Link to={productUrl} className="block" title={product.name}>
                    <img
                      src={
                        hoveredImage === index
                          ? product.images?.hover_image
                          : product.images?.url
                      }
                      alt={product.name}
                      className="w-full h-[500px] object-cover mb-4 transition-transform duration-300"
                    />
                  </Link>

                  {/* AddToCartButton shows on hover */}
                  {hoveredImage === index && (
                    <div className="absolute bottom-40 left-1/2 transform -translate-x-1/2 z-10">
                      <AddToCartButton
                        productId={product.id}
                        productName={product.name}
                        productSku={sku}
                        label="Add to Cart"
                      />
                    </div>
                  )}

                  <h3 className="font-semibold text-lg">{product.name}</h3>
                  <p className="text-black mt-2">
                    {product.price_range?.minimum_price?.final_price?.value &&
                    product.price_range?.maximum_price?.final_price?.value
                      ? `KWD ${product.price_range.minimum_price.final_price.value} - KWD ${product.price_range.maximum_price.final_price.value}`
                      : "Price Not Available"}
                  </p>
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

export default ProductsSlider;
