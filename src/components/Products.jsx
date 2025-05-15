import { useEffect, useState } from "react";
import { useCarrito } from "../components/Carrito";

const Products = () => {
  const [productos, setProductos] = useState([]);
  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    fetch("http://localhost:5000/producto")
      .then((res) => res.json())
      .then((data) => {
        setProductos(data.slice(0, 6));
      })
      .catch((err) => console.error("Error al obtener productos:", err));
  }, []);

  return (
    <div className="mt-14 mb-12">
      <div className="container mx-auto px-4 ">
        {/* Sección principal */}
        <div className="text-center  mb-10 max-w-2xl mx-auto bg-white p-4 rounded shadow">
          <h1 className="text-3xl font-bold text-black">
            Productos destacados
          </h1>
          <p className="text-x text-gray-800 ">¡Lo más buscado!</p>
        </div>
        {/* Sección productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {productos.map((producto, index) => (
            <div
              key={index}
              className="border w-50 p-4 rounded shadow hover:shadow-lg bg-white hover:scale-105 transition-transform duration-300 flex flex-col h-full"
            >
              <img
                src={`/ImgProductos/${producto.codigoProducto}.jpg`}
                alt={producto.nombre}
                className="w-full h-24 object-contain rounded mb-4 bg-white"
              />

              <div className="flex-grow">
                {" "}
                <p className="text-sm text-gray-600 mb-2">{producto.marca}</p>
                <h2 className="text-md font-semibold text-black mb-1 line-clamp-2">
                  {" "}
                  {producto.nombre}
                </h2>
              </div>

              <div className="mt-auto">
                {" "}
                <p className="text-lg font-bold text-green-600 mb-3">
                  {" "}
                  ${producto.precio.toLocaleString()}{" "}
                </p>
                <button
                  onClick={() => {
                    setTimeout(() => {
                      agregarAlCarrito(producto);
                    }, 500);
                  }}
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
