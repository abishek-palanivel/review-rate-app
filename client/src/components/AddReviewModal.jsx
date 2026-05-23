import React, { useState } from 'react';

const FullStar = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#FBBF24">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const EmptyStar = ({ size = 28 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="#E5E7EB">
    <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
  </svg>
);

const labels = {
  1: 'Terrible',
  2: 'Bad',
  3: 'Okay',
  4: 'Satisfied',
  5: 'Excellent'
};

export default function AddReviewModal({ isOpen, onClose, onSave }) {
  const [fullName, setFullName] = useState('');
  const [subject, setSubject] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!fullName.trim()) {
      setError('Full name is required.');
      return;
    }
    if (!reviewText.trim()) {
      setError('Review description is required.');
      return;
    }
    if (rating === 0) {
      setError('Please select a star rating.');
      return;
    }

    onSave({
      fullName: fullName.trim(),
      subject: subject.trim(),
      reviewText: reviewText.trim(),
      rating
    });
  };

  const activeRating = hoverRating || rating;

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        {/* Decorative Blobs */}
        <div className="modal-blobs">
          <div className="modal-blob-1"></div>
          <div className="modal-blob-2"></div>
        </div>

        {/* Close Button */}
        <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
          &times;
        </button>

        {/* Title */}
        <h2 className="modal-title">Add Review</h2>

        {error && (
          <div className="error-alert-banner">
            <span>{error}</span>
            <button className="error-alert-close" onClick={() => setError('')}>&times;</button>
          </div>
        )}

        {/* Form */}
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="reviewer-name">Full Name</label>
            <input
              type="text"
              id="reviewer-name"
              className="form-input"
              placeholder="Enter"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reviewer-subject">Subject</label>
            <input
              type="text"
              id="reviewer-subject"
              className="form-input"
              placeholder="Enter"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="reviewer-text">Enter your Review</label>
            <textarea
              id="reviewer-text"
              className="form-input"
              placeholder="Description"
              style={{ height: '120px', resize: 'vertical' }}
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Rating</label>
            <div className="star-selector-container">
              <div className="star-selector-stars">
                {[1, 2, 3, 4, 5].map((starValue) => (
                  <button
                    key={starValue}
                    type="button"
                    className="interactive-star"
                    onClick={() => setRating(starValue)}
                    onMouseEnter={() => setHoverRating(starValue)}
                    onMouseLeave={() => setHoverRating(0)}
                  >
                    {starValue <= activeRating ? <FullStar /> : <EmptyStar />}
                  </button>
                ))}
              </div>
              <span className="rating-label-text">
                {activeRating > 0 ? `${activeRating} = ${labels[activeRating]}` : 'Select Rating'}
              </span>
            </div>
          </div>

          <button type="submit" className="btn-pill-save">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
