import React from 'react';
import { useNavigate } from 'react-router-dom';

const PinIcon = () => (
  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" style={{ marginRight: '4px' }}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

const FullStar = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#FBBF24">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const EmptyStar = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#E5E7EB">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const HalfStar = ({ size = 16, id }) => (
  <svg width={size} height={size} viewBox="0 0 24 24">
    <defs>
      <linearGradient id={id}>
        <stop offset="50%" stopColor="#FBBF24" />
        <stop offset="50%" stopColor="#E5E7EB" />
      </linearGradient>
    </defs>
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill={`url(#${id})`} />
  </svg>
);

export default function CompanyCard({ company, isDetailView = false, onAddReviewClick }) {
  const navigate = useNavigate();

  const {
    _id,
    name,
    location,
    foundedOn,
    logoText,
    logoColor,
    avgRating = 0,
    reviewCount = 0
  } = company;

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    const date = new Date(dateString);
    if (isNaN(date)) return 'N/A';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  const renderStars = (rating) => {
    const stars = [];
    const roundedRating = Math.round(rating * 2) / 2; // round to nearest 0.5
    for (let i = 1; i <= 5; i++) {
      if (roundedRating >= i) {
        stars.push(<FullStar key={i} />);
      } else if (roundedRating >= i - 0.5) {
        stars.push(<HalfStar key={i} id={`half-star-${_id}-${i}`} />);
      } else {
        stars.push(<EmptyStar key={i} />);
      }
    }
    return stars;
  };

  return (
    <div className="company-card">
      <div className="company-card-left-section">
        {/* Logo */}
        <div
          className="company-logo-container"
          style={{ backgroundColor: logoColor || '#7C3AED' }}
        >
          {logoText || 'CO'}
        </div>

        {/* Company Info */}
        <div className="company-info-content">
          <h2 className="company-title">{name}</h2>
          <div className="company-address">
            <PinIcon />
            {location || 'Location not specified'}
          </div>
          <div className="company-rating-row">
            <div className="star-container">
              {renderStars(avgRating)}
            </div>
            <span className="review-count-text">
              {avgRating > 0 ? avgRating.toFixed(1) : '0.0'} ({reviewCount} {reviewCount === 1 ? 'Review' : 'Reviews'})
            </span>
          </div>
        </div>
      </div>

      <div className="company-card-right-section">
        <span className="founded-date-text">
          Founded on {formatDate(foundedOn)}
        </span>

        {isDetailView ? (
          <button className="btn-add-review" onClick={onAddReviewClick}>
            + Add Review
          </button>
        ) : (
          <button
            className="btn-detail-review"
            onClick={() => navigate(`/company/${_id}`)}
          >
            Detail Review
          </button>
        )}
      </div>
    </div>
  );
}
