// src/pages/WebpayReturn.jsx
import { useEffect, useState } from "react";
import axios from "axios";
import { useSearchParams, useNavigate } from "react-router-dom";

const WebpayReturn = () => {
  const [params] = useSearchParams();
  const navigate = useNavigate();
  const [estado, setEstado] = useState("Procesando tu pago...");

  useEffect(() => {
    let yaProcesado = false;

    const token = params.get("token_ws");
    if (token && !yaProcesado) {
      axios
        .post("http://localhost:5000/webpay/commit", { token })
        .then((res) => {
          console.log("Respuesta de Webpay:", res.data);
          setEstado("✅ Pago exitoso.");
          // Puedes mostrar mensaje de éxito o error aquí
        })
        .catch((err) => {
          console.error("Error al confirmar pago:", err);
          setEstado("❌ Error al confirmar pago.");
        });
    }
  }, [params]);

  useEffect(() => {
    if (estado.includes("Pago exitoso")) {
      const timeout = setTimeout(() => {
        navigate("/");
      }, 3000);

      return () => clearTimeout(timeout); // Cleanup timeout on component unmount
    }
  }, [estado, navigate]);

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
