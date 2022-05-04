import React, { useState, createContext,useEffect } from 'react';
export const NewContext = createContext({
  data: [] // Initial value
});

export const NewContextProvider = props => {
  const [data, setMyData] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8080/customers/")
      .then(res => res.json())
      .then(
        (result) => {
          setMyData(result);
        }
      )
  }, []);

  return (
    <NewContext.Provider value={data}>
      {props.children}
    </NewContext.Provider>
  );
};