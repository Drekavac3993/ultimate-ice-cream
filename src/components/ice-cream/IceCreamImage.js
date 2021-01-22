import React from "react";
import PropTypes from "prop-types";

const IceCreamImage = ({ iceCreamId }) =>
  iceCreamId != null && (
    <img
      src={`${
        process.env.PUBLIC_URL
      }/ice-cream-images/ice-cream-${iceCreamId.toString()}.svg`}
      alt="ice-cream"
    />
  );

IceCreamImage.propTypes = {
  iceCreamId: PropTypes.number,
};

export default IceCreamImage;
