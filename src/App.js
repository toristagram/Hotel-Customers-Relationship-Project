import React from "react";
import { Routes, Route } from "react-router-dom";
import { AuthContextProvider } from "./context/AuthContext";
import Login from "./pages/Login";
import MainLayout from "./pages/MainLayout";
import ProtectedRoute from "./components/ProtectedRoute";
import "./sass/main.scss";

function App() {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/mainLayout"
          element={
            
              <MainLayout />
            
          }
        />
      </Routes>
    </AuthContextProvider>
  );
}

export default App;
