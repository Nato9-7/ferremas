import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./register.css";

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

  <div className="register-container">
    <div className="register-card">
      <h2 className="register-title">Crear Cuenta</h2>
      <form onSubmit={handleSubmit}>
        <label className="register-label">Nombre</label>
        <input
          type="text"
          className="register-input"
          placeholder="Nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <label className="register-label">Apellido</label>
        <input
          type="text"
          className="register-input"
          placeholder="Apellido"
          value={apellido}
          onChange={(e) => setApellido(e.target.value)}
        />
        <label className="register-label">Correo electrónico</label>
        <input
          type="email"
          className="register-input"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="register-label">Contraseña</label>
        <input
          type="password"
          className="register-input"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label className="register-label">Número de Teléfono</label>
        <input
          type="text"
          className="register-input"
          placeholder="Número de Teléfono"
          value={numeroTelefono}
          onChange={(e) => setNumeroTelefono(e.target.value)}
        />
        <button type="submit" className="register-button">
          Registrarse
        </button>
      </form>
      <p className="register-footer">
        ¿Ya tienes una cuenta?{" "}
        <a href="/login">Inicia sesión</a>
      </p>
    </div>
  </div>
);

};

export default Register;