import { Link } from "react-router-dom";

const MainPage = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4">
      <div className="max-w-3xl w-full bg-white p-10 rounded-xl shadow-lg text-center">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-4 animate-fade-in">
          ¡Bienvenido a Ferremas!
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Ferremas es tu ferretería de confianza donde encontrarás productos de calidad en
          herramientas, materiales de construcción, electricidad, fontanería y pinturas.
        </p>
        <p className="text-md text-gray-600 mb-10">
          Nuestro compromiso es ofrecerte los mejores precios y atención para tus proyectos del hogar
          o de gran envergadura.
        </p>

        <Link
          to="/"
          className="inline-block bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-full text-lg transition-transform transform hover:scale-105 active:scale-95 shadow-md"
        >
          Ir al inicio
        </Link>
      </div>
    </div>
  );
};

export default MainPage;
