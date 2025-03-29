import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import App from "./App";
import Battle from "./Battle";
import MapMaker from "./MapMaker";
import Inside from "./Inside";

const AppRoutes = () => (
    <Router>
        <Routes>
            <Route path="/battle" element={<Battle />} />
            <Route path="/map" element={<MapMaker />} />
            <Route path="/" element={<App />} />
            <Route path="/inside/:interior" element={<Inside />} />
        </Routes>
    </Router>
);

export default AppRoutes;
