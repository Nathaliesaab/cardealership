import "./styles/style.css";
import React from "react";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/NavBar";
import AppRoutes from "./AppRoutes";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Navbar />
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
