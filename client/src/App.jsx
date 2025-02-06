import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import SportsShoesPage from './pages/SportsShoesPage';
import LifestyleShoesPage from './pages/LifestyleShoesPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import AuthGuard from './components/AuthGuard';

const ProtectedRoute = ({ children }) => {
    // Get auth status from localStorage
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    return children;
};

const PublicRoute = ({ children }) => {
    // Get auth status from localStorage
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return children;
};

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));
    const location = useLocation();

    useEffect(() => {
        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);

    const handleSignOut = () => {
        setIsAuthenticated(false);
    };

    // Define routes where Header and Footer should be hidden
    const hideHeaderFooterRoutes = ['/login', '/signup'];

    // Check if the current route is in the hideHeaderFooterRoutes array
    const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(location.pathname);

    return (
        <div className="min-h-screen flex flex-col bg-white">
            {/* Conditionally render Header */}
            {!shouldHideHeaderFooter && <Header isSignedIn={isAuthenticated} />}

            <main className="flex-grow container mx-auto px-4 py-8">
                <Routes>
                    {/* Public Routes */}
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/sports" element={<SportsShoesPage />} />
                    <Route path="/lifestyle" element={<LifestyleShoesPage />} />
                    
                    {/* Authentication Routes */}
                    <Route
                        path="/login"
                        element={
                            <PublicRoute>
                                <LoginPage setIsAuthenticated={setIsAuthenticated} />
                            </PublicRoute>
                        }
                    />

                    <Route
                        path="/signup"
                        element={
                            <PublicRoute>
                                <SignupPage setIsAuthenticated={setIsAuthenticated} />
                            </PublicRoute>
                        }
                    />
                    
                    {/* Protected Routes */}
                    <Route
                        path="/profile"
                        element={
                            <AuthGuard>
                                <ProfilePage onSignOut={handleSignOut} />
                            </AuthGuard>
                        }
                    />
                    <Route
                        path="/add-product"
                        element={
                            <ProtectedRoute>
                                <ProfilePage />
                            </ProtectedRoute>
                        }
                    />
                    
                    {/* Fallback Route */}
                    <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
            </main>

            {/* Conditionally render Footer */}
            {!shouldHideHeaderFooter && <Footer />}
        </div>
    );
};

const AppWrapper = () => (
    <Router>
        <App />
    </Router>
);

export default AppWrapper;