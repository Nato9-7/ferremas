import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [numeroTelefono, setNumeroTelefono] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:5000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          nombre,
          apellido,
          correo: email,
          contraseña: password,
          numero_telefono: numeroTelefono,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al registrar el usuario");
      }

      const data = await response.json();
      console.log("Usuario registrado:", data);

      alert("Registro exitoso. Redirigiendo a la página principal...");
      navigate("/");
    } catch (error) {
      console.error("Error al registrar:", error);
      alert("Hubo un problema al registrar el usuario.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold text-center mb-6 text-blue-800">
          Crear Cuenta
        </h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre
            </label>
            <input
              type="text"
              placeholder="Nombre"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Apellido
            </label>
            <input
              type="text"
              placeholder="Apellido"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              value={apellido}
              onChange={(e) => setApellido(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Correo electrónico
            </label>
            <input
              type="email"
              placeholder="Correo electrónico"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              value={email}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Número de Teléfono
            </label>
            <input
              type="text"
              placeholder="Número de Teléfono"
              className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900"
              value={numeroTelefono}
              onChange={(e) => setNumeroTelefono(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-800 text-white py-2 rounded-md hover:bg-blue-900 transition"
          >
            Registrarse
          </button>
        </form>
        <p className="text-sm text-gray-500 mt-4 text-center">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" className="text-blue-600 hover:underline">
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;