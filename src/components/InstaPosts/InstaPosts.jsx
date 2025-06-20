import React from "react";
import { Link } from "react-router-dom";

const InstaPosts = ({ homeData }) => {
  const { title, posts = [] } = homeData || {};

  return (
    <div className="py-10 px-4 text-center">
      {title && <h2 className="text-4xl text-gray-800 mb-8">{title}</h2>}

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
        {posts.map((post, index) => (
          <Link
            to={post.link}
            key={index}
            className="overflow-hidden shadow-md"
          >
            <img
              src={post.image_link}
              alt={`Instagram Post ${index + 1}`}
              className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-110"
            />
          </Link>
        ))}
      </div>
    </div>
  );
};

export default InstaPosts;
