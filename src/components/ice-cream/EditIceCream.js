import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import Helmet from "react-helmet";
import { getMenuItem } from "../../services/iceCreamService";
import LoaderMessage from "../structure/LoaderMessage";

const EditIceCream = () => {
  const isMounted = useRef(true);
  const [menuItem, setMenuItem] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { menuItemId } = useParams();
  const history = useHistory();

  useEffect(() => {
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchIceCream = async (menuItemId) => {
      try {
        const {
          id,
          price,
          inStock,
          quantity,
          description,
          iseCream,
        } = await getMenuItem(menuItemId);

        if (isMounted.current) {
          setMenuItem({
            id,
            price: price.toFixed(2),
            inStock,
            quantity: quantity.toString(),
            description,
            iseCream,
          });
          setIsLoading(false);
        }
      } catch (err) {
        if (err.response.status === 404 && isMounted.current) {
          history.replace("/");
        }
      }
    };

    fetchIceCream(menuItemId);
  }, [menuItemId, history]);

  return (
    <main>
      <Helmet>
        <title>Update this beauty | Ultimate Ice Cream</title>
      </Helmet>
      <h2 className="main-heading">Update this beauty</h2>
      <LoaderMessage
        loadingMessage="Loading ice cream"
        doneMessage="Ice cream loaded"
        isLoading={isLoading}
      />
    </main>
  );
};

export default EditIceCream;
