import { useState, useEffect } from "react";

const useValidation = (value, validatorFn, compareValue = null) => {
  const [error, setError] = useState("");

  useEffect(() => {
    setError(validatorFn(value, compareValue));
  }, [value, compareValue, validatorFn]);

  return error;
};

export default useValidation;
