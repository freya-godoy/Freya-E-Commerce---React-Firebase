import { useState } from "react";
// Firestore: para guardar los datos del producto (texto, precio, url de imagen)
import { collection, addDoc } from "firebase/firestore";
// Storage: para subir el archivo físico de la imagen
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
// Configuración: traemos la conexión a la base de datos y al almacenamiento
import { db, storage } from "../firebase/firebaseConfig";

export default function AdminAgregarProducto() {
  // ESTADOS: Para capturar lo que el usuario escribe en el formulario
  const [nombre, setNombre] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState(null); // Aquí guardamos el archivo de la imagen
  const [cargando, setCargando] = useState(false); // Para mostrar un mensaje de "subiendo..."
  const [mensaje, setMensaje] = useState(""); // Para avisar si salió todo bien o mal

  // FUNCIÓN PRINCIPAL: Se activa al hacer clic en el botón de "Agregar"

  const manejarSubmit = async (e) => {
    e.preventDefault(); // Evita que la página se recargue

    // Validación simple: si no hay imagen, no seguimos
    if (!imagen) {
      setMensaje("Debes seleccionar una imagen");
      return;
    }

    try {
      setCargando(true);
      setMensaje("");

      // SUBIR LA IMAGEN A FIREBASE STORAGE
      // Creamos una "dirección" única para la imagen usando la fecha actual para que no se repitan nombres
      const imagenRef = ref(storage, `productos/${Date.now()}-${imagen.name}`);
      // Subimos el archivo a esa dirección
      await uploadBytes(imagenRef, imagen);
      // Obtener URL de la imagen
      // Storage nos devuelve una URL pública para que podamos ver la foto en la web
      const urlImagen = await getDownloadURL(imagenRef);

      // Guardar producto en Firestore
      // Creamos un documento en la colección "productos" con los datos del form + la URL de la foto
      await addDoc(collection(db, "productos"), {
        nombre,
        precio: Number(precio), // Convertimos el texto del input a número
        descripcion,
        imagen: urlImagen, // Guardamos el link que obtuvimos en el PASO B
        creadoEn: new Date(), // Fecha de creación
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
        {/* Los 'onChange' van actualizando los estados arriba creados */}
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
        {/* Input especial para archivos: tomamos el primer archivo seleccionado [0] */}
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
