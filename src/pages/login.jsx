import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [emailconsulta, setEmail] = useState("");
  const [passwordconsulta, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
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
        alert(errorData.mensaje);
        return;
      }

      if (!response.ok) {
        throw new Error("Error en la consulta al backend");
      }

      const data = await response.json();

      localStorage.setItem("usuario_id", data.id);

      console.log("Token recibido:", data.token); // 👈 AQUÍ imprimes el token

      console.log("Token recibido:", data.token);

      console.log("ID del usuario:", data.id);
      console.log("Nombre del usuario:", data.nombre);

      if (data.id > 0) {
        localStorage.removeItem("token");
        localStorage.setItem("token", data.token);
        localStorage.setItem("nombre", data.nombre);

        window.dispatchEvent(new Event("storage"));

        navigate("/");
      }
    } catch (error) {
      console.error("Error al realizar la consulta:", error);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-5"
      style={{
        backgroundImage:
          "url('https://www.ferreteriapanchito.com/wp-content/uploads/2020/12/fondo-ferreteria2-1.jpg')",
      }}
    >
      <div className="bg-white rounded-2xl p-10 w-full max-w-md shadow-xl animate-fadeIn">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-6 text-[#193CB8]">
          Iniciar sesión
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Correo electrónico
          </label>
          <input
            type="email"
            className="w-full p-3 mb-5 border border-gray-300 rounded-xl text-sm text-gray-800 bg-white transition-colors focus:border-[#193CB8] focus:outline-none"
            value={emailconsulta}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            className="w-full p-3 mb-5 border border-gray-300 rounded-xl text-sm text-gray-800 bg-white transition-colors focus:border-[#193CB8] focus:outline-none"
            value={passwordconsulta}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="submit"
            className="w-full p-3 bg-[#193CB8] text-white rounded-xl font-semibold text-base hover:bg-[#0f2e95] transition-colors"
          >
            Ingresar
          </button>
        </form>
        <div className="text-center mt-4 text-sm text-gray-500">
          ¿No tienes cuenta?{" "}
          <Link
            to="/register"
            className="text-[#193CB8] font-semibold hover:underline"
          >
            Regístrate aquí
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
