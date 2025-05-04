const Products = () => {
  return (
    <div className="mt-14 mb-12">
      <div className="container mx-auto px-4">
        {/*Seccion principal*/}
        <div className="text-center mb-10 max-w-2xl mx-auto">
          <h1 className="text-3xl font-bold">Productos destacadas</h1>
          <p className="text-xs text-gray-400">!Lo más buscado!</p>
        </div>
        {/* Secci´on categorias */}
        <div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4"></div>
        </div>
      </div>
    </div>
  );
};
export default Products;
