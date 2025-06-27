import AddressItemShimmer from "../AddressItem/Shimmer/AddressItemShimmer";
import React, { Fragment } from "react";

const MyAddressShimmer = () => {
  return (
    <div
      data-wdget="MyAddressShimmer"
      className="grid grid-cols-1 laptop:grid-cols-2 gap-4"
    >
      {[...Array(4).keys()].map((item) => (
        <Fragment key={item}>
          <AddressItemShimmer />
        </Fragment>
      ))}
    </div>
  );
};

export default MyAddressShimmer;
