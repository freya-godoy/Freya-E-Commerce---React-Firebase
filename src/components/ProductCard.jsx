import { Link } from "react-router-dom"; // Importamos Link para poder navegar a la página de detalles sin recargar la web.

// 2. DEFINICIÓN DEL COMPONENTE
// Usamos "destructuring" en los parámetros para recibir directamente el objeto { producto }.
export default function ProductCard({ producto }) {
  return (
    // <article> es una etiqueta semántica de HTML para contenido que tiene sentido por sí mismo (como una tarjeta).
    <article className="tarjeta-producto">
      {/* SECCIÓN DE LA IMAGEN */}
      <div className="imagen-contenedor">
        {/* propiedades de firebase */}
        <img
          src={producto.image}
          alt={producto.title}
          className="product-image"
        />
      </div>
      {/* INFORMACIÓN */}
      <div className="info-producto">
        <h3 className="titulo-producto">{producto.title}</h3>

        <p className="precio-producto">
          $ {Number(producto.price).toLocaleString()}
        </p>
        {/* BOTÓN DE NAVEGACIÓN
          to={`/product/${producto.id}`}: 
          Usamos "template literals" (las comillas invertidas) para crear una URL dinámica.
          Si el ID del producto es 'ABC', el link nos llevará a /product/ABC.
        */}
        
        <Link to={`/product/${producto.id}`} className="btn-ver-mas">
          Ver Detalles
        </Link>
      </div>
    </article>
  );
}