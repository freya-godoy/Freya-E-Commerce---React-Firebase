import { createContext, useContext, useState } from "react";
//CREACIÓN DEL CONTEXTO: Creamos el "espacio" o "nube" donde guardaremos los datos del carrito.
const CartContext = createContext();
//HOOK PERSONALIZADO: Un atajo para que cualquier componente (como el NavBar o el Cart)
// pueda entrar a la "nube" del carrito fácilmente usando useCart().
export const useCart = () => useContext(CartContext);
//EL PROVEEDOR (PROVIDER): Es el componente que envuelve a toda tu aplicación.
export const CartProvider = ({ children }) => {
  // ESTADO: 'cart' es la lista (array) de productos. Empieza vacía [].
  const [cart, setCart] = useState([]);
  // FUNCIÓN: AGREGAR AL CARRITO
  // Recibe un 'product' y lo guarda en la lista.
  const addToCart = (product) => {
    // Usamos el callback (prev) para asegurarnos de no perder lo que ya teníamos.
    // Creamos un nuevo array con todo lo anterior (...prev) y sumamos el nuevo producto.
    setCart((prev) => [...prev, product]);
  };
  // FUNCIÓN: ELIMINAR DEL CARRITO
  // Recibe el ID del producto que queremos quitar.
  const removeFromCart = (productId) => {
    // .filter() crea una lista nueva donde solo se quedan los productos 
    // que NO tengan el ID que queremos borrar.
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
    //RENDERIZADO:
  // Pasamos los datos (cart) y las funciones (addToCart, removeFromCart) 
  // para que todos los hijos (children) puedan usarlos.
  };
  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};