import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";

const AboutUs = ({ homeData }) => {
  const splitTitle = (title) => {
    const words = title.split(" ");
    const lines = [];
    for (let i = 0; i < words.length; i += 2) {
      lines.push(words.slice(i, i + 2).join(" "));
    }
    return lines;
  };

  const titleLines = splitTitle(homeData.title);

  return (
    <div className="mt-30 ml-20 mr-20">
      <div className="flex flex-col lg:flex-row ">
        <div className="flex-1 pl-8">
          <div className="bg-[#5D5846] text-white w-full h-[800px] max-w-[900px] flex flex-col justify-center items-center text-center">
            <h2 className="text-5xl font-light leading-snug mb-4">
              {titleLines.map((line, index) => (
                <div key={index}>{line}</div>
              ))}
            </h2>

            <p className="text-lg text-white mb-6 max-w-md">
              {homeData.description}
            </p>

            <Link
              to={`/${homeData.link}`}
              className="inline-block bg-white text-black text-2xl py-4 px-10 transition duration-300 hover:bg-emerald-500 hover:text-white"
            >
              {homeData.link_label}
            </Link>
          </div>
        </div>

        <div className="flex-1">
          <img
            src={homeData.images}
            alt={homeData.alt}
            className="w-full max-w-[900px] h-[800px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
