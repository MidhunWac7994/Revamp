import React from "react";

const Default = ({ homeData }) => {
  return (
    <div className="default">
      <h2>{homeData.title}</h2>
      <p>{homeData.description}</p>
    </div>
  );
};

export default Default;
