import { useEffect, useState } from "react";

const Products = () => {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3000/producto")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data.slice(0, 6));
      })
      .catch((err) => console.error("Error al obtener productos:", err));
  }, []);

  return (
    <div className="mt-14 mb-12">
      <div className="container mx-auto px-4">
        {/* Sección principal */}
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold">Productos destacados</h1>
          <p className="text-xs text-gray-400">¡Lo más buscado!</p>
        </div>

        {/* Sección productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {productos.map((producto, index) => (
            <div
              key={index}
              className="border w-72 p-4 rounded shadow hover:shadow-lg  hover:scale-105 transition-transform duration-300"
            >
              <img
                src={`/ImgProductos/${producto.codigoProducto}.jpg`}
                alt={producto.nombre}
                className="w-full h-42 object-contain rounded mb-4 bg-white-200 "
              />

              <h2 className="text-xl font-semibold">{producto.nombre}</h2>
              <p className="text-sm text-gray-600">{producto.marca}</p>
              <p className="text-lg font-bold text-green-600">
                ${producto.precio}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                Código: {producto.codigoProducto}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
