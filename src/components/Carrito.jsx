import { createContext, useState, useContext, useEffect } from "react";

const Carrito = createContext();

export const useCarrito = () => useContext(Carrito);

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  useEffect(() => {
    // Guardar en localStorage cada vez que cambie
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find(
        (p) => p.codigoProducto === producto.codigoProducto
      );
      if (existe) {
        return prev.map((p) =>
          p.codigoProducto === producto.codigoProducto
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        );
      } else {
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  const eliminarDelCarrito = (codigoProducto) => {
    setCarrito((prev) => {
      const producto = prev.find((p) => p.codigoProducto === codigoProducto);
      if (!producto) return prev;

      if (producto.cantidad > 1) {
        return prev.map((p) =>
          p.codigoProducto === codigoProducto
            ? { ...p, cantidad: p.cantidad - 1 }
            : p
        );
      } else {
        return prev.filter((p) => p.codigoProducto !== codigoProducto);
      }
    });
  };

  return (
    <Carrito.Provider value={{ carrito, agregarAlCarrito, eliminarDelCarrito }}>
      {children}
    </Carrito.Provider>
  );
};
