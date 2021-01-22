import React from "react";
import PropTypes from "prop-types";
import { Link, NavLink } from "react-router-dom";

const FocusLink = ({ to, children, activeClassName, ...props }) => {
  const newTo =
    typeof to === "string"
      ? { pathname: to, state: { focus: true } }
      : {
          ...to,
          state: to.state ? { ...to.state, focus: true } : { focus: true },
        };

  return activeClassName ? (
    <NavLink to={newTo} {...props} activeClassName={activeClassName}>
      {children}
    </NavLink>
  ) : (
    <Link to={newTo} {...props}>
      {children}
    </Link>
  );
};

FocusLink.propTypes = {
  to: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  children: PropTypes.node.isRequired,
  activeClassName: PropTypes.string,
};

export default FocusLink;
