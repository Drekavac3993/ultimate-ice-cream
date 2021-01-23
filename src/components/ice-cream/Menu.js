import React, { useState, useEffect } from "react";
import MenuItem from "./MenuItem";
import LoaderMessage from "../structure/LoaderMessage";
import Main from "../structure/Main";
import IceCreamCardContainer from "./IceCreamCardContainer";
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
    <Main headingText="Rock your taste buds with one of these!">
      <LoaderMessage
        loadingMessage="Loading menu"
        doneMessage="Loading menu complete"
        isLoading={isLoading}
      />
      {menu.length > 0 ? (
        <IceCreamCardContainer>
          {menu.map((item) => (
            <MenuItem key={item.id} {...item} />
          ))}
        </IceCreamCardContainer>
      ) : (
        !isLoading && <p>Your menu is empty! The sadness!!!</p>
      )}
    </Main>
  );
};

export default Menu;
