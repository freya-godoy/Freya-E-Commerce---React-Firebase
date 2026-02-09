import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard"
import { obtenerProductos } from "../services/productsService";

export default function Home() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  useEffect(() => {
    const cargarDatos = async () => {
      try {
        const datos = await obtenerProductos();
        setProductos(datos);
      } catch (error) {
        console.error("Error cargando productos:", error);
      } finally {
        setCargando(false);
      }
    };

    cargarDatos();
  }, []);

  if (cargando) {
    return <p style={{ textAlign: "center", marginTop: "2rem" }}>Cargando catálogo...</p>;
  }

  return (
    <div className="contenedor-productos">
      <h2 style={{ textAlign: "center", margin: "2rem 0", color: "var(--color-primario)" }}>
        Nuestros Productos
      </h2>

      {productos.length === 0 ? (
        <p style={{ textAlign: "center" }}>No se encontraron productos.</p>
      ) : (
        <div className="grid-productos">
          {productos.map((prod) => (
            <ProductCard key={prod.id} producto={prod} />
          ))}
        </div>
      )}
    </div>
  );
}