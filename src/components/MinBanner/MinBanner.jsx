import React from "react";

const MinBanner = ({ homeData }) => {
  return (
    <div className="min-banner mt-14">
       <img
        src={homeData.images}
        alt={homeData.alt || "Banner image"}
            
      />
    </div>
  );
};

export default MinBanner;
