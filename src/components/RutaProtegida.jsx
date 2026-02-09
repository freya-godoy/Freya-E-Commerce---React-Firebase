import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function RutaProtegida({ children }) {
  const { usuario, rol } = useAuth();

  if (!usuario) return <Navigate to="/login" />;
  if (rol !== "admin") return <Navigate to="/" />;

  return children;
}
