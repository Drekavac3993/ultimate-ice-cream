import React from "react";
import { useHistory } from "react-router-dom";
import IceCreamCard from "../ice-cream/IceCreamCard";
import PropTypes from "prop-types";

const MenuItem = ({ id, iceCream, price, description, inStock, quantity }) => {
  const history = useHistory();

  return (
    <IceCreamCard
      iceCreamId={iceCream.id}
      to={`/menu-items/${id.toString()}`}
      heading={iceCream.name}
      history={history}
    >
      <div className="content card-content">
        <p className="price">{`$ ${price.toFixed(2)}`}</p>
        <p className={`stock ${inStock ? "" : "out"}`}>
          {inStock ? `${quantity} in stock` : "Currently out in stock"}
        </p>
        <p className="description">{description}</p>
      </div>
    </IceCreamCard>
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
