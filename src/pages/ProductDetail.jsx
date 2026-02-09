import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerProductoPorId } from "../services/productsService";

export default function ProductDetail() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    obtenerProductoPorId(id)
      .then(setProducto)
      .finally(() => setCargando(false));
  }, [id]);

  if (cargando) return <p>Cargando producto...</p>;
  if (!producto) return <p>Producto no encontrado</p>;

  return (
    <div className="product-detail">
      <img src={producto.image} alt={producto.title} />
      <h1>{producto.title}</h1>
      <p>{producto.description}</p>
      <p>${producto.price}</p>
      <button>Comprar</button>
    </div>
  );
}
