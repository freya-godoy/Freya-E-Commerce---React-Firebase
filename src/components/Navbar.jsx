import { Link } from "react-router-dom"; // sirve para navegar entre páginas sin que la pantalla se recargue
import { useCart } from "../context/CartContext"; // traemos la información del carrito (productos)
import { useAuth } from "../context/AuthContext"; // información del usuario (logueado / admin)

function Navbar() {
  // CONTEXTOS: Le pedimos datos específicos a nuestros "almacenes" globales
  const { cart } = useCart(); // obtenemos el array del carrito para saber su longitud (.length)
  const { usuario, rol, cerrarSesion } = useAuth(); // obtenemos quién es el usuario y la función para desloguear

  // dark - mode
  const toggleDarkMode = () => {
    document.body.classList.toggle("dark");
    // guarda la elección del usuario en la memoria del navegador (localStorage) (refresca la pagina y sig oscuro)
    localStorage.setItem(
      "darkMode",
      document.body.classList.contains("dark")
    );
  };

  return (
    <nav className="navbar">
      <h1 className="logo">MiEcommerce</h1>

      <div className="nav-links">
        {/* Link simple: Siempre visible para volver al inicio */}
        <Link to="/">Inicio</Link>

        {/* Si NO está logueada */}
        {!usuario && (
          <>
            {/* renderizado condicional: "si pasa esto, mostra esto" */}
            {/* SI NO HAY USUARIO: muestra los botones de entrada */}
            <Link to="/login" className="btn-outline">
              Iniciar sesión
            </Link>
            <Link to="/register" className="btn-primary">
              Registrarse
            </Link>
          </>
        )}

        {/* si es admin: permite subir productos */}
        {rol === "admin" && (
          <Link to="/agregar" className="btn-outline">
            Agregar producto
          </Link>
        )}

        {/* Si está logueada */}
        {usuario && (
          <button className="btn-outline" onClick={cerrarSesion}>
            Cerrar sesión
          </button>
        )}

        {/* button cambio de dark tema */}
        <button className="btn-outline" onClick={toggleDarkMode}>
          🌙
        </button>
        {/* Carrito: Muestra un número que se actualiza automáticamente con context */}
        <Link to="/carrito" className="cart-icon">
          🛒 {cart.length}
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
