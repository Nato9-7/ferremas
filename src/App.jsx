import Header from "./components/Header";
import Products from "./components/Products";
import Login from "./pages/login"; 
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
