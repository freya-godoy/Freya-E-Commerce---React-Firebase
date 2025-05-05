import { Link } from "react-router-dom";

export default function ProductCard({ product }) {
  return (
    <article aria-labelledby={`product-${product.id}-title`}>
      <div className="product-card">
        <img src={product.image} alt={product.title} aria-hidden="true" />
        <div className="product-card-content">
          <h3 id={`product-${product.id}-title`}>{product.name}</h3>
          <p aria-label={`Precio: ${product.price.toFixed(2)} dólares`}>
            ${product.price.toFixed(2)}
          </p>
          <Link
            to={`/product/${product.id}`}
            aria-label={`Ver detalles de ${product.name}`}
          >
            Ver detalle
          </Link>
        </div>
      </div>
    </article>
  );
}
