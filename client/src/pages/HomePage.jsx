import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import api from '../api';
import CompanyCard from '../components/CompanyCard';
import AddCompanyModal from '../components/AddCompanyModal';

const PinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

export default function HomePage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  // Local state for city input (controlled but only applied to searchParams on "Find Company" click)
  const [cityInput, setCityInput] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Sync cityInput state with URL search param on initial mount
  useEffect(() => {
    setCityInput(searchParams.get('city') || '');
  }, []);

  // Fetch companies whenever search parameters change
  const fetchCompanies = async () => {
    setLoading(true);
    setError('');
    try {
      const search = searchParams.get('search') || '';
      const city = searchParams.get('city') || '';
      const sort = searchParams.get('sort') || '';
      
      const response = await api.get('/companies', {
        params: { search, city, sort }
      });
      setCompanies(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to fetch companies. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, [searchParams]);

  const handleFindCompany = () => {
    const newParams = new URLSearchParams(searchParams);
    if (cityInput.trim()) {
      newParams.set('city', cityInput.trim());
    } else {
      newParams.delete('city');
    }
    setSearchParams(newParams);
  };

  const handleCityKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleFindCompany();
    }
  };

  const handleSortChange = (e) => {
    const sortValue = e.target.value;
    const newParams = new URLSearchParams(searchParams);
    if (sortValue) {
      newParams.set('sort', sortValue);
    } else {
      newParams.delete('sort');
    }
    setSearchParams(newParams);
  };

  const handleSaveCompany = async (companyData) => {
    try {
      setError('');
      await api.post('/companies', companyData);
      setIsModalOpen(false);
      // Refresh list
      fetchCompanies();
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to add company. Please try again.');
    }
  };

  const currentSort = searchParams.get('sort') || '';

  return (
    <main>
      {/* Filter bar */}
      <section className="filter-bar-section">
        <div className="container filter-bar-container">
          <div className="filter-left">
            <div className="filter-group">
              <label className="filter-label" htmlFor="city-filter-input">Select City</label>
              <div className="input-with-icon">
                <span className="input-icon">
                  <PinIcon />
                </span>
                <input
                  type="text"
                  id="city-filter-input"
                  placeholder="Indore, Madhya Pradesh, India"
                  value={cityInput}
                  onChange={(e) => setCityInput(e.target.value)}
                  onKeyDown={handleCityKeyDown}
                />
              </div>
            </div>

            <button className="btn-primary" onClick={handleFindCompany}>
              Find Company
            </button>

            <button className="btn-dark" onClick={() => setIsModalOpen(true)}>
              + Add Company
            </button>
          </div>

          <div className="filter-right">
            <label className="sort-label" htmlFor="company-sort-select">Sort:</label>
            <select
              id="company-sort-select"
              className="sort-select"
              value={currentSort}
              onChange={handleSortChange}
            >
              <option value="">Default (Newest)</option>
              <option value="name">Name</option>
              <option value="rating">Average Rating</option>
              <option value="location">Location</option>
            </select>
          </div>
        </div>
      </section>

      {/* Results found block */}
      <div className="container">
        <section className="results-info-section">
          <span className="results-count-text">
            Result Found: {companies.length}
          </span>
        </section>

        {error && (
          <div className="error-alert-banner">
            <span>{error}</span>
            <button className="error-alert-close" onClick={() => setError('')}>&times;</button>
          </div>
        )}

        {/* List of companies */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem 0', color: 'var(--muted-text)' }}>
            <div className="loader" style={{ margin: '0 auto 1rem', width: '40px', height: '40px', border: '4px solid var(--card-border)', borderTop: '4px solid var(--primary-purple)', borderRadius: '50%', animation: 'spin 1s linear infinite' }}></div>
            <p>Loading companies...</p>
          </div>
        ) : (
          <div className="company-list-grid">
            {companies.length > 0 ? (
              companies.map((company) => (
                <CompanyCard key={company._id} company={company} />
              ))
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                backgroundColor: 'var(--white)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--card-border)',
                color: 'var(--muted-text)'
              }}>
                <h3>No companies found</h3>
                <p style={{ marginTop: '0.5rem' }}>Try refining your search terms or add a new company to get started!</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* CSS Animation for Spinner */}
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>

      {/* Add Company Modal */}
      <AddCompanyModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveCompany}
      />
    </main>
  );
}
