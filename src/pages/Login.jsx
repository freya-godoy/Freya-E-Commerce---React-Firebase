import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebaseConfig";
import { useNavigate, Link } from "react-router-dom";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // guarda mensaje de error
  const navigate = useNavigate();

  const handleLogin = async (e) => {

    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Si funciona, redirigimos
      navigate("/");
    } catch (err) {
      console.error("Error completo:", err); // Muestra el error técnico en consola
      
      // Traducimos el error de Firebase a español para el usuario
      if (err.code === "auth/invalid-credential" || err.code === "auth/wrong-password") {
        setError("El correo o la contraseña son incorrectos.");
      } else if (err.code === "auth/user-not-found") {
        setError("No existe un usuario con este correo.");
      } else if (err.code === "auth/invalid-api-key") {
        setError("Error de configuración: Falta la API Key en el archivo .env");
      } else {
        setError("Ocurrió un error: " + err.message);
      }
    }
  };

  return (
    <div className="auth-container">
      <h2>Iniciar Sesión</h2>
      
      {/* Aquí mostramos el error en rojo si existe */}
      {error && (
        <p style={{ 
            backgroundColor: '#ffdddd', 
            color: 'red', 
            padding: '10px', 
            borderRadius: '5px',
            textAlign: 'center' 
        }}>
          {error}
        </p>
      )}

      <form onSubmit={handleLogin}>
        <input 
          type="email" 
          placeholder="Correo electrónico"
          value={email} onChange={(e) => setEmail(e.target.value)} required
        />
        <input 
          type="password" 
          placeholder="Contraseña"
          value={password} onChange={(e) => setPassword(e.target.value)} required
        />
        <button type="submit">Ingresar</button>
      </form>
      
      <p style={{marginTop: '1rem', textAlign: 'center'}}>
        ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
      </p>
    </div>
  );
}