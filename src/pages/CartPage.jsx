import { useCarrito } from "../components/Carrito";

const CarritoPage = () => {
  const { carrito, eliminarDelCarrito } = useCarrito();

  const total = carrito.reduce((sum, producto) => sum + producto.precio, 0);

  return (
    <div className="container mx-auto px-4 mt-10 flex flex-col lg:flex-row gap-6">
      {/* Sección productos */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-4">Tu carrito</h1>
        {carrito.length === 0 ? (
          <p>El carrito está vacío.</p>
        ) : (
          <div className="grid gap-4">
            {carrito.map((producto, index) => (
              <div
                key={index}
                className="border p-4 rounded shadow flex justify-between items-center"
              >
                <div>
                  <h2 className="text-lg font-semibold">{producto.nombre}</h2>
                  <p className="text-sm text-gray-600">{producto.marca}</p>
                  <p className="text-green-600 font-bold">${producto.precio}</p>
                </div>
                <button
                  onClick={() => eliminarDelCarrito(producto.codigoProducto)}
                  className="text-black-800 p-2 bg-red-500 rounded hover:bg-red-700 transition"
                >
                  Eliminar
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sección resumen */}
      <div className="w-full lg:w-1/3 bg-white-100 p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4">Resumen de la compra</h2>
        <div className="flex justify-between mb-2">
          <span>Productos ({carrito.length})</span>
          <span>${total.toLocaleString()}</span>
        </div>
        <hr className="mb-2" />
        <div className="flex justify-between font-bold text-lg">
          <span>Total:</span>
          <span>${total.toLocaleString()}</span>
        </div>
        <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition">
          Continuar compra
        </button>
      </div>
    </div>
  );
};

export default CarritoPage;
