import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import Main from "../structure/Main";
import LoaderMessage from "../structure/LoaderMessage";
import IceCreamCardContainer from "./IceCreamCardContainer";
import IceCreamCard from "./IceCreamCard";
import { getIceCreams } from "../../services/iceCreamService";

const IceCreams = () => {
  const [iceCreams, setIceCreams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const history = useHistory();

  useEffect(() => {
    let isMounted = true;

    const fetchIceCreams = async () => {
      const iceCreamsData = await getIceCreams();
      if (isMounted) {
        setIceCreams(iceCreamsData);
        setIsLoading(false);
      }
    };

    fetchIceCreams();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <Main headingText="Choose your poison and enjoy!">
      <LoaderMessage
        loadingMessage="Loading the stock list"
        doneMessage="Loading stock is complete"
        isLoading={isLoading}
      />
      {iceCreams.length > 0 ? (
        <IceCreamCardContainer>
          {iceCreams.map(({ id, name }) => (
            <IceCreamCard
              key={id.toString()}
              iceCreamId={id}
              heading={name}
              history={history}
              to={{
                pathname: "/menu-items/add",
                search: `?iceCreamId=${id.toString()}`,
              }}
            />
          ))}
        </IceCreamCardContainer>
      ) : (
        !isLoading && (
          <p className="fully-stocked">Your menu is fully stocked!</p>
        )
      )}
    </Main>
  );
};

export default IceCreams;
