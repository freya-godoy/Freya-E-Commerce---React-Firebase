import { createContext, useContext, useEffect, useState } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";// funciones de Firebase
import { auth, db } from "../firebaseConfig";
import { doc, getDoc } from "firebase/firestore"; // herramientas para buscar documentos específicos en la base de datos

const AuthContext = createContext();

export function AuthProvider({ children }) {
  // asignamos las variables
  const [usuario, setUsuario] = useState(null); // guardo los datos básicos
  const [rol, setRol] = useState(null); // permiso (admin o user) vienen de la base de datos
  const [loading, setLoading] = useState(true); // controla que la app no se muestre hasta saber si el usuario está logueado

  // se ejecuta una sola vez cuando se abre la app 
  useEffect(() => {
    // 'onAuthStateChanged' observador que detecta cambios en el estado del usuario (inicia/cierra sesión) en tiempo real
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // si hay usuario guardo su informacion 
        setUsuario(user);

        //Creamos la referencia "ref": indicamos que queremos el documento con el ID del usuario dentro de la colección "usuarios"
        const ref = doc(db, "usuarios", user.uid);
        //Realizamos la petición asíncrona: "esperamos" (await) a que Firestore nos devuelva la "foto" (snap) de ese documento
        const snap = await getDoc(ref); // pide el documento 

        if (snap.exists()) {
          // Si el documento existe, sacamos el campo "rol" (admin/user).
          setRol(snap.data().rol);
        } else {
          // Si no existe en la base de datos, por defecto le damos rol de "user".
          setRol("user");
        }
      } else {
        // SI NO HAY USUARIO: Limpiamos todo para que la app sepa que está "fuera".
        setUsuario(null);
        setRol(null);
      }
      // IMPORTANTE: Ya terminamos de revisar, así que dejamos de "cargar".
      setLoading(false);
    });
    // Limpieza: Cuando el componente se destruye, le decimos a onAuthStateChanged que deje de vigilar.
    return () => unsubscribe();
    return () => unsubscribe();
  }, []);
  // FUNCIÓN PARA SALIR: Una herramienta que compartimos a toda la app.
  const cerrarSesion = async () => {
    await signOut(auth);
    setUsuario(null);
    setRol(null);
  };
  // (renderizado) Mientras 'loading' sea true, no mostramos nada (para evitar que se vea el login un segundo antes que el home).
  return (
    <AuthContext.Provider value={{ usuario, rol, cerrarSesion }}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
//HOOK PERSONALIZADO: El "atajo" para que cualquier componente use estos datos fácilmente.
export const useAuth = () => useContext(AuthContext);
