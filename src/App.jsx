import Header from "./components/Header";
import Products from "./components/Products";
import Login from "./pages/login";
import Cart from "./pages/CartPage";
import Register from "./pages/Register";
import CuentaPage from "./pages/cuentapage";
import WebpayReturn from "./pages/WebPayReturn";
import { CarritoProvider } from "./components/Carrito";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

function App() {
  return (
    <CarritoProvider>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cuentapage" element={<CuentaPage />} />
          <Route path="/CartPage" element={<Cart />} />
          <Route path="/webpay-return" element={<WebpayReturn />} />
        </Routes>
      </BrowserRouter>
    </CarritoProvider>
  );
}

export default App;
