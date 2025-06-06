import { useEffect, useState } from "react";
import { db } from "../firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

const Home = () => {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "productos"));
        const lista = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setProductos(lista);
      } catch (error) {
        console.error("Error al obtener productos:", error);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, []);

  return (
    <div className="products-container">
      <h1>Productos</h1>
      {cargando ? (
        <p className="loading">Cargando productos...</p>
      ) : (
        <div className="products-grid">
          {productos.map(producto => (
            <div className="product-card" key={producto.id}>
              <img src={producto.image} alt={producto.title} />
              <div className="product-card-content">
                <h3>{producto.title}</h3>
                <p>${producto.price}</p>
                <Link to={`/product/${producto.id}`}>Ver detalle</Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;