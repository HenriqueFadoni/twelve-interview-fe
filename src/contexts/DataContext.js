import React, { createContext, useContext, useState } from "react";
import axios from "axios";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [list, setList] = useState([]);

  const fetchData = async () => {
    const response = await axios.get(process.env.NEXT_PUBLIC_URL);
    setList(response.data);
  };

  return (
    <DataContext.Provider value={{ fetchData, list }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => useContext(DataContext);
