// src/pages/WebpayReturn.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useCarrito } from "../components/Carrito";

const WebpayReturn = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [estado, setEstado] = useState("Procesando tu pago...");
  const [procesado, setProcesado] = useState(false); // NUEVO
  const carrito = useCarrito();

  useEffect(() => {
    const token = params.get("token_ws");
    if (token && !procesado) {
      setProcesado(true); // Evita dobles requests
      axios
        .post("http://localhost:5000/webpay/commit", { token })
        .then((res) => {
          if (res.data.success) {
            setEstado("✅ Pago exitoso.");
            setTimeout(() => {
              carrito.vaciarCarrito();
              navigate("/");
            }, 3000);
          } else {
            setEstado(
              "❌ Error al confirmar pago: " +
                (res.data.message || "Transacción rechazada.")
            );
          }
        })
        .catch((err) => {
          setEstado("❌ Error al confirmar pago.");
        });
    }
  }, [params, procesado, carrito, navigate]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl text-black font-bold mb-4">{estado}</h1>
        {estado.includes("Pago exitoso") && (
          <p className="text-gray-600">Serás redirigido automáticamente...</p>
        )}
        {estado.includes("Error") && (
          <button
            onClick={() => navigate("/CartPage")}
            className="mt-4 bg-blue-500 text-black px-4 py-2 rounded hover:bg-blue-600"
          >
            Volver al carrito
          </button>
        )}
      </div>
    </div>
  );
};

export default WebpayReturn;
