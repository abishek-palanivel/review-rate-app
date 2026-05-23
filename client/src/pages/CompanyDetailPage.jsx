import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import CompanyCard from '../components/CompanyCard';
import ReviewCard from '../components/ReviewCard';
import AddReviewModal from '../components/AddReviewModal';
import api from '../api';

const CompanyDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [company, setCompany] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [sort, setSort] = useState('Date');
  const [isAddReviewModalOpen, setIsAddReviewModalOpen] = useState(false);
  const [error, setError] = useState(null);

  const fetchCompanyData = async () => {
    try {
      const compRes = await api.get(`/companies/${id}`);
      setCompany(compRes.data);
    } catch (err) {
      setError('Failed to fetch company details');
    }
  };

  const fetchReviews = async () => {
    try {
      const revRes = await api.get(`/companies/${id}/reviews`, { params: { sort } });
      setReviews(revRes.data);
    } catch (err) {
      setError('Failed to fetch reviews');
    }
  };

  useEffect(() => {
    fetchCompanyData();
  }, [id]);

  useEffect(() => {
    fetchReviews();
  }, [id, sort]);

  const handleReviewAdded = () => {
    fetchCompanyData(); // update average rating and count
    fetchReviews();     // refresh review list
  };

  const handleSearch = (term) => {
    navigate(`/?search=${term}`);
  };

  return (
    <div>
      <Navbar searchTerm="" setSearchTerm={() => {}} onSearch={() => {}} />
      
      <div className="container">
        {error && <div className="error-message">{error}</div>}
        
        {company && (
          <div className="detail-header">
            <CompanyCard 
              company={company} 
              isDetail={true} 
              onAddReviewClick={() => setIsAddReviewModalOpen(true)}
            />
          </div>
        )}

        <div className="reviews-section">
          <div className="reviews-header">
            <div className="results-count" style={{ marginBottom: 0 }}>
              Result Found: {reviews.length}
            </div>
            <div className="sort-wrapper">
              <label>Sort:</label>
              <select value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="Name">Name</option>
                <option value="Date">Date</option>
                <option value="Rating">Rating</option>
              </select>
            </div>
          </div>

          <div className="card-list">
            {reviews.map(review => (
              <ReviewCard key={review._id} review={review} />
            ))}
          </div>
        </div>
      </div>

      <AddReviewModal 
        isOpen={isAddReviewModalOpen} 
        onClose={() => setIsAddReviewModalOpen(false)} 
        companyId={id}
        onAdded={handleReviewAdded}
      />
    </div>
  );
};

export default CompanyDetailPage;
