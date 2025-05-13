import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import CatalogoPagina from "./pages/CatalogoPagina";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<div className="text-center mt-10">Página de inicio</div>} />
        <Route path="/catalogo" element={<CatalogoPagina />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
