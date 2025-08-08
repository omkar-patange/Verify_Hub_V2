import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import ProtectedRoute from "./components/ProtectedRoute";
import GenerateCertificate from './pages/GenerateCertificate';
import VerifyCertificate from "./pages/VerifyCertificate";

function App() {
  const [auth, setAuth] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<AuthPage setAuth={setAuth} />} />

      <Route
        path="/home"
        element={
          <ProtectedRoute auth={auth}>
            <Home />
          </ProtectedRoute>
        }
      />
      <Route
        path="/generate-certificate"
        element={
          <ProtectedRoute auth={auth}>
            <GenerateCertificate />
          </ProtectedRoute>
        }
      />
      <Route
        path="/verify-certificate"
        element={
          <ProtectedRoute auth={auth}>
            <VerifyCertificate />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default App;
