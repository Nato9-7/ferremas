import { useEffect, useState } from "react";
import "./cuentapage.css";

const CuentaPage = () => {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [producto, setProducto] = useState({
    nombre: "",
    precio: "",
    marca: "",
  });
  const [imagen, setImagen] = useState(null);
  const [preview, setPreview] = useState(null);

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

  const handleInputChange = (e) => {
    setProducto({ ...producto, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImagen(file);
    if (file) {
      setPreview(URL.createObjectURL(file));
    } else {
      setPreview(null);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí puedes hacer la petición para subir el producto y la imagen (ejemplo con FormData)
    // const formData = new FormData();
    // formData.append("nombre", producto.nombre);
    // formData.append("precio", producto.precio);
    // formData.append("marca", producto.marca);
    // if (imagen) formData.append("imagen", imagen);

    alert(`Producto subido: ${producto.nombre}, $${producto.precio}, Marca: ${producto.marca}${imagen ? ", Imagen seleccionada" : ""}`);
    setShowForm(false);
    setProducto({ nombre: "", precio: "", marca: "" });
    setImagen(null);
    setPreview(null);
  };

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
          <>
            <button className="cuenta-boton-especial" onClick={() => setShowForm(true)}>
              Subir producto
            </button>
            {showForm && (
              <div className="modal-form">
                <form className="form-producto" onSubmit={handleSubmit}>
                  <label>
                    Nombre:
                    <input
                      type="text"
                      name="nombre"
                      value={producto.nombre}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    Precio:
                    <input
                      type="number"
                      name="precio"
                      value={producto.precio}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    Marca:
                    <input
                      type="text"
                      name="marca"
                      value={producto.marca}
                      onChange={handleInputChange}
                      required
                    />
                  </label>
                  <label>
                    Imagen:
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                    />
                  </label>
                  {preview && (
                    <div style={{ textAlign: "center", marginBottom: 12 }}>
                      <img src={preview} alt="Preview" style={{ maxWidth: 120, maxHeight: 120, borderRadius: 8 }} />
                    </div>
                  )}
                  <div className="form-buttons">
                    <button type="button" onClick={() => { setShowForm(false); setPreview(null); setImagen(null); }}>
                      Cerrar
                    </button>
                    <button type="submit">
                      Subir
                    </button>
                  </div>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CuentaPage;