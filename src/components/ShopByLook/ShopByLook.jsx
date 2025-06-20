import React from "react";
import { Link } from "react-router-dom";

const ShopByLook = ({ homeData }) => {
  const looks = homeData?.shop_by_look_items || [];
  const imageUrl = homeData?.shop_by_look_image;

  return (
    <div className="py-10 px-4 text-center">
      <div className="relative inline-block w-full max-w-full mx-auto"> 
        <img
          src={imageUrl}
          alt="Shop By Look"             
          className="w-full h-auto"  
          style={{ maxHeight: "900px" }}
        />

        {looks.map((look, index) => (
          <Link 
            key={look.id || index}
            to={`/${look.url_key}`}
            className="absolute flex flex-col items-center text-black"
            style={{
              top: `${look.y}%`,
              left: `${look.x}%`,
              transform: "translate(-50%, -50%)",
            }}
            title={look.name}
          >   
            <img 
              src={look.thumbnail}
              alt={look.name}
              className="w-24 h-24 rounded-full border-2 border-white shadow-md object-cover"
            />
            <div className="bg-white bg-opacity-90 mt-2 px-2 py-1 rounded text-xs text-center shadow">
              <div className="font-medium">{look.name}</div>
              <div className="text-gray-600">
                ${parseFloat(look.price).toFixed(2)}   
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ShopByLook;
