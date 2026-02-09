import { collection, getDocs, doc, getDoc, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";

// nombre de la colección
const COLECCION_PRODUCTOS = "productos";

// obtiene los productos
export const obtenerProductos = async () => {
  try {
    const referenciaColeccion = collection(db, COLECCION_PRODUCTOS);
    const respuesta = await getDocs(referenciaColeccion);

    return respuesta.docs.map((documento) => ({
      id: documento.id,
      ...documento.data()
    }));
  } catch (error) {
    console.error("Error al obtener productos:", error);
    throw error;
  }
};

// buscar producto por id
export const obtenerProductoPorId = async (id) => {
  try {
    const referenciaDocumento = doc(db, COLECCION_PRODUCTOS, id);
    const documento = await getDoc(referenciaDocumento);

    if (!documento.exists()) {
      return null; // si no existe
    }

    return {
      id: documento.id,
      ...documento.data()
    };
  } catch (error) {
    console.error("Error al obtener el producto:", error);
    throw error;
  }
};

// guardar  nuevo producto
export const guardarProducto = async (datosProducto) => {
  try {
    const referenciaColeccion = collection(db, COLECCION_PRODUCTOS);
    const nuevoProducto = {
      ...datosProducto,
      fechaCreacion: new Date()
    };

    const respuesta = await addDoc(referenciaColeccion, nuevoProducto);
    return respuesta.id;
  } catch (error) {
    console.error("Error al guardar producto:", error);
    throw error;
  }
};