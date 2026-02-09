import { collection, addDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import products from "./products.json";

export const cargarProductos = async () => {
  try {
    for (const product of products) {
      await addDoc(collection(db, "productos"), product);
    }
    alert("Productos cargados correctamente");
  } catch (error) {
    console.error(error);
  }
};
