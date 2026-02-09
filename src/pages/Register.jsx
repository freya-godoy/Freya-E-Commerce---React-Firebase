import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Necesarios para guardar el rol
import { auth, db } from "../firebaseConfig"; //
import { useNavigate, Link } from "react-router-dom";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");

    try {
      // 1. Crear usuario en Auth
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // 2. Crear documento en Firestore con rol "user" por defecto
      // Usamos setDoc con el UID del usuario para que coincidan
      await setDoc(doc(db, "usuarios", user.uid), {
        email: user.email,
        rol: "user", // Por defecto nadie es admin
        uid: user.uid
      });

      alert("Usuario registrado con éxito");
      navigate("/"); // Redirigir al home
    } catch (err) {
      console.error(err);
      setError("Error al registrar: " + err.message);
    }
  };

  return (
    <div className="auth-container">
      <h2>Crear Cuenta</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={handleRegister}>
        <input 
          type="email" 
          placeholder="Correo electrónico"
          value={email} onChange={(e) => setEmail(e.target.value)} required 
        />
        <input 
          type="password" 
          placeholder="Contraseña (mínimo 6 caracteres)"
          value={password} onChange={(e) => setPassword(e.target.value)} required 
        />
        <button type="submit">Registrarse</button>
      </form>
      <p>¿Ya tienes cuenta? <Link to="/login">Ingresa aquí</Link></p>
    </div>
  );
}