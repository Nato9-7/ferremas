import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./login.css"; // Importar la hoja de estilos

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
    <div className="login-container">
      <div className="login-card">
        <h2 className="login-title">Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <label className="login-label">Correo electrónico</label>
          <input
            type="text"
            placeholder="Correo electrónico"
            className="login-input"
            value={emailconsulta}
            onChange={(e) => setEmail(e.target.value)}
          />
          <label className="login-label">Contraseña</label>
          <input
            type="password"
            placeholder="Contraseña"
            className="login-input"
            value={passwordconsulta}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-button">
            Entrar
          </button>
        </form>
        <p className="login-footer">
          ¿No tienes una cuenta?{" "}
          <a href="/register">Regístrate</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
