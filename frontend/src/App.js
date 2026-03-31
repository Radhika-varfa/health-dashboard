import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  // Protected Route component
  const ProtectedRoute = ({ children }) => {
    if (!token) {
      return <Navigate to="/login" replace />;
    }
    return children;
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={
          token ? <Navigate to="/dashboard" replace /> : 
          <Login setToken={setToken} setUser={setUser} />
        } />
        <Route path="/register" element={
          token ? <Navigate to="/dashboard" replace /> : 
          <Register setToken={setToken} setUser={setUser} />
        } />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard 
              token={token} 
              user={user}
              setToken={setToken}
              setUser={setUser}
            />
          </ProtectedRoute>
        } />
        <Route path="/" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </Router>
  );
}

export default App;