import Header from "./components/Header";
import Products from "./components/Products";
import Login from "./pages/login";
import Cart from "./pages/CartPage";
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
          <Route path="/CartPage" element={<Cart />} />
        </Routes>
      </BrowserRouter>
    </CarritoProvider>
  );
}

export default App;
