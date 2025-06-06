import React from "react";
import { cargarProductos } from "../data/cargarProductos";

function Agregar() {
  const handleClick = () => {
    cargarProductos();
  };

  return (
    <div style={{ padding: "2rem" }}>
      <h1>Cargar productos a Firestore</h1>
      <button onClick={handleClick}>Cargar</button>
    </div>
  );
}

export default Agregar;