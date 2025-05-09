import { useCarrito } from "../components/Carrito";

const Cart = () => {
  const { carrito, eliminarDelCarrito } = useCarrito();
  console.log("Contenido del carrito:", carrito);

  return (
    <div className="container mx-auto px-4 mt-10">
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
                className="text-red-500 hover:underline"
              >
                Eliminar
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Cart;
