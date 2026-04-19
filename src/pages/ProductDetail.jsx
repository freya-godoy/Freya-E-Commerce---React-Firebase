import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../firebaseConfig";
import { useEffect, useState } from "react";
import { useCart } from "../context/CartContext";


const ProductDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const docRef = doc(db, "productos", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() });
        }
      } catch (error) {
        console.error("Error al obtener producto", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Cargando producto...</p>;
  if (!product) return <p>Producto no encontrado</p>;

  return (
    <section className="detail-page">

      {/* Flecha volver */}
      <button
        className="btn-back"
        onClick={() => navigate(-1)}
      >
        ← Volver
      </button>

      <nav className="breadcrumbs">
        <span onClick={() => navigate("/")}>Inicio</span>
        <span>/</span>
        <span>Productos</span>
        <span>/</span>
        <span className="active">{product.title}</span>
      </nav>
      <button
        className="btn-primary"
        onClick={() => addToCart(product)}
      >
        Agregar al carrito
      </button>

      {/* Layout principal */}
      <div className="detail-container">
        <div className="detail-image-wrapper">
          <img
            src={product.image}
            alt={product.title}
            className="detail-image"
          />
        </div>

        <div className="detail-info">
          <h1>{product.title}</h1>
          <p>{product.description}</p>

          <div className="price-section">
            <span className="detail-price">${product.price}</span>
            <button className="btn-primary">Comprar</button>
          </div>

        </div>
      </div>
    </section>
  );
};

export default ProductDetail;
