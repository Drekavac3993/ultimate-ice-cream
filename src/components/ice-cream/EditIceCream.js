import React, { useState, useEffect, useRef } from "react";
import { useParams, useHistory } from "react-router-dom";
import { getMenuItem, editMenuItem } from "../../services/iceCreamService";
import LoaderMessage from "../structure/LoaderMessage";
import Main from "../structure/Main";
import ErrorContainer from "./ErrorContainer";
import IceCreamImage from "./IceCreamImage";
import useUniqueIds from "../../hooks/useUniquelds";
import useValidation from "../../hooks/useValidation";
import {
  validateDescription,
  validateQuantity,
  validatePrice,
} from "../../utils/validators";

const EditIceCream = () => {
  const isMounted = useRef(true);
  const [menuItem, setMenuItem] = useState({
    price: "0.00",
    inStock: true,
    quantity: "0",
    description: "",
    iceCream: {},
  });
  const [isLoading, setIsLoading] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [descriptionId, stockId, quantityId, priceId] = useUniqueIds(4);

  const { menuItemId } = useParams();
  const history = useHistory();

  const descriptionError = useValidation(
    menuItem.description,
    validateDescription
  );

  const quantityError = useValidation(
    menuItem.quantity,
    validateQuantity,
    menuItem.inStock
  );

  const priceError = useValidation(menuItem.price, validatePrice);

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
          iceCream,
        } = await getMenuItem(menuItemId);

        if (isMounted.current) {
          setMenuItem({
            id,
            price: price.toFixed(2),
            inStock,
            quantity: quantity.toString(),
            description,
            iceCream,
          });
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

  const onChangeHandler = (e) => {
    let newMenuItemData = {
      ...menuItem,
      [e.target.name]:
        e.target.type === "checkbox" ? e.target.checked : e.target.value,
    };

    if (e.target.name === "quantity") {
      newMenuItemData.inStock = e.target.value !== "0";
    }

    if (e.target.name === "inStock" && !e.target.checked) {
      newMenuItemData.quantity = "0";
    }

    setMenuItem(newMenuItemData);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setHasSubmitted(true);

    if (!descriptionError && !quantityError && !priceError) {
      const { id, price, inStock, quantity, description, iceCream } = menuItem;

      const submitItem = {
        id,
        iceCream: { id: iceCream.id },
        price: parseFloat(price),
        inStock,
        quantity: parseInt(quantity),
        description,
      };

      editMenuItem(submitItem).then(() => {
        history.push("/", { focus: true });
      });
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
        <div className="form-frame">
          <div className="image-container">
            <IceCreamImage iceCreamId={menuItem.iceCream.id} />
          </div>
          <div className="form-container">
            <dl>
              <dt>Name :</dt>
              <dd>{menuItem.iceCream.name}</dd>
            </dl>
            <form onSubmit={onSubmitHandler}>
              <label htmlFor={descriptionId}>
                Description<span aria-hidden="true">*</span> :
              </label>
              <ErrorContainer
                errorText={descriptionError}
                hasSubmitted={hasSubmitted}
              >
                <textarea
                  id={descriptionId}
                  name="description"
                  rows="3"
                  value={menuItem.description}
                  onChange={onChangeHandler}
                />
              </ErrorContainer>

              <label htmlFor={stockId}>In Stock :</label>
              <div className="checkbox-wrapper">
                <input
                  id={stockId}
                  type="checkbox"
                  name="inStock"
                  checked={menuItem.inStock}
                  onChange={onChangeHandler}
                />
                <div className="checkbox-wrapper-checked" />
              </div>

              <label htmlFor={quantityId}>Quantity :</label>
              <ErrorContainer
                errorText={quantityError}
                hasSubmitted={hasSubmitted}
              >
                <select
                  id={quantityId}
                  name="quantity"
                  value={menuItem.quantity}
                  onChange={onChangeHandler}
                >
                  <option value="0">0</option>
                  <option value="10">10</option>
                  <option value="20">20</option>
                  <option value="30">30</option>
                  <option value="40">40</option>
                  <option value="50">50</option>
                </select>
              </ErrorContainer>

              <label htmlFor={priceId}>
                Price<span aria-hidden="true">*</span> :
              </label>
              <ErrorContainer
                errorText={priceError}
                hasSubmitted={hasSubmitted}
              >
                <input
                  id={priceId}
                  type="number"
                  step="0.01"
                  name="price"
                  value={menuItem.price}
                  onChange={onChangeHandler}
                />
              </ErrorContainer>
              <div className="button-container">
                <button className="ok" type="submit">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </Main>
  );
};

export default EditIceCream;
