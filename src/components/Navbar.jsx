import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <header role="banner">
      <nav aria-label="Navegación principal">
        <Link to="/" aria-current="page">
          Inicio
        </Link>
        <Link to="/login">Login</Link>
        <Link to="/register">Registro</Link>
      </nav>
    </header>
  );
}
