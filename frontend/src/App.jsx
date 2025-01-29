import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Homepage from "./components/HomePage";
import HeroSection from "./components/HeroSection";
import Footer from "./components/Footer";
import ProfilePage from "./components/ProfilePage";

function HomeLayout() {
  return (
    <div className="bg-gray-950">
      <HeroSection />
      <Homepage />
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-950 flex flex-col">
        <div className="flex-grow">
          <Routes>
            <Route path="/" element={<Navigate to="/ecommerce-follow-along" replace />} />
            <Route path="/ecommerce-follow-along" element={<Login />} />
            <Route path="/ecommerce-follow-along/home" element={<HomeLayout />} />
            <Route path="/ecommerce-follow-along/profile" element={<ProfilePage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </Router>
  );
}