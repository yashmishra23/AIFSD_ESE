import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './pages/Dashboard';
import AIRecommendation from './components/AIRecommendation';
import api from './api';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsAuthenticated(true);
    }
    setLoading(false);
  }, []);

  const fetchEmployees = async () => {
    try {
      const res = await api.get('/employees');
      setEmployees(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <Router>
      {isAuthenticated && <Navbar setAuth={setIsAuthenticated} />}
      <Routes>
        <Route path="/login" element={!isAuthenticated ? <Login setAuth={setIsAuthenticated} /> : <Navigate to="/" />} />
        <Route path="/register" element={!isAuthenticated ? <Register setAuth={setIsAuthenticated} /> : <Navigate to="/" />} />
        <Route 
          path="/" 
          element={isAuthenticated ? <Dashboard employees={employees} setEmployees={setEmployees} fetchEmployees={fetchEmployees} /> : <Navigate to="/login" />} 
        />
        <Route 
          path="/recommendations" 
          element={isAuthenticated ? <AIRecommendation employees={employees} /> : <Navigate to="/login" />} 
        />
      </Routes>
    </Router>
  );
};

export default App;
