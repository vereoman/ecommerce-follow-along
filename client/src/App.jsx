import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import ProfilePage from './pages/ProfilePage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProductPage from './pages/ProductPage';
import SearchResults from './components/SearchResults';
import BasketPage from './pages/BasketPage';
import FavoritesPage from './pages/FavoritesPage';

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const PublicRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    localStorage.getItem('isAuthenticated') === 'true'
  );
  const location = useLocation();
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsAuthenticated(!!token);
  }, []);

  const handleSignOut = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('isAuthenticated');
  };

  const hideHeaderFooterRoutes = ['/login', '/signup'];
  const shouldHideHeaderFooter = hideHeaderFooterRoutes.includes(location.pathname);
  const isProductPage = location.pathname.startsWith('/product/');

  const handleSearch = async (query) => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/products/search?q=${encodeURIComponent(query)}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error searching products:', error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {!shouldHideHeaderFooter && (
        <Header
          isSignedIn={isAuthenticated}
          onSearch={handleSearch}
          searchResults={searchResults}
          isLoading={isLoading}
        />
      )}
      {!shouldHideHeaderFooter && <div className="mb-8"></div>}
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/search" element={<SearchResults />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />

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

          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <ProfilePage onSignOut={handleSignOut} />
              </ProtectedRoute>
            }
          />
          <Route
            path="/basket"
            element={
              <ProtectedRoute>
                <BasketPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback Route */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      {!shouldHideHeaderFooter && !isProductPage && <Footer />}
    </div>
  );
};

const AppWrapper = () => (
  <Router>
    <App />
  </Router>
);

export default AppWrapper;