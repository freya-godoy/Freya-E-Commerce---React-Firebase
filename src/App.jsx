import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProductDetail from "./pages/ProductDetail";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/product/:id" element={<ProductDetail />} />
          </Routes>
        </main>
        <footer>
          <p>© 2025 E-commerce Curso React</p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;