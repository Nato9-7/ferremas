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
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-5"
      style={{
        backgroundImage:
          "url('https://www.ferreteriapanchito.com/wp-content/uploads/2020/12/fondo-ferreteria2-1.jpg')",
      }}
    >
      <div className="bg-white rounded-2xl p-10 w-full max-w-md shadow-xl">
        <h2 className="text-center text-2xl md:text-3xl font-bold mb-6 text-[#193CB8]">
          Crear Cuenta
        </h2>
        <form onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Nombre
          </label>
          <input
            type="text"
            className="w-full p-3 mb-5 border border-gray-300 rounded-xl text-sm text-gray-800 bg-white transition-colors focus:border-[#193CB8] focus:outline-none"
            placeholder="Nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Apellido
          </label>
          <input
            type="text"
            className="w-full p-3 mb-5 border border-gray-300 rounded-xl text-sm text-gray-800 bg-white transition-colors focus:border-[#193CB8] focus:outline-none"
            placeholder="Apellido"
            value={apellido}
            onChange={(e) => setApellido(e.target.value)}
          />
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Correo electrónico
          </label>
          <input
            type="email"
            className="w-full p-3 mb-5 border border-gray-300 rounded-xl text-sm text-gray-800 bg-white transition-colors focus:border-[#193CB8] focus:outline-none"
            placeholder="Correo electrónico"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Contraseña
          </label>
          <input
            type="password"
            className="w-full p-3 mb-5 border border-gray-300 rounded-xl text-sm text-gray-800 bg-white transition-colors focus:border-[#193CB8] focus:outline-none"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <label className="block mb-2 text-sm font-medium text-gray-700">
            Número de Teléfono
          </label>
          <input
            type="text"
            className="w-full p-3 mb-5 border border-gray-300 rounded-xl text-sm text-gray-800 bg-white transition-colors focus:border-[#193CB8] focus:outline-none"
            placeholder="Número de Teléfono"
            value={numeroTelefono}
            onChange={(e) => setNumeroTelefono(e.target.value)}
          />
          <button
            type="submit"
            className="w-full p-3 bg-[#193CB8] text-white rounded-xl font-semibold text-base hover:bg-[#0f2e95] transition-colors"
          >
            Registrarse
          </button>
        </form>
        <p className="text-center mt-4 text-sm text-gray-500">
          ¿Ya tienes una cuenta?{" "}
          <a
            href="/login"
            className="text-[#193CB8] font-semibold hover:underline"
          >
            Inicia sesión
          </a>
        </p>
      </div>
    </div>
  );
};

export default Register;
