import React, { useState, useEffect } from "react";
import Main from "../structure/Main";
import LoaderMessage from "../structure/LoaderMessage";
import { getIceCreams } from "../../services/iceCreamService";

const IceCreams = () => {
  const [iceCreams, setIceCreams] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

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

  console.log(iceCreams);

  return (
    <Main headingText="Choose your poison and enjoy!">
      <LoaderMessage
        loadingMessage="Loading the stock list"
        doneMessage="Loading stock is complete"
        isLoading={isLoading}
      />
    </Main>
  );
};

export default IceCreams;
