import React from "react";

const MenuItem = ({ iceCream, price, description, inStock, quantity }) => (
  <li>
    <section className="card">
      <div className="image-container" />
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

export default MenuItem;
