import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Popover,
  PopoverButton,
  PopoverGroup,
  PopoverPanel,
} from "@headlessui/react";
import { Bars3Icon, ChevronDownIcon } from "@heroicons/react/24/outline";

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-blue-800 text-white shadow-lg   ">
      <div className="container mx-auto px-2 py-2">
        <div className="flex justify-between items-center">
          <a href="#" className="flex items-center space-x-2">
            {/*  logo */}
            <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
              <span className="text-blue-600 font-bold">FM</span>
            </div>
            <h1 className="text-xl font-bold">Ferremas</h1>
          </a>

          {/* Botón de Categorías (versión desktop) */}
          <PopoverGroup className="hidden lg:flex lg:gap-x-12 lg:items-center">
            <Popover className="relative">
              <PopoverButton className="flex items-center gap-x-1  font-semibold text-white-900">
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
            {/*Barra de búsqueda*/}
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
              <PopoverButton className="flex items-center gap-x-1  font-semibold text-white-900">
                <span className="text-sm">Hola, Inicia sesión</span>
                <ChevronDownIcon
                  aria-hidden="true"
                  className="size-5 flex-none text-gray-400"
                />
              </PopoverButton>
              <PopoverPanel className="absolute -left-8 top-full z-10 mt-3 w-56 rounded-xl bg-white p-2 shadow-lg ring-1 ring-gray-900/5">
                <div className="p-2">
                  {["Iniciar sesión", "Crear cuenta", "Mi cuenta"].map(
                    (item) => (
                      <a
                        key={item}
                        href="#"
                        className="block rounded-lg px-3 py-2 text-sm font-semibold leading-6 text-gray-900 hover:bg-gray-50"
                      >
                        {item}
                      </a>
                    )
                  )}
                </div>
              </PopoverPanel>
            </Popover>
          </PopoverGroup>

          <>
            {/* Menú móvil */}
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

            {/* Menú móvil*/}
            {mobileMenuOpen && (
              <div className="lg:hidden">
                <div
                  className="fixed inset-0 z-10 bg-gray-900/50"
                  onClick={() => setMobileMenuOpen(false)}
                ></div>
                <div className="fixed inset-y-0 right-0 z-10 w-full overflow-y-auto bg-white px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
                  <div className="flex items-center justify-between">
                    <a href="#" className="-m-1.5 p-1.5">
                      <span className="sr-only">Ferremas</span>
                      <div className="h-10 w-10 bg-white rounded-full flex items-center justify-center">
                        <span className="text-blue-600 font-bold">FM</span>
                      </div>
                    </a>
                    <button
                      type="button"
                      className="-m-2.5 rounded-md p-2.5 text-gray-700"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      <span className="sr-only">Cerrar menu</span>
                      <svg
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                  <div className="mt-6 flow-root">
                    <div className="-my-6 divide-y divide-gray-500/10">
                      <div className="space-y-2 py-6">
                        {/* Botón de Categorías (versión móvil) */}
                        <div className="w-full">
                          <button className="flex w-full bg-gray-100 items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                            Categorías
                            <ChevronDownIcon className="h-5 w-5 flex-none" />
                          </button>
                          <div className="mt-2 space-y-2 pl-5">
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
                                className="block rounded-md py-2 pl-3 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                {item}
                              </a>
                            ))}
                          </div>
                        </div>
                        <div>
                          <button className="flex w-full bg-gray-100 items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                            Hola, Inicia sesión
                            <ChevronDownIcon className="h-5 w-5 flex-none" />
                          </button>
                        </div>
                        <div className="mt-2 space-y-2 pl-5">
                          {["Iniciar sesión", "Crear cuenta", "Mi cuenta"].map(
                            (item) => (
                              <a
                                key={item}
                                href="#"
                                className="block rounded-md py-2 pl-3 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                              >
                                {item}
                              </a>
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </>

          <div className="flex items-center space-x-6">
            {/* Botón Iniciar sesión */}

            {/* Botón Carrito */}
            <div className="flex items-center space-x-1 cursor-pointer">
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
              <span className="text-sm ">Mis compras</span>
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-4 py-3 text-sm">
          <div className="flex items-center space-x-1 cursor-pointer">
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
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            {/* ubicación */}
            <span>Ingresa tu ubicación</span>
            {/* experto */}
            <a className=" absolute right-20">Contacta a un experto</a>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
