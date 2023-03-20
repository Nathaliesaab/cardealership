import "./styles/style.css";
import React from "react";
import { Footer } from "./components/Footer";
import { Navbar } from "./components/NavBar";
import AppRoutes from "./AppRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppProvider } from "./providers/AppProvider";
import { BrowserRouter, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <ToastContainer theme="colored" position="top-right"></ToastContainer>
      <BrowserRouter>
        <AppProvider>
          <Navbar />
          <Routes>
            {AppRoutes.map((route, index) => {
              const { element, ...rest } = route;
              return <Route key={index} {...rest} element={element} />;
            })}
          </Routes>
          <Footer />
        </AppProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
