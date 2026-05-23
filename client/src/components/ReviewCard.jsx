import React from 'react';

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

export default function ReviewCard({ review }) {
  const { fullName, subject, reviewText, rating, createdAt } = review;

  const formatReviewDate = (dateString) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    if (isNaN(date)) return '';
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}-${month}-${year}, ${hours}:${minutes}`;
  };

  const renderStars = (count) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= count) {
        stars.push(<FullStar key={i} />);
      } else {
        stars.push(<EmptyStar key={i} />);
      }
    }
    return stars;
  };

  // Generate a slightly unique avatar based on the reviewer's name
  const avatarUrl = `https://i.pravatar.cc/50?u=${encodeURIComponent(fullName)}`;

  return (
    <div className="review-card">
      <div className="review-card-left">
        {/* Avatar */}
        <img
          src={avatarUrl}
          alt={fullName}
          className="reviewer-avatar"
          onError={(e) => {
            // fallback if pravatar is down
            e.target.src = 'https://i.pravatar.cc/50';
          }}
        />

        {/* Content */}
        <div className="review-content-wrapper">
          <div className="reviewer-name">{fullName}</div>
          <div className="review-date">{formatReviewDate(createdAt)}</div>
          {subject && <h4 className="review-subject">{subject}</h4>}
          <p className="review-text-body">{reviewText}</p>
        </div>
      </div>

      {/* Star Rating on the Right */}
      <div className="review-card-right">
        <div className="star-container">
          {renderStars(rating)}
        </div>
      </div>
    </div>
  );
}
