import React from 'react';
import { useNavigate, Link } from 'react-router-dom';

const Navbar = ({ setAuth }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    setAuth(false);
    navigate('/login');
  };

  return (
    <nav className="nav-bar">
      <h2><Link to="/" style={{ color: 'inherit', textDecoration: 'none' }}>AI HR Analytics</Link></h2>
      <div className="nav-links">
        <Link to="/">Dashboard</Link>
        <Link to="/recommendations">AI Insights</Link>
        <a href="#!" onClick={handleLogout} style={{ cursor: 'pointer' }}>Logout</a>
      </div>
    </nav>
  );
};

export default Navbar;
