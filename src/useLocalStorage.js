import React, { useState } from "react";

const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(function () {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });

  const setValue = (value) => {
    try {
      setStoredValue(value instanceof Function ? value(storedValue) : value);
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
};

export default useLocalStoreage;
