import React from "react";

const Footer = () => {
  return (
    <footer className="bg-blue-800 py-8 px-4 mt-12">
      <div className="max-w-6xl mx-auto">
        {/* Términos y condiciones */}
        <div className="mb-6">
          <h2 className="text-xl text-black-700 font-bold mb-4">
            Términos y Condiciones
          </h2>
          <ul className="space-y-2">
            <li>
              <a
                href="#"
                className="text-black-700 hover:text-black-900 hover:underline"
              >
                - Políticas de Privacidad
              </a>
            </li>
            <li>
              <a
                href="#"
                className="text-black-700 hover:text-black-900 hover:underline"
              >
                - Política de Cookies
              </a>
            </li>
          </ul>
        </div>

        {/* Información de la empresa */}
        <div className="border-t border-gray-300 pt-6">
          <p className="text-black-700 mb-2">
            © TODOS LOS DERECHOS RESERVADOS FERREMAS
          </p>
          <p className="text-black-700 mb-4">Resuelve Norte 660.1 Las Condes</p>

          {/* Compras seguras */}
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-green-600 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
              />
            </svg>
            <span className="text-black-700 font-medium">
              Compras 100% seguros
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
