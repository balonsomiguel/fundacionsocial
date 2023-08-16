import { createContext, useContext, useState } from "react";
import { servicioAlmacenarData } from "../services/data.js";

export const DataContext = createContext();

export const useData = () => {
  const contexto = useContext(DataContext);

  if (!contexto) {
    throw new Error("No hay contexto de data");
  }
  return contexto;
};

export const DataProvider = ({ children }) => {
  const [data, setData] = useState([]);

  const cargarDataServidor = async (data) => {
    try {
      const respuesta = await servicioAlmacenarData(data);
      if (respuesta.status === 200) {
        setData(respuesta.data);
      }
    } catch (error) {
      console.log(error.response.data);
    }
  };

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        cargarDataServidor,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
