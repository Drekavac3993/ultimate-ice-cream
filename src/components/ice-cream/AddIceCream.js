import React, { useState, useEffect, useRef } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { getIceCream, addMenuItem } from "../../services/iceCreamService";
import LoaderMessage from "../structure/LoaderMessage";
import Main from "../structure/Main";
import IceCream from "./IceCream";

const EditIceCream = () => {
  const isMounted = useRef(true);
  const [iceCream, setIceCream] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();
  const history = useHistory();

  useEffect(() => {
    return () => (isMounted.current = false);
  }, []);

  useEffect(() => {
    setIsLoading(true);
    const fetchIceCream = async () => {
      try {
        const item = await getIceCream(location.search.split("=")[1]);

        if (isMounted.current) {
          setIceCream(item);
          setIsLoading(false);
        }
      } catch (err) {
        if (err.response.status === 404 && isMounted.current) {
          history.replace("/", { focus: true });
        }
      }
    };

    fetchIceCream();
  }, [location.search, history]);

  const onSubmitHandler = async (menuItem) => {
    try {
      await addMenuItem(menuItem);
      history.push("/", { focus: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Main headingText="Add some goodness to the menu">
      <LoaderMessage
        loadingMessage="Loading ice cream"
        doneMessage="Ice cream loaded"
        isLoading={isLoading}
      />
      {!isLoading && (
        <IceCream iceCream={iceCream} onSubmit={onSubmitHandler} />
      )}
    </Main>
  );
};

export default EditIceCream;
