import { createContext, useState, useContext } from "react";

const Carrito = createContext();

export const useCarrito = () => useContext(Carrito);

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => [...prev, producto]);
  };

  const eliminarDelCarrito = (codigoProducto) => {
    setCarrito((prev) =>
      prev.filter((item) => item.codigoProducto !== codigoProducto)
    );
  };

  return (
    <Carrito.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito }}>
      {children}
    </Carrito.Provider>
  );
};
