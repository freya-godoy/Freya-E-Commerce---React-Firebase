import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebaseConfig";

export default function Agregar() {
  // ESTADOS LOCALES: Guardan lo que el usuario escribe antes de mandarlo a Firebase.
  const [titulo, setTitulo] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null); // Aquí vive el archivo de la imagen seleccionada.

  const [cargando, setCargando] = useState(false); // Para deshabilitar el botón y evitar múltiples envíos.
  const navigate = useNavigate(); // Inicializamos la función de navegación.

  // FUNCIÓN DE ENVÍO: Se dispara al dar clic en "Publicar Producto".

  const manejarEnvio = async (e) => {
    e.preventDefault(); // Evita que la página se recargue (comportamiento por defecto de HTML)

    // Validación de seguridad: si no hay foto, frenamos todo

    if (!imagen) {
      alert("selecciona una imagen.");
      return;
    }

    setCargando(true); // Bloqueamos el botón (pone el estado en "Publicando...").

    try {
      // subir imagen a Storage
      // Date.now() para que el nombre sea único
      const subirImagen = ref(storage, `productos/${Date.now()}_${imagen.name}`);
      await uploadBytes(subirImagen, imagen);
      const urlImagen = await getDownloadURL(subirImagen);

      // guardar datos en Firestore
      await addDoc(collection(db, "productos"), {
        title: titulo,
        price: Number(precio),
        description: descripcion,
        image: urlImagen,
        createdAt: new Date()
      });

      alert("¡Producto agregado con éxito!");
      navigate("/"); // inicio
    } catch (error) {
      console.error("Error:", error);
      alert("Hubo un error al subir el producto.");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="contenedor-auth">
      <h2 style={{ textAlign: "center", color: "var(--color-primario)" }}>
        Nuevo Producto
      </h2>

      <form onSubmit={manejarEnvio}>
        <div className="form-control">
          <label style={{ display: "block", marginBottom: "0.5rem" }}>Nombre</label>
          <input
            type="text"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
            style={{ width: "100%", border: "none", outline: "none" }}
          />
        </div>

        <div className="form-control">
          <label style={{ display: "block", marginBottom: "0.5rem" }}>Precio</label>
          <input
            type="number"
            value={precio}
            onChange={(e) => setPrecio(e.target.value)}
            required
            style={{ width: "100%", border: "none", outline: "none" }}
          />
        </div>

        <div className="form-control">
          <label style={{ display: "block", marginBottom: "0.5rem" }}>Descripción</label>
          <textarea
            rows="3"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
            style={{ width: "100%", border: "none", outline: "none", resize: "none" }}
          />
        </div>

        <div className="form-control">
          <label style={{ display: "block", marginBottom: "0.5rem" }}>Imagen</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImagen(e.target.files[0])}
            required
          />
        </div>

        <button type="submit" className="btn-submit" disabled={cargando}>
          {cargando ? "Publicando..." : "Publicar Producto"}
        </button>
      </form>
    </div>
  );
}