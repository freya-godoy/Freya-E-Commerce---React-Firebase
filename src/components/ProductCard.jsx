import { Link } from "react-router-dom";

export default function ProductCard({ producto }) {
  return (
    <article className="tarjeta-producto">
      <div className="imagen-contenedor">
        {/* propiedades de firebase */}
        <img 
          src={producto.image} 
          alt={producto.title} 
          className="imagen-producto" 
        />
      </div>

      <div className="info-producto">
        <h3 className="titulo-producto">{producto.title}</h3>
        
        <p className="precio-producto">
          $ {Number(producto.price).toLocaleString()}
        </p>
        
        <Link to={`/product/${producto.id}`} className="btn-ver-mas">
          Ver Detalles
        </Link>
      </div>
    </article>
  );
}