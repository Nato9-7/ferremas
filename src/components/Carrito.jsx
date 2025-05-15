import React, { createContext, useState, useContext, useEffect } from "react";

const Carrito = createContext();

export const useCarrito = () => useContext(Carrito);

export const CarritoProvider = ({ children }) => {
  const [carrito, setCarrito] = useState(() => {
    const carritoGuardado = localStorage.getItem("carrito");
    return carritoGuardado ? JSON.parse(carritoGuardado) : [];
  });

  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    localStorage.setItem("carrito", JSON.stringify(carrito));
  }, [carrito]);

  const mostrarMensaje = (texto) => {
    setMensaje(texto);
    setTimeout(() => setMensaje(""), 3000);
  };

  const agregarAlCarrito = (producto) => {
    setCarrito((prev) => {
      const existe = prev.find(
        (p) => p.codigoProducto === producto.codigoProducto
      );
      if (existe) {
        mostrarMensaje("✔️ Se aumentó la cantidad del producto");
        return prev.map((p) =>
          p.codigoProducto === producto.codigoProducto
            ? { ...p, cantidad: p.cantidad + 1 }
            : p
        );
      } else {
        mostrarMensaje("🛒 Producto agregado al carrito");
        return [...prev, { ...producto, cantidad: 1 }];
      }
    });
  };

  const eliminarDelCarrito = (codigoProducto) => {
    setCarrito((prev) => {
      const producto = prev.find((p) => p.codigoProducto === codigoProducto);
      if (!producto) return prev;

      if (producto.cantidad > 1) {
        mostrarMensaje("➖ Se redujo la cantidad del producto");
        return prev.map((p) =>
          p.codigoProducto === codigoProducto
            ? { ...p, cantidad: p.cantidad - 1 }
            : p
        );
      } else {
        mostrarMensaje("🗑️ Producto eliminado del carrito");
        return prev.filter((p) => p.codigoProducto !== codigoProducto);
      }
    });
  };

  const vaciarCarrito = () => {
    setCarrito([]);
    mostrarMensaje("🧹 Carrito vaciado");
  };

  return (
    <Carrito.Provider
      value={{
        carrito,
        agregarAlCarrito,
        eliminarDelCarrito,
        vaciarCarrito,
        mensaje, // exportamos mensaje
      }}
    >
      {children}
    </Carrito.Provider>
  );
};
