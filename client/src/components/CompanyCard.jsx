import React from 'react';
import { Link } from 'react-router-dom';

const StarRating = ({ rating }) => {
  const stars = [];
  for (let i = 1; i <= 5; i++) {
    if (rating >= i) {
      stars.push(
        <svg key={i} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    } else {
      stars.push(
        <svg key={i} className="star-empty" fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      );
    }
  }
  return <div className="stars-display">{stars}</div>;
};

const CompanyCard = ({ company, isDetail, onAddReviewClick }) => {
  const dateObj = new Date(company.foundedOn);
  const formattedDate = `${String(dateObj.getDate()).padStart(2, '0')}-${String(dateObj.getMonth() + 1).padStart(2, '0')}-${dateObj.getFullYear()}`;

  return (
    <div className="company-card">
      <div className="company-logo" style={{ backgroundColor: company.logoColor || '#7C3AED' }}>
        {company.logoText || 'CO'}
      </div>
      
      <div className="company-info">
        <div>
          <div className="company-name">{company.name}</div>
          <div className="company-address">
            <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            {company.city || company.location}
          </div>
          <div className="company-rating">
            <StarRating rating={company.avgRating || 0} />
            <span>{company.reviewCount || 0} Reviews</span>
          </div>
        </div>
      </div>

      <div className="company-founded">
        Founded on {formattedDate}
      </div>

      <div className="company-action">
        {isDetail ? (
          <button className="btn-add-review" onClick={onAddReviewClick}>
            + Add Review
          </button>
        ) : (
          <Link to={`/company/${company._id}`}>
            <button className="btn-detail">Detail Review</button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default CompanyCard;
