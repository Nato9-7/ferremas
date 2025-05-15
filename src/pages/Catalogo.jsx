import { useEffect, useState } from "react";
import { useCarrito } from "../components/Carrito";

const Catalogo = () => {
  const [productos, setProductos] = useState([]);
  const { agregarAlCarrito } = useCarrito();
  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 12;

  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [marcaFiltro, setMarcaFiltro] = useState("");
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);
  const [cantidades, setCantidades] = useState({}); // ✅ Guardar cantidades individuales

  useEffect(() => {
    fetch("http://localhost:5000/producto")
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) throw new Error("La respuesta no es un array de productos");
        setProductos(data);
        setCategorias([...new Set(data.map((p) => p.categoria))]);
        setMarcas([...new Set(data.map((p) => p.marca))]);
      })
      .catch((err) => console.error("Error al obtener productos:", err));
  }, []);

  const productosFiltrados = productos.filter(
    (p) =>
      (!categoriaFiltro || p.categoria === categoriaFiltro) &&
      (!marcaFiltro || p.marca === marcaFiltro)
  );

  const indexInicio = (paginaActual - 1) * productosPorPagina;
  const indexFin = indexInicio + productosPorPagina;
  const productosPagina = productosFiltrados.slice(indexInicio, indexFin);

  const handleCantidadChange = (codigoProducto, valor) => {
    const cantidad = parseInt(valor);
    setCantidades((prev) => ({
      ...prev,
      [codigoProducto]: isNaN(cantidad) || cantidad < 1 ? 1 : cantidad,
    }));
  };

  return (
    <div className="mt-14 mb-12">
      <div className="container mx-auto px-4">
        {/* Encabezado y Filtros */}
        <div className="flex flex-col md:flex-row justify-between items-center bg-white p-6 rounded shadow mb-8 gap-4 border border-gray-300">
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-blue-800">Catálogo de productos</h1>
            <p className="text-gray-700">Filtra por categoría o marca para encontrar lo que necesitas</p>
          </div>

          <div className="flex flex-wrap gap-3 items-center">
            <label className="text-sm text-gray-700 font-semibold">Categoría:</label>
            <select
              className="p-2 border border-gray-400 rounded bg-white text-gray-800"
              value={categoriaFiltro}
              onChange={(e) => {
                setCategoriaFiltro(e.target.value);
                setPaginaActual(1);
              }}
            >
              <option value="">Todas</option>
              {categorias.map((cat, idx) => (
                <option key={idx} value={cat}>
                  {cat}
                </option>
              ))}
            </select>

            <label className="text-sm text-gray-700 font-semibold">Marca:</label>
            <select
              className="p-2 border border-gray-400 rounded bg-white text-gray-800"
              value={marcaFiltro}
              onChange={(e) => {
                setMarcaFiltro(e.target.value);
                setPaginaActual(1);
              }}
            >
              <option value="">Todas</option>
              {marcas.map((marca, idx) => (
                <option key={idx} value={marca}>
                  {marca}
                </option>
              ))}
            </select>

            <button
              onClick={() => {
                setCategoriaFiltro("");
                setMarcaFiltro("");
                setPaginaActual(1);
              }}
              className="bg-red-500 text-white text-sm font-semibold px-4 py-2 rounded hover:bg-red-600 transition"
            >
              Limpiar filtros
            </button>
          </div>
        </div>

        {/* Productos */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-4">
          {productosPagina.map((producto, index) => (
            <div
              key={index}
              className="border border-gray-300 p-4 rounded shadow hover:shadow-lg bg-white hover:scale-105 transition-transform duration-300 flex flex-col h-full"
            >
              <img
                src={`/ImgProductos/${producto.codigoProducto}.jpg`}
                alt={producto.nombre}
                className="w-full h-24 object-contain rounded mb-4 bg-white"
              />
              <div className="flex-grow">
                <p className="text-sm text-gray-600 mb-2">{producto.marca}</p>
                <h2 className="text-md font-semibold text-black mb-1 line-clamp-2">
                  {producto.nombre}
                </h2>
              </div>

              {/* Input cantidad */}
              <input
                type="number"
                min={1}
                value={cantidades[producto.codigoProducto] || 1}
                onChange={(e) => handleCantidadChange(producto.codigoProducto, e.target.value)}
                className="w-full mb-2 p-1 border rounded text-black text-sm"
              />

              <div className="mt-auto">
                <p className="text-lg font-bold text-green-600 mb-3">
                  ${producto.precio.toLocaleString()}
                </p>
                <button
                  onClick={() =>
                    agregarAlCarrito(producto, cantidades[producto.codigoProducto] || 1)
                  }
                  className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors duration-300"
                >
                  Agregar al carrito
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Paginación */}
        <div className="flex justify-center mt-8 gap-2">
          {Array.from(
            { length: Math.ceil(productosFiltrados.length / productosPorPagina) },
            (_, i) => (
              <button
                key={i}
                onClick={() => setPaginaActual(i + 1)}
                className={`px-4 py-2 rounded-full border font-medium ${
                  paginaActual === i + 1
                    ? "bg-blue-600 text-white"
                    : "bg-white text-gray-800 hover:bg-blue-100 border-gray-400"
                }`}
              >
                {i + 1}
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Catalogo;
