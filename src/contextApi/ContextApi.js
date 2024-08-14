import React, { createContext, useState } from 'react';

// Create the context
const MyContext = createContext();

const MyProvider = ({ children }) => {
  const [state, setState] = useState("Initial State");
  const [wishItems, setWishItems] = useState([]);

  const toggleWishItems = (item, id) => {
    setWishItems((prevWishItems) => {
      const isWishlisted = prevWishItems.some((wishItem) => wishItem.id === id);
      if (isWishlisted) {
        return prevWishItems.filter((wishItem) => wishItem.id !== id);
      } else {
        return [...prevWishItems, item];
      }
    });
  };

  return (
    <MyContext.Provider value={{ state, setState, wishItems, setWishItems, toggleWishItems }}>
      {children}
    </MyContext.Provider>
  );
};

export { MyContext, MyProvider };
