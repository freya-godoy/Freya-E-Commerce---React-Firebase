import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { usuario, rol, logout } = useAuth();

  return (
    <nav className="navbar">
      <Link to="/">Inicio</Link>

      {!usuario && (
        <>
          <Link to="/login">Login</Link>
          <Link to="/register">Registro</Link>
        </>
      )}

      {usuario && (
        <>
          {rol === "admin" && (
            <Link to="/agregar">Agregar producto</Link>
          )}

          <button onClick={logout}>Cerrar sesión</button>
        </>
      )}
    </nav>
  );
}
