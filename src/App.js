import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashbord/DashboardUser";
import Home from "./pages/home/Home";
import NotFoundPage from "./pages/Error/NotFoundPage";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Redirection vers la page d'accueil */}
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to="/home" />} />
        {/* Routes de l'application */}
        <Route path="/home/dashboard/:userId" element={<Dashboard />} />
        <Route path="/notFoundPage" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
