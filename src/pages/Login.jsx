import { Link } from "react-router-dom";

export default function Login() {
  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Login simulado - Sin backend");
  };

  return (
    <div className="auth-container" role="form" aria-labelledby="login-heading">
      <h2 id="login-heading">Iniciar Sesión</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email" className="sr-only">
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="Email"
          required
          aria-required="true"
        />

        <label htmlFor="password" className="sr-only">
          Contraseña
        </label>
        <input
          id="password"
          type="password"
          placeholder="Contraseña"
          required
          aria-required="true"
        />

        <button type="submit">Ingresar</button>
      </form>
      <p>
        ¿No tienes cuenta? <Link to="/register">Regístrate aquí</Link>
      </p>
    </div>
  );
}
