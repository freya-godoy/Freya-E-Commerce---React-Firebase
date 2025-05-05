import { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import productsData from "../data/products.json";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setProducts(productsData);
      setLoading(false);
    }, 500);
  }, []);

  if (loading) return <div className="loading">Cargando productos...</div>;

  return (
    <div className="products-container">
      <h1>Nuestros Productos</h1>
      {loading ? (
        <p aria-live="polite">Cargando productos...</p>
      ) : (
        <section aria-labelledby="products-heading">
          <h2 id="products-heading" className="sr-only">
            Listado de productos
          </h2>
          <div className="products-grid" role="list">
            {products.map((product) => (
              <div key={product.id} role="listitem">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
