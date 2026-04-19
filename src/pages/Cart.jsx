import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";

const Cart = () => {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return <p style={{ padding: "2rem" }}>El carrito está vacío</p>;
  }

  return (
    <div className="carrito-container">
      <h2>Tu carrito</h2>
      {/* Flecha volver */}
      <button
        className="btn-back"
        onClick={() => navigate(-1)}
      >
        ← Volver
      </button>

      <nav className="breadcrumbs">
        <span onClick={() => navigate("/")} style={{ cursor: 'pointer' }}>Inicio</span>
        <span> / </span>
        <span>Productos</span>
      </nav>
      {cart.map((item, index) => (
        // Usamos index solo si el ID se repite para evitar el error de keys
        <div key={`${item.id}-${index}`} className="carrito-item">
          <p><strong>{item.title}</strong></p>
          <p>${item.price}</p>

          <button
            className="btn-outline"
            onClick={() => {
              if (typeof removeFromCart === 'function') {
                removeFromCart(item.id);
              } else {
                console.error("Error: removeFromCart no llegó al componente");
              }
            }}
          >
            Eliminar
          </button>
        </div>
      ))}
    </div>
  );
};

export default Cart;
