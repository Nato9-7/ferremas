import { useCarrito } from "../components/Carrito";
import axios from "axios";

const CarritoPage = () => {
  const { carrito, eliminarDelCarrito, agregarAlCarrito } = useCarrito();

  const total = carrito.reduce(
    (sum, producto) => sum + producto.precio * producto.cantidad,
    0
  );

  const totalLength = carrito.reduce(
    (sum, producto) => sum + producto.cantidad,
    0
  );

  // ...

  const handleCheckout = async () => {
    try {
      const buyOrder = `orden-${Date.now()}`; // Genera una orden única
      const sessionId = `session-${Date.now()}`; // Identificador de sesión
      const returnUrl = "http://localhost:5173/webpay-return"; // Ajusta según tu frontend

      const response = await axios.post("http://localhost:5000/webpay/create", {
        amount: total,
        buyOrder,
        sessionId,
        returnUrl,
      });

      const { token, url } = response.data;

      // Redirige al formulario de pago de Webpay
      const form = document.createElement("form");
      form.method = "POST";
      form.action = url;

      const input = document.createElement("input");
      input.type = "hidden";
      input.name = "token_ws";
      input.value = token;

      form.appendChild(input);
      document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error("Error al iniciar pago:", error);
      alert("Ocurrió un error al procesar el pago.");
    }
  };

  return (
    <div className="container mx-auto px-4 mt-10   flex flex-col lg:flex-row gap-6 rounded ">
      {/* Sección productos */}
      <div className="flex-1 bg-white p-6 rounded shadow">
        {carrito.length === 0 ? (
          <>
            <div className="text-center text-black mt-10">
              <h3 className="text-2xl">Tu carro está vacío</h3>
              <p>
                Inicia sesión para ver los productos que habías guardado en tu
                Carro.
              </p>
            </div>
          </>
        ) : (
          <div className="grid gap-4 ">
            {carrito.map((producto, index) => (
              <div
                key={index}
                className="border p-4 rounded shadow flex justify-between items-center"
              >
                <div>
                  <img
                    src={`/ImgProductos/${producto.codigoProducto}.jpg`}
                    className="w-16 h-16 object-contain rounded"
                  />
                </div>
                <div className="flex-1 ml-4">
                  <h2 className="text-lg text-black font-semibold">
                    {producto.nombre}
                  </h2>
                  <p className="text-sm text-black">{producto.marca}</p>
                  <p className="text-green-600 font-bold">${producto.precio}</p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => eliminarDelCarrito(producto.codigoProducto)}
                    className="px-2.5 py-1 bg-red-600 rounded"
                  >
                    -
                  </button>
                  <span className="text-black">{producto.cantidad}</span>
                  <button
                    onClick={() => agregarAlCarrito(producto)}
                    className="px-2 py-1 bg-green-600 rounded"
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Sección resumen */}
      <div className="w-full lg:w-1/3 bg-white p-6 rounded shadow">
        <h2 className="text-xl font-bold mb-4 text-black">
          Resumen de la compra
        </h2>
        <div className="flex justify-between mb-2 text-black">
          <span>Productos ({totalLength})</span>
          <span>${total.toLocaleString()}</span>
        </div>
        <hr className="mb-2" />
        <div className="flex justify-between font-bold text-lg text-black">
          <span>Total:</span>
          <span>${total.toLocaleString()}</span>
        </div>
        <button
          onClick={handleCheckout}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition "
        >
          Continuar compra
        </button>
      </div>
    </div>
  );
};

export default CarritoPage;
