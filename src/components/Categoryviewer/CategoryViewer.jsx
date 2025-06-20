import React from "react";
import { Link } from "react-router-dom";

const Category_Viewer = ({ homeData }) => {
  const categories = homeData?.categories || homeData?.content || [];

  return (
    <div className="mt-30 ml-20 mr-20">
      <h2 className="pb-10 text-black text-4xl">
        {homeData?.title || "Explore Categories"}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {categories.length > 0 ? (
          categories.map((category) => (
            <div key={category.id} className="category-item text-center">
              <img
                src={category.image}
                alt={category.name || "category"}
                className="w-[900px] h-[700px] object-cover"  // Increased image size, removed shadow and rounded corners
              />
              <h3 className="text-xl font-semibold mb-2">{category.name}</h3>
              <p className="text-sm text-gray-500 mb-4">{category.sub_title}</p>
              <Link
                to={`/${category.link}`}
                className="inline-block bg-black text-white py-2 px-4 hover:bg-gray-800"
              >
                {category.button_text || "Shop Now"}
              </Link>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No categories available
          </p>
        )}
      </div>
    </div>
  );
};

export default Category_Viewer;
