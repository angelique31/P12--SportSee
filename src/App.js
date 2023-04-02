import React from "react";
import { HashRouter, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/dashbord/DashboardUser";
import Home from "./pages/home/Home";
import NotFoundPage from "./pages/Error/NotFoundPage";

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/home/dashboard/:userId" element={<Dashboard />} />
        <Route path="/notFoundPage" element={<NotFoundPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  );
};

export default App;
