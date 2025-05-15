import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import { Bars3Icon, ChevronDownIcon } from "@heroicons/react/24/outline";
import { useCarrito } from "../components/Carrito"; // ✅ Importar el contexto del carrito

const links = [
  { label: "Iniciar sesión", to: "/login" },
  { label: "Crear cuenta", to: "/register" },
  { label: "Mi cuenta", to: "/account" },
  { label: "Logout", isButton: true },
];

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [nombre, setNombre] = useState(
    localStorage.getItem("nombre") || ", inicia sesión"
  );
  const { mensaje } = useCarrito(); // ✅ Usar mensaje del carrito

  useEffect(() => {
    const handleStorageChange = () => {
      setNombre(localStorage.getItem("nombre") || ", inicia sesión");
    };
    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  return (
    <header className="bg-blue-800 text-white shadow-lg">
      <div className="container mx-auto px-2 py-2">
        <div className="flex justify-between items-center">
          <Link to={"/"} className="flex items-center space-x-2">
            <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold">FM</span>
            </div>
            <h1 className="text-xl font-bold">Ferremas</h1>
          </Link>

          <PopoverGroup className="hidden lg:flex lg:gap-x-12 lg:items-center">
            <Popover className="relative">
              <PopoverButton className="flex items-center gap-x-1 font-semibold text-white-900">
                Categorías
                <ChevronDownIcon
                  aria-hidden="true"
                  className="size-5 flex-none text-gray-400"
                />
              </PopoverButton>
              <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-56 rounded-xl bg-white p-2 shadow-lg ring-1 ring-gray-900/5">
                <div className="p-2">
                  {[
                    "Materiales de Construcción",
                    "Herramientas",
                    "Electricidad",
                    "Fontanería",
                    "Pinturas",
                  ].map((item) => (
                    <a
                      key={item}
                      href="#"
                      className="block rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                    >
                      {item}
                    </a>
                  ))}
                </div>
              </PopoverPanel>
            </Popover>

            <div className="hidden md:block px-3 py-2">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Buscar en Ferremas"
                  className="w-128 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-white-500"
                />
                <button className="absolute right-3 top-3 text-white-500">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                    />
                  </svg>
                </button>
              </div>
            </div>
          </PopoverGroup>

          <PopoverGroup className="hidden lg:flex lg:gap-x-12 lg:items-center">
            <Popover className="relative">
              <PopoverButton className="flex items-center gap-x-1 font-semibold text-white-900">
                <span className="text-sm">Hola {nombre}</span>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="size-5 flex-none text-gray-400"
                />
              </PopoverButton>
              <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-56 rounded-xl bg-white p-2 shadow-lg ring-1 ring-gray-900/5">
                <div className="p-2">
                  {!localStorage.getItem("token") && (
                    <Link
                      to="/login"
                      className="block rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                    >
                      Iniciar sesión
                    </Link>
                  )}

                  {localStorage.getItem("token") && (
                    <button
                      className="block w-full text-left rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                      onClick={() => {
                        localStorage.removeItem("token");
                        localStorage.removeItem("nombre");
                        window.dispatchEvent(new Event("storage"));
                        window.location.href = "/";
                      }}
                    >
                      Cerrar sesión
                    </button>
                  )}

                  <Link
                    to="/register"
                    className="block rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                  >
                    Crear cuenta
                  </Link>
                  <Link
                    to="/account"
                    className="block rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                  >
                    Mi cuenta
                  </Link>
                </div>
              </PopoverPanel>
            </Popover>
          </PopoverGroup>

          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-white-700"
            >
              <span className="sr-only">Abrir menu</span>
              <Bars3Icon aria-hidden="true" className="size-6" />
            </button>
          </div>

          <div className="flex items-center space-x-6 relative">
            <Link
              to="/CartPage"
              className="flex items-center space-x-1 cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 text-white-600"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                />
              </svg>
              <span className="text-sm">Mis compras</span>
            </Link>

            {/* Mensaje debajo del botón "Mis compras" */}
            {mensaje && (
              <div className="absolute top-full mt-2 left-0 w-max bg-green-600 text-white px-4 py-1 rounded shadow-md text-sm z-50">
                {mensaje}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
