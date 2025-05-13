import { useEffect, useState } from "react";

const Products = () => {
  const [productos, setProductos] = useState([]);
  const [filteredProductos, setFilteredProductos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [marcas, setMarcas] = useState([]);

  const [categoriaFiltro, setCategoriaFiltro] = useState("");
  const [marcaFiltro, setMarcaFiltro] = useState("");
  const [search, setSearch] = useState("");

  const [paginaActual, setPaginaActual] = useState(1);
  const productosPorPagina = 6;

  // 🚧 Productos de prueba (mock)
  useEffect(() => {
    const productosMock = [
      {
        codigoProducto: "TAL01",
        nombre: "Taladro Bosch",
        precio: 59990,
        marca: "Bosch",
        categoria: "Herramientas"
      },
      {
        codigoProducto: "PIN02",
        nombre: "Pintura Blanca 1 Galón",
        precio: 19990,
        marca: "Ceresita",
        categoria: "Pinturas"
      },
      {
        codigoProducto: "EXT03",
        nombre: "Alargador Eléctrico 5mts",
        precio: 8990,
        marca: "Bticino",
        categoria: "Electricidad"
      }
    ];

    setProductos(productosMock);
    setFilteredProductos(productosMock);
    setCategorias([...new Set(productosMock.map(p => p.categoria))]);
    setMarcas([...new Set(productosMock.map(p => p.marca))]);
  }, []);

  useEffect(() => {
    let filtrados = productos;

    if (categoriaFiltro) {
      filtrados = filtrados.filter(p => p.categoria === categoriaFiltro);
    }

    if (marcaFiltro) {
      filtrados = filtrados.filter(p => p.marca === marcaFiltro);
    }

    if (search.trim()) {
      filtrados = filtrados.filter(p =>
        p.nombre.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredProductos(filtrados);
    setPaginaActual(1);
  }, [categoriaFiltro, marcaFiltro, search, productos]);

  const indexUltimo = paginaActual * productosPorPagina;
  const indexPrimero = indexUltimo - productosPorPagina;
  const productosPagina = filteredProductos.slice(indexPrimero, indexUltimo);
  const totalPaginas = Math.ceil(filteredProductos.length / productosPorPagina);
  console.log("Renderizando <Products />", productosPagina);
  return (
    <section className="py-12 bg-gray-100 font-sans text-black" id="catalogo">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-extrabold text-gray-900">Catálogo de Productos</h1>
          <p className="text-gray-600 mt-2 text-sm">Encuentra lo mejor para tu proyecto</p>
        </div>

        {/* Filtros estilizados y legibles */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-10 max-w-4xl mx-auto flex flex-wrap gap-4 justify-center text-black">
          <select
            className="p-3 border border-gray-300 rounded-md text-sm bg-white text-black font-sans focus:outline-none focus:ring focus:ring-blue-300"
            style={{ color: 'black' }}
            value={categoriaFiltro}
            onChange={e => setCategoriaFiltro(e.target.value)}
          >
            <option value="">Todas las categorías</option>
            {categorias.map((cat, idx) => (
              <option key={idx} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            className="p-3 border border-gray-300 rounded-md text-sm bg-white text-black font-sans focus:outline-none focus:ring focus:ring-blue-300"
            style={{ color: 'black' }}
            value={marcaFiltro}
            onChange={e => setMarcaFiltro(e.target.value)}
          >
            <option value="">Todas las marcas</option>
            {marcas.map((marca, idx) => (
              <option key={idx} value={marca}>{marca}</option>
            ))}
          </select>

          <input
            type="text"
            placeholder="Buscar producto..."
            className="p-3 border border-gray-300 rounded-md text-sm w-64 bg-white text-black font-sans placeholder-gray-600 focus:outline-none focus:ring focus:ring-blue-300"
            style={{ color: 'black' }}
            value={search}
            onChange={e => setSearch(e.target.value)}
          />
        </div>

        {/* Grilla de productos */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {productosPagina.map((producto, index) => (
            <div
              key={index}
              className="bg-white p-5 rounded-xl shadow-lg hover:shadow-xl transition-transform hover:scale-105"
            >
              <img
                src={`/ImgProductos/${producto.codigoProducto}.jpg`}
                alt={producto.nombre}
                className="w-full h-44 object-contain mb-4"
              />
              <div className="text-center">
                <h2 className="text-lg font-bold text-gray-900 mb-1">{producto.nombre}</h2>
                <p className="text-sm text-gray-600">{producto.marca}</p>
                <p className="text-blue-600 text-base font-semibold mt-2">${producto.precio}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Paginación */}
        <div className="flex justify-center mt-12 space-x-2">
          {[...Array(totalPaginas)].map((_, i) => (
            <button
              key={i}
              onClick={() => setPaginaActual(i + 1)}
              className={`px-4 py-2 rounded-full border font-medium transition ${
                paginaActual === i + 1
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 hover:bg-blue-100'
              }`}
            >
              {i + 1}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Products;
