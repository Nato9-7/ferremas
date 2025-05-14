import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [emailconsulta, setEmail] = useState("");
  const [passwordconsulta, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Enviar las credenciales al backend
      const response = await fetch("http://localhost:5000/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          correo: emailconsulta,
          contraseña: passwordconsulta,
        }),
      });

      if (response.status === 401) {
        const errorData = await response.json();
        alert(errorData.mensaje); // Muestra el mensaje del backend
        return;
      }

      if (!response.ok) {
        throw new Error("Error en la consulta al backend");
      }

      const data = await response.json();

      console.log("Token recibido:", data.token); // 👈 AQUÍ imprimes el token
      console.log("ID del usuario:", data.id);
      console.log("Nombre del usuario:", data.nombre);

      if (data.id > 0) {
        localStorage.removeItem("token");
        localStorage.setItem("token", data.token);
        localStorage.setItem("nombre", data.nombre);

        // Forzar el evento de almacenamiento
        window.dispatchEvent(new Event("storage"));

        navigate("/");
      }

      navigate("/");
    } catch (error) {
      console.error("Error al realizar la consulta:", error);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <img
          src="https://th.bing.com/th/id/OIP.CGN_R3YtmCaxNFdrPQCKBQHaHT?rs=1&pid=ImgDetMain"
          alt="Descripción de la imagen"
          className="w-24 h-24 mx-auto mb-4 rounded-full"
        />
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">
          Iniciar Sesión
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              type="text"
              placeholder="Correo electrónico"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              value={emailconsulta}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              placeholder="Contraseña"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              value={passwordconsulta}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-900 transition"
          >
            Entrar
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-4 text-center">
          ¿No tienes una cuenta?{" "}
          <a href="#" className="text-blue-600 hover:underline">
            Regístrate
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
