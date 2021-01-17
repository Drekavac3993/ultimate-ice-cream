import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import MenuItem from "./MenuItem";
import { getMenu } from "../../services/iceCreamService";

const Menu = () => {
  const [menu, setMenu] = useState([]);

  useEffect(() => {
    const fetchMenuData = async () => {
      let isMounted = true;
      if (isMounted) {
        const menuData = await getMenu();
        setMenu(menuData);
      }
      return () => {
        isMounted = false;
      };
    };

    fetchMenuData();
  }, []);

  return (
    <main>
      <Helmet>
        <title>
          Rock your taste buds with one of these! | Ultimate Ice Cream
        </title>
      </Helmet>
      <h2 className="main-heading">Rock your taste buds with one of these!</h2>
      {menu.length > 0 ? (
        <ul className="container">
          {menu.map((item) => (
            <MenuItem {...item} />
          ))}
        </ul>
      ) : (
        <p>Your menu is empty! The sadness!!!</p>
      )}
    </main>
  );
};

export default Menu;
