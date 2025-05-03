
import './App.css'

function MyButton() {
  return (
    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
      Soy un botón
    </button>
  );
}

export default function MyApp() {
  return (
    <div>
      <h1 >Bienvenido a mi aplicación</h1>
      <MyButton />
    </div>
  );
}
