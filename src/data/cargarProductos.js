import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import products from "../data/products.json" assert { type: "json" };

export const cargarProductos = async () => {
  try {
    for (let prod of products) {
      await addDoc(collection(db, "productos"), prod);
    }
    alert("Productos cargados con éxito");
  } catch (error) {
    console.error("Error al cargar productos:", error);
  }
};
