import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { db, storage } from "../firebase/firebaseConfig";

export default function AdminAgregarProducto() {
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null);
  const [cargando, setCargando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const manejarSubmit = async (e) => {
    e.preventDefault();

    if (!imagen) {
      setMensaje("Debes seleccionar una imagen");
      return;
    }

    try {
      setCargando(true);
      setMensaje("");

      // Subir imagen a Storage
      const imagenRef = ref(storage, `productos/${Date.now()}-${imagen.name}`);
      await uploadBytes(imagenRef, imagen);

      // Obtener URL de la imagen
      const urlImagen = await getDownloadURL(imagenRef);

      // Guardar producto en Firestore
      await addDoc(collection(db, "productos"), {
        nombre,
        precio: Number(precio),
        descripcion,
        imagen: urlImagen,
        creadoEn: new Date(),
      });

      // Limpiar formulario
      setNombre("");
      setPrecio("");
      setDescripcion("");
      setImagen(null);
      setMensaje("Producto agregado correctamente");
    } catch (error) {
      console.error(error);
      setMensaje("Error al agregar el producto");
    } finally {
      setCargando(false);
    }
  };

  return (
    <div style={{ maxWidth: "500px", margin: "0 auto" }}>
      <h2>Agregar nuevo producto</h2>

      <form onSubmit={manejarSubmit}>
        <input
          type="text"
          placeholder="Nombre del producto"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Precio"
          value={precio}
          onChange={(e) => setPrecio(e.target.value)}
          required
        />

        <textarea
          placeholder="Descripción"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
          required
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagen(e.target.files[0])}
          required
        />

        <button type="submit" disabled={cargando}>
          {cargando ? "Subiendo..." : "Agregar producto"}
        </button>
      </form>

      {mensaje && <p>{mensaje}</p>}
    </div>
  );
}
