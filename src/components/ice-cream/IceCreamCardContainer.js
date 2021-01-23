import React, { Children } from "react";
import PropTypes from "prop-types";

const IceCreamCardContainer = ({ children }) => {
  return (
    <ul className="container">
      {Children.map(children, (card) => (
        <li>{card}</li>
      ))}
    </ul>
  );
};

IceCreamCardContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IceCreamCardContainer;
