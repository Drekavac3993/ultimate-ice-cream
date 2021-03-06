import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import {
  getMenuItem,
  editMenuItem,
  deleteMenuItem,
} from "../../services/iceCreamService";
import LoaderMessage from "../structure/LoaderMessage";
import Main from "../structure/Main";
import IceCream from "./IceCream";

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
        const item = await getMenuItem(menuItemId);

        if (isMounted.current) {
          setMenuItem(item);
          setIsLoading(false);
        }
      } catch (err) {
        if (err.response.status === 404 && isMounted.current) {
          history.replace("/", { focus: true });
        }
      }
    };

    fetchIceCream(menuItemId);
  }, [menuItemId, history]);

  const onSubmitHandler = async (updatedItem) => {
    try {
      await editMenuItem({ id: menuItem.id, ...updatedItem });
      history.push("/", { focus: true });
    } catch (err) {
      console.log(err);
    }
  };

  const onDeleteHandler = async () => {
    try {
      await deleteMenuItem(menuItemId);
      history.replace("/", { focus: true });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <Main headingText="Update this beauty">
      <LoaderMessage
        loadingMessage="Loading ice cream"
        doneMessage="Ice cream loaded"
        isLoading={isLoading}
      />
      {!isLoading && (
        <IceCream
          {...menuItem}
          onDelete={onDeleteHandler}
          onSubmit={onSubmitHandler}
        />
      )}
    </Main>
  );
};

export default EditIceCream;
