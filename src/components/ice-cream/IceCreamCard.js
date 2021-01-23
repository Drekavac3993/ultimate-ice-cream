import React from "react";
import { useHistory } from "react-router-dom";
import IceCreamImage from "./IceCreamImage";
import FocusLink from "../structure/FocusLink";
import PropTypes from "prop-types";

const IceCreamCard = ({ children, to, iceCreamId, heading }) => {
  const history = useHistory();

  const onItemClickHandler = () => {
    history.push(to, { focus: true });
  };

  const onLinkClickHandler = (e) => {
    //This is done to avoid to click handler of the <section>
    //Firing and placing two browse entries in browser history
    e.stopPropagation();
  };

  return (
    <section className="card" onClick={onItemClickHandler}>
      <div className="image-container">
        <IceCreamImage iceCreamId={iceCreamId} />
      </div>
      <div className="text-container">
        <h3>
          <FocusLink to={to} onClick={onLinkClickHandler}>
            {heading}
          </FocusLink>
        </h3>
        {children}
      </div>
    </section>
  );
};

IceCreamCard.propTypes = {
  children: PropTypes.node,
  to: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.shape({
      pathname: PropTypes.string.isRequired,
      focus: PropTypes.bool,
    }),
  ]).isRequired,
  iceCreamId: PropTypes.number.isRequired,
  heading: PropTypes.string.isRequired,
};

export default IceCreamCard;
