import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="navbar-brand">
          <div className="logo">
            <img src="/images/image1.jpg" alt="Basti Ki Pathshala Logo" className="logo-image" />
            <span className="logo-text">Basti Ki Pathshala</span>
          </div>
        </Link>

        <div className={`navbar-menu ${isOpen ? 'active' : ''}`}>
          <Link 
            to="/" 
            className={`navbar-link ${isActive('/') ? 'active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
          <Link 
            to="/register" 
            className={`navbar-link ${isActive('/register') ? 'active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            Join Us
          </Link>
          <Link 
            to="/admin" 
            className={`navbar-link ${isActive('/admin') ? 'active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            Admin
          </Link>
        </div>

        <div className="navbar-toggle" onClick={toggleMenu}>
          <span className={`hamburger ${isOpen ? 'active' : ''}`}></span>
        </div>
      </div>
    </nav>
  );
};

export default Navbar; 