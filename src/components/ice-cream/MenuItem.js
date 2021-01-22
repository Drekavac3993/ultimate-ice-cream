import React from "react";
import { useHistory } from "react-router-dom";
import IceCreamImage from "./IceCreamImage";
import FocusLink from "../structure/FocusLink";
import PropTypes from "prop-types";

const MenuItem = ({ id, iceCream, price, description, inStock, quantity }) => {
  const history = useHistory();

  const onItemClickHandler = (to) => {
    history.push(to, { focus: true });
  };

  const onLinkClickHandler = (e) => {
    //This is done to avoid to click handler of the <section>
    //Firing and placing two browse entries in browser history
    e.stopPropagation();
  };

  return (
    <li>
      <section
        className="card"
        onClick={() => {
          onItemClickHandler(`/menu-items/${id.toString()}`);
        }}
      >
        <div className="image-container">
          <IceCreamImage iceCreamId={iceCream.id} />
        </div>
        <div className="text-container">
          <h3>
            <FocusLink
              to={`/menu-items/${id.toString()}`}
              onClick={onLinkClickHandler}
            >
              {iceCream.name}
            </FocusLink>
          </h3>
          <div className="content card-content">
            <p className="price">{`$ ${price.toFixed(2)}`}</p>
            <p className={`stock ${inStock ? "" : "out"}`}>
              {inStock ? `${quantity} in stock` : "Currently out in stock"}
            </p>
            <p className="description">{description}</p>
          </div>
        </div>
      </section>
    </li>
  );
};

MenuItem.propTypes = {
  iceCream: PropTypes.object.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  inStock: PropTypes.bool.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default MenuItem;
