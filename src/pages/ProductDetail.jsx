import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import productsData from "../data/products.json";

export default function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = productsData.find((p) => p.id === parseInt(id));
    setProduct(foundProduct);
  }, [id]);

  if (!product) return <div className="loading">Cargando producto...</div>;

  return (
    <main> {/* Agregamos main para identificar el contenido principal */}
    <div className="product-detail" aria-labelledby="product-title">
      <img 
        src={product.image} 
        alt="" 
        aria-hidden="true" // Decorativa
      />
      <h1 id="product-title">{product.name}</h1>
      <p className="description">{product.description}</p>
      <p 
        className="price" 
        aria-label={`Precio: ${product.price.toFixed(2)} dólares`}
      >
        ${product.price.toFixed(2)}
      </p>
      <button 
        onClick={() => alert("Compra simulada")}
        aria-label={`Comprar ${product.name}`}
      >
        Comprar
      </button>
    </div>
  </main>
  );
}
