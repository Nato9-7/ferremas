import Header from "./components/Header";
import Login from "./pages/login";
import Cart from "./pages/CartPage";
import Footer from "./components/Footer";
import Register from "./pages/Register";
import CuentaPage from "./pages/cuentapage";
import WebpayReturn from "./pages/WebPayReturn";
import { CarritoProvider } from "./components/Carrito";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import MainPage from "./pages/MainPage";
import Catalogo from "./pages/Catalogo";

function App() {
  return (
    <CarritoProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} /> {/* Página principal */}
          <Route path="/catalogo" element={<Catalogo />} /> {/* Catálogo */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cuentapage" element={<CuentaPage />} />
          <Route path="/CartPage" element={<Cart />} />
          <Route path="/webpay-return" element={<WebpayReturn />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </CarritoProvider>
  );
}

export default App;
