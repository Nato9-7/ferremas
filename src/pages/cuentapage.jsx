import { useEffect, useState } from "react";
import "./cuentapage.css";

const CuentaPage = () => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUsuario = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5000/usuario", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("No se pudo obtener el usuario");
        const data = await response.json();
        setUsuario(data);
      } catch (error) {
        setUsuario(null);
      } finally {
        setLoading(false);
      }
    };

    fetchUsuario();
  }, []);

  if (loading) return <div>Cargando...</div>;
  if (!usuario) return <div>No se pudo cargar la información de tu cuenta.</div>;

  console.log("Usuario cargado:", usuario, "ID:", usuario && usuario.id, "Tipo:", typeof usuario && typeof usuario.id);

  return (
    <div className="cuenta-container">
      <div className="cuenta-card">
        <h2 className="cuenta-title">Bienvenido</h2>
        <img
          src="https://cdn-icons-png.flaticon.com/512/149/149071.png"
          alt="Usuario"
          className="cuenta-avatar"
          width={200}
        />
        <div className="cuenta-dato">
          <strong>Nombre:</strong> {usuario.nombre}  {usuario.apellido || usuario.apellidos}
        </div>
        <div className="cuenta-dato">
          <strong>Correo:</strong> {usuario.correo}
        </div>
        <div className="cuenta-dato">
          <strong>Número de Teléfono:</strong> {usuario.numero_telefono || usuario.numerotelf}
        </div>
        {/* Mostrar botón solo si el id es 7 */}
        {Number(usuario.id) === 7 && (
          <button className="cuenta-boton-especial">
            Subir producto
          </button>
        )}
      </div>
    </div>
  );
};

export default CuentaPage;