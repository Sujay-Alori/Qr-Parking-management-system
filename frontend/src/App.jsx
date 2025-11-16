import React, { useState, useEffect } from 'react';
import Auth from './components/Auth';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import Navbar from './components/Navbar';
import LoadingOverlay from './components/LoadingOverlay';
import { authAPI } from './services/api';

function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');

    if (token && storedUser) {
      try {
        const response = await authAPI.verify();
        setUser(response.data.user);
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        setUser(null);
      }
    }

    setLoading(false);
  };

  const handleLogin = (userData, token) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(userData));
    setUser(userData);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
  };

  if (loading) {
    return <LoadingOverlay />;
  }

  return (
    <div className="App min-h-screen bg-gray-50">
      {isLoading && <LoadingOverlay />}
      {user ? (
        <>
          <Navbar user={user} onLogout={handleLogout} />
          {user.role === 'admin' ? (
            <AdminDashboard setIsLoading={setIsLoading} />
          ) : (
            <UserDashboard setIsLoading={setIsLoading} />
          )}
        </>
      ) : (
        <Auth onLogin={handleLogin} setIsLoading={setIsLoading} />
      )}
    </div>
  );
}

export default App;

