import React, { useState, useEffect } from "react";
import Helmet from "react-helmet";
import MenuItem from "./MenuItem";
import LoaderMessage from "../structure/LoaderMessage";
import { getMenu } from "../../services/iceCreamService";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchMenuData = async () => {
      let isMounted = true;
      if (isMounted) {
        const menuData = await getMenu();
        setMenu(menuData);
        setIsLoading(false);
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
      <LoaderMessage
        loadingMessage="Loading menu"
        doneMessage="Loading menu complete"
        isLoading={isLoading}
      />
      {menu.length > 0 ? (
        <ul className="container">
          {menu.map(({ id, ...props }) => (
            <MenuItem key={id} {...props} />
          ))}
        </ul>
      ) : (
        !isLoading && <p>Your menu is empty! The sadness!!!</p>
      )}
    </main>
  );
};

export default Menu;
