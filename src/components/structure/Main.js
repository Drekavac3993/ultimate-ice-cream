import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import Helmet from "react-helmet";
import PropTypes from "prop-types";

const Main = ({ children, headingText, headingLevel = 2 }) => {
  const heading = useRef(null);
  const H = `h${headingLevel}`;

  const location = useLocation();

  useEffect(() => {
    if (location.state && location.state.focus) {
      heading.current.focus();
    }
    window.scroll(0, 0);
  }, [location.state]);

  return (
    <main>
      <Helmet>
        <title>{headingText} | Ultimate Ice Cream</title>
      </Helmet>
      <H className="main-heading" ref={heading} tabIndex="-1">
        {headingText}
      </H>
      {children}
    </main>
  );
};

Main.propTypes = {
  children: PropTypes.node.isRequired,
  headingText: PropTypes.string.isRequired,
  headingLevel: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

export default Main;
