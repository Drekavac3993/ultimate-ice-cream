import React from "react";
import { NavLink } from "react-router-dom";
import iceCreamImg from "../../assets/img/ultimate-ice-cream.svg";

const Header = () => {
  return (
    <header>
      <h1>
        <img src={iceCreamImg} alt="ice-cream" />
        Ultimate Ice Cream
      </h1>
      <nav>
        <NavLink to="/" activeClassName="active" exact>
          Menu
        </NavLink>
      </nav>
    </header>
  );
};

export default Header;
