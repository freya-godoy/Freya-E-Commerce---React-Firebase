import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetail from "./pages/ProductDetail";
import Agregar from "./pages/Agregar";
import RutaProtegida from "./components/RutaProtegida";
import { AuthProvider } from "./context/AuthContext";
import Cart from "./pages/Cart";

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <div className="app">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/carrito" element={<Cart />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/product/:id" element={<ProductDetail />} />

              <Route
                path="/agregar"
                element={
                  <RutaProtegida>
                    <Agregar />
                  </RutaProtegida>
                }
              />
            </Routes>
          </main>

          <footer className="footer">
            <div className="footer-content">
              <p>© 2026 · Mi Ecommerce |  Proyecto académico · UTN</p>
            </div>
          </footer>
        </div>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
