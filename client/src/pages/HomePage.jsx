import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CompanyCard from '../components/CompanyCard';
import AddCompanyModal from '../components/AddCompanyModal';
import api from '../api';

const HomePage = () => {
  const [companies, setCompanies] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [cityFilter, setCityFilter] = useState('');
  const [sort, setSort] = useState('Name');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [error, setError] = useState(null);

  const fetchCompanies = async () => {
    try {
      setError(null);
      const params = {};
      if (searchTerm) params.search = searchTerm;
      if (cityFilter) params.city = cityFilter;
      if (sort) params.sort = sort;

      const response = await api.get('/companies', { params });
      setCompanies(response.data);
    } catch (err) {
      setError('Failed to fetch companies');
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [cityFilter, sort]);

  const handleSearch = () => {
    fetchCompanies();
  };

  return (
    <div>
      <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} onSearch={handleSearch} />
      
      <div className="container">
        <div className="filter-bar">
          <div className="filter-group">
            <label>Select City</label>
            <div className="city-input-wrapper">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input 
                type="text" 
                placeholder="Indore, Madhya Pradesh, India" 
                value={cityFilter}
                onChange={(e) => setCityFilter(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && fetchCompanies()}
              />
            </div>
          </div>
          
          <button className="btn-primary" onClick={fetchCompanies}>Find Company</button>
          
          <button className="btn-dark" onClick={() => setIsAddModalOpen(true)}>+ Add Company</button>
          
          <div className="sort-wrapper">
            <label>Sort:</label>
            <select value={sort} onChange={(e) => setSort(e.target.value)}>
              <option value="Name">Name</option>
              <option value="Average Rating">Average Rating</option>
              <option value="Location">Location</option>
            </select>
          </div>
        </div>

        <div className="results-count">
          Result Found: {companies.length}
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="card-list">
          {companies.map(company => (
            <CompanyCard key={company._id} company={company} />
          ))}
        </div>
      </div>

      <AddCompanyModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAdded={fetchCompanies}
      />
    </div>
  );
};

export default HomePage;
