import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ searchTerm, setSearchTerm, onSearch }) => {
  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && onSearch) {
      onSearch();
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-left">
        <div className="nav-logo-icon">★</div>
        <div className="nav-title">Review<b>RATE</b></div>
      </Link>
      
      <div className="navbar-center">
        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        <input 
          type="text" 
          placeholder="Search..." 
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleKeyDown}
        />
      </div>

      <div className="navbar-right">
        <Link to="#">SignUp</Link>
        <Link to="#">Login</Link>
      </div>
    </nav>
  );
};

export default Navbar;
