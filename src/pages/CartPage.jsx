import { useCarrito } from "../components/Carrito";
import axios from "axios";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react"; // ✅ Necesario para manejar el mensaje

const CarritoPage = () => {
  const { carrito, eliminarDelCarrito, agregarAlCarrito } = useCarrito();
  const [errorPago, setErrorPago] = useState("");
  const [mostrarEnvio, setMostrarEnvio] = useState(false);
  const [datosEnvio, setDatosEnvio] = useState({
    direccion: "",
    ciudad: "",
    telefono: "",
  });

  // Llama a esto cuando el usuario envía el formulario de envío
  const handleEnvioSubmit = (e) => {
    e.preventDefault();
    setMostrarEnvio(false);
    handleCheckout(); // Aquí puedes pasar datosEnvio si quieres guardarlos en backend
  };

  const total = carrito.reduce(
    (sum, producto) => sum + producto.precio * producto.cantidad,
    0
  );

  const totalLength = carrito.reduce(
    (sum, producto) => sum + producto.cantidad,
    0
  );

  const handleCheckout = async () => {
    try {
      const buyOrder = `orden-${Date.now()}`;
      const sessionId = `session-${Date.now()}`;
      const returnUrl = "http://localhost:5173/webpay-return";

      const response = await axios.post("http://localhost:5000/webpay/create", {
        amount: total,
        buyOrder,
        sessionId,
        returnUrl,
      });

      const { token, url } = response.data;

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
      setErrorPago(
        "❌ Ocurrió un error al procesar el pago. Intenta agregar algún producto."
      );
    }
  };

  function confirmarInicioSesion() {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Debes iniciar sesión para continuar con la compra.");
      window.location.href = "/login";
      return false;
    }
    return true;
  }

  return (
    <div className="container mx-auto px-4 mt-10 flex flex-col lg:flex-row gap-6 rounded">
      {/* Sección productos */}
      <div className="flex-1 bg-white p-6 rounded shadow">
        {carrito.length === 0 ? (
          <div className="text-center bg-red-100 border border-red-300 text-red-600 mt-10 p-6 rounded">
            <h3 className="text-2xl font-semibold">🚫 Tu carrito está vacío</h3>
            <p className="mt-2 text-sm text-gray-700">
              Agrega productos desde el catálogo para comenzar tu compra.
            </p>
            <Link
              to="/catalogo"
              className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              Ir al catálogo
            </Link>
          </div>
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

        {/* Mensaje de error si ocurre */}
        {errorPago && (
          <div className="mb-4 px-4 py-2 bg-red-100 text-red-700 border border-red-300 rounded text-sm text-center">
            {errorPago}
          </div>
        )}

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
          onClick={() => {
            if (confirmarInicioSesion()) {

              setMostrarEnvio(true); // Mostrar formulario de envío

              handleCheckout();

            }
          }}
          className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
        >
          Continuar compra
        </button>
        {/* Sección de formulario de envío */}
        {mostrarEnvio && (
          <div className="fixed inset-0 bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded shadow-lg w-full max-w-md ">
              <h3 className="text-lg font-bold mb-4 text-black">
                Datos de envío
              </h3>
              <form
                onSubmit={handleEnvioSubmit}
                className="ring-black-500 focus:ring-2  "
              >
                <label className="block mb-2 text-sm text-black">
                  Dirección
                </label>
                <input
                  type="text"
                  className="w-full mb-4 p-2 border border-gray-300 rounded "
                  value={datosEnvio.direccion}
                  onChange={(e) =>
                    setDatosEnvio({ ...datosEnvio, direccion: e.target.value })
                  }
                  required
                />
                <label className="block mb-2 text-sm text-black">Ciudad</label>
                <input
                  type="text"
                  className="w-full mb-4 p-2 border border-gray-300 rounded"
                  value={datosEnvio.ciudad}
                  onChange={(e) =>
                    setDatosEnvio({ ...datosEnvio, ciudad: e.target.value })
                  }
                  required
                />
                <label className="block mb-2 text-sm text-black">
                  Teléfono
                </label>
                <input
                  type="text"
                  className="w-full mb-4 p-2 border border-gray-300 rounded"
                  value={datosEnvio.telefono}
                  onChange={(e) =>
                    setDatosEnvio({ ...datosEnvio, telefono: e.target.value })
                  }
                  required
                />
                <div className="flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setMostrarEnvio(false)}
                    className="px-4 py-2 bg-gray-300 rounded hover:bg-red-600"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-800"
                  >
                    Proceder al pago
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CarritoPage;
