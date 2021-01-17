import React from "react";
import PropTypes from "prop-types";
import IceCreamImage from "./IceCreamImage";

const MenuItem = ({ iceCream, price, description, inStock, quantity }) => (
  <li>
    <section className="card">
      <div className="image-container">
        <IceCreamImage iceCreamId={iceCream.id} />
      </div>
      <div className="text-container">
        <h3>{iceCream.name}</h3>
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

MenuItem.propTypes = {
  iceCream: PropTypes.object.isRequired,
  price: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  inStock: PropTypes.bool.isRequired,
  quantity: PropTypes.number.isRequired,
};

export default MenuItem;
