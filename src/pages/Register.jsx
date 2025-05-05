import { Link } from "react-router-dom";

export default function Register() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Registro simulado - Sin backend");
  };

  return (
    <div className="auth-container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="Nombre completo" required />
        <input type="email" placeholder="Email" required />
        <input type="password" placeholder="Contraseña" required />
        <button type="submit">Registrarse</button>
      </form>
      <p>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
      </p>
    </div>
  );
}