import React from "react";
//Je dois appeler ici le composant "dasboard" de la page dashboard qui contiendra le mock de l'API

import { BrowserRouter, Routes, Route } from "react-router-dom";
import BarChartUser from "./components/BarChartUser";
import Dashboard from "./pages/dashbord/DashboardUser";
import Home from "./pages/home/Home";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/home/dashboard/:userId" element={<Dashboard />} />
        <Route path="/user/:id/activity" element={<BarChartUser />} />
        http://localhost:3000/user/12/activity
        {/* <Route path="*" element={<NotFoundPage />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
