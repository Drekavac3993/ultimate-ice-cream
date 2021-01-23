import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import IceCreamCard from "../ice-cream/IceCreamCard";
import LoaderMessage from "../structure/LoaderMessage";
import Main from "../structure/Main";
import IceCreamCardContainer from "./IceCreamCardContainer";
import { getMenu } from "../../services/iceCreamService";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

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
          {menu.map(
            ({ id, iceCream, price, description, inStock, quantity }) => (
              <IceCreamCard
                key={id.toString()}
                iceCreamId={iceCream.id}
                to={`/menu-items/${id.toString()}`}
                heading={iceCream.name}
                history={history}
              >
                <div className="content card-content">
                  <p className="price">{`$ ${price.toFixed(2)}`}</p>
                  <p className={`stock ${inStock ? "" : "out"}`}>
                    {inStock
                      ? `${quantity} in stock`
                      : "Currently out in stock"}
                  </p>
                  <p className="description">{description}</p>
                </div>
              </IceCreamCard>
            )
          )}
        </IceCreamCardContainer>
      ) : (
        !isLoading && <p>Your menu is empty! The sadness!!!</p>
      )}
    </Main>
  );
};

export default Menu;
