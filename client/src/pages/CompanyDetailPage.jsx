import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api';
import CompanyCard from '../components/CompanyCard';
import ReviewCard from '../components/ReviewCard';
import AddReviewModal from '../components/AddReviewModal';

export default function CompanyDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [company, setCompany] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loadingCompany, setLoadingCompany] = useState(true);
  const [loadingReviews, setLoadingReviews] = useState(true);
  const [error, setError] = useState('');
  const [sort, setSort] = useState('date'); // default: date
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchCompanyDetails = async () => {
    setLoadingCompany(true);
    try {
      const response = await api.get(`/companies/${id}`);
      setCompany(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to fetch company details.');
    } finally {
      setLoadingCompany(false);
    }
  };

  const fetchReviews = async (currentSort) => {
    setLoadingReviews(true);
    try {
      const response = await api.get(`/companies/${id}/reviews`, {
        params: { sort: currentSort }
      });
      setReviews(response.data);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to fetch reviews.');
    } finally {
      setLoadingReviews(false);
    }
  };

  useEffect(() => {
    if (id) {
      fetchCompanyDetails();
      fetchReviews(sort);
    }
  }, [id]);

  const handleSortChange = (e) => {
    const nextSort = e.target.value;
    setSort(nextSort);
    fetchReviews(nextSort);
  };

  const handleSaveReview = async (reviewData) => {
    try {
      setError('');
      await api.post(`/companies/${id}/reviews`, reviewData);
      setIsModalOpen(false);
      
      // Refresh both company (avg rating/count) and reviews list
      fetchCompanyDetails();
      fetchReviews(sort);
    } catch (err) {
      console.error(err);
      setError(err.response?.data?.message || 'Failed to submit review. Please try again.');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  return (
    <main className="container" style={{ paddingTop: '1.5rem' }}>
      {/* Back navigation */}
      <button 
        onClick={handleBack} 
        style={{
          background: 'none',
          border: 'none',
          color: 'var(--primary-purple)',
          fontWeight: '600',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: '0.25rem',
          marginBottom: '1rem',
          fontSize: '0.9rem'
        }}
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12"></line>
          <polyline points="12 19 5 12 12 5"></polyline>
        </svg>
        Back to Companies
      </button>

      {error && (
        <div className="error-alert-banner">
          <span>{error}</span>
          <button className="error-alert-close" onClick={() => setError('')}>&times;</button>
        </div>
      )}

      {/* Company Header */}
      {loadingCompany ? (
        <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--muted-text)' }}>
          <p>Loading company details...</p>
        </div>
      ) : (
        company && (
          <div style={{ marginBottom: '2rem' }}>
            <CompanyCard 
              company={company} 
              isDetailView={true} 
              onAddReviewClick={() => setIsModalOpen(true)} 
            />
          </div>
        )
      )}

      {/* Reviews list title & sorting */}
      <section className="reviews-section">
        <div className="reviews-header-row">
          <span className="results-count-text">
            Result Found: {reviews.length}
          </span>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
            <label className="sort-label" htmlFor="review-sort-select">Sort:</label>
            <select
              id="review-sort-select"
              className="sort-select"
              value={sort}
              onChange={handleSortChange}
            >
              <option value="date">Date</option>
              <option value="name">Name</option>
              <option value="rating">Rating</option>
            </select>
          </div>
        </div>

        {/* Reviews List */}
        {loadingReviews ? (
          <div style={{ textAlign: 'center', padding: '2rem 0', color: 'var(--muted-text)' }}>
            <p>Loading reviews...</p>
          </div>
        ) : (
          <div className="reviews-list-container">
            {reviews.length > 0 ? (
              reviews.map((review) => (
                <ReviewCard key={review._id} review={review} />
              ))
            ) : (
              <div style={{
                textAlign: 'center',
                padding: '3rem 2rem',
                backgroundColor: 'var(--white)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--card-border)',
                color: 'var(--muted-text)'
              }}>
                <h4>No reviews yet</h4>
                <p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>Be the first to review this company by clicking the "+ Add Review" button above!</p>
              </div>
            )}
          </div>
        )}
      </section>

      {/* Add Review Modal */}
      <AddReviewModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveReview}
      />
    </main>
  );
}
