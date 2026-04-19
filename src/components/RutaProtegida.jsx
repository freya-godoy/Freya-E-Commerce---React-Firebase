import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// el componente recibe 'children', que es todo lo que esté envuelto dentro de <RutaProtegida> en App.jsx.
export default function RutaProtegida({ children }) {
  const { usuario, rol } = useAuth();

  // PRIMER FILTRO: ¿Está logueado?
  // Si 'usuario' es null, significa que no ha iniciado sesión.
  // Entonces lo llevamos a la página de Login.
  if (!usuario) return <Navigate to="/login" />;

  // SEGUNDO FILTRO: ¿Es administrador?
  // Si el usuario existe pero su rol NO es "admin", no tiene permiso para estar aquí
  // Lo mandamos al Inicio (/) para que no vea cosas que no debe
  if (rol !== "admin") return <Navigate to="/" />;

  // SI PASÓ TODOS LOS FILTROS:
  // Si llegó hasta aquí, es porque hay usuario y es admin. 
  // Entonces lo dejamos pasar y mostramos el contenido (children).
  return children;
}
