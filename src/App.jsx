import Header from "./components/Header";
import Products from "./components/Products";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";

function App() {
  return (
    <div>
      <Header />
      <Products />
    </div>
  );
}

export default App;
