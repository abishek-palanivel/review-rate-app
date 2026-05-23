import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';

const StarIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 .587l3.668 7.431 8.2 1.191-5.934 5.787 1.4 8.168L12 18.896l-7.334 3.869 1.4-8.168L.132 9.209l8.2-1.191L12 .587z"/>
  </svg>
);

const SearchIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8"></circle>
    <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
  </svg>
);

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();
  
  const [searchInput, setSearchInput] = useState('');

  // Synchronize input with URL search param
  useEffect(() => {
    const currentSearch = searchParams.get('search') || '';
    setSearchInput(currentSearch);
  }, [searchParams]);

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter') {
      const newParams = new URLSearchParams(searchParams);
      if (searchInput.trim()) {
        newParams.set('search', searchInput.trim());
      } else {
        newParams.delete('search');
      }
      
      // If we are not on home page, navigate to home with the search param
      if (location.pathname !== '/') {
        navigate(`/?${newParams.toString()}`);
      } else {
        setSearchParams(newParams);
      }
    }
  };

  const handleLogoClick = () => {
    setSearchInput('');
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="container navbar-container">
        {/* Left Section */}
        <div className="navbar-logo-link" onClick={handleLogoClick}>
          <div className="navbar-logo-circle">
            <StarIcon />
          </div>
          <span className="navbar-logo-text">
            Review<span>&RATE</span>
          </span>
        </div>

        {/* Center Section: Search */}
        <div className="navbar-search-container">
          <span className="navbar-search-icon">
            <SearchIcon />
          </span>
          <input
            id="navbar-search-field"
            type="text"
            className="navbar-search-input"
            placeholder="Search company..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={handleSearchSubmit}
          />
        </div>

        {/* Right Section */}
        <nav className="navbar-links">
          <a href="#" className="navbar-link" onClick={(e) => e.preventDefault()}>SignUp</a>
          <a href="#" className="navbar-link" onClick={(e) => e.preventDefault()}>Login</a>
        </nav>
      </div>
    </header>
  );
}
