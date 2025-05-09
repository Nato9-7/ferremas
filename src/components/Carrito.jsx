import { createContext, useState, useContext } from "react";

const Carrito = createContext();

export const useCarrito = () => useContext(Carrito);

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState([]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => [...prev, producto]);
  };

  const eliminarDelCarrito = (codigoProducto) => {
    setCarrito((prev) => {
      const index = prev.findIndex(
        (item) => item.codigoProducto === codigoProducto
      );
      if (index !== -1) {
        const nuevoCarrito = [...prev];
        nuevoCarrito.splice(index, 1);
        return nuevoCarrito;
      }
      return prev;
    });
  };

  return (
    <Carrito.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito }}>
      {children}
    </Carrito.Provider>
  );
};
