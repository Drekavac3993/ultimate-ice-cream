import React from "react";
import FocusLink from "../structure/FocusLink";
import iceCreamImg from "../../assets/img/ultimate-ice-cream.svg";

const Header = () => {
  return (
    <header>
      <h1>
        <img src={iceCreamImg} alt="ice-cream" />
        Ultimate Ice Cream
      </h1>
      <nav>
        <FocusLink to="/" activeClassName="active" exact>
          Menu
        </FocusLink>
      </nav>
    </header>
  );
};

export default Header;
