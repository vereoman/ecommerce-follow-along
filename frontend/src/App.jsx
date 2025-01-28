import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Homepage from "./components/Homepage";
import Footer from "./components/Footer";
import ProfilePage from "./components/ProfilePage";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/ecommerce-follow-along" replace />} />
        <Route path="/ecommerce-follow-along" element={<Login />} />
        <Route path="/ecommerce-follow-along/home" element={<Homepage />} />
        <Route path="/ecommerce-follow-along/profile" element={<ProfilePage />} />
      </Routes>
      <Footer />
    </Router>
  );
}