import React, { useState } from 'react';
import api from '../api';

const StarRatingInput = ({ rating, setRating }) => {
  const [hover, setHover] = useState(0);

  const getLabel = (rating) => {
    switch (rating) {
      case 1: return 'Terrible';
      case 2: return 'Bad';
      case 3: return 'Okay';
      case 4: return 'Satisfied';
      case 5: return 'Excellent';
      default: return '';
    }
  };

  return (
    <div className="star-rating-input">
      <div className="stars">
        {[1, 2, 3, 4, 5].map((star) => (
          <svg
            key={star}
            className={star <= (hover || rating) ? 'active' : ''}
            onMouseEnter={() => setHover(star)}
            onMouseLeave={() => setHover(0)}
            onClick={() => setRating(star)}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>
      <span className="star-label">{getLabel(hover || rating)}</span>
    </div>
  );
};

const AddReviewModal = ({ isOpen, onClose, companyId, onAdded }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    subject: '',
    reviewText: ''
  });
  const [rating, setRating] = useState(0);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    try {
      await api.post(`/companies/${companyId}/reviews`, { ...formData, rating });
      onAdded();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add review');
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target.className === 'modal-overlay') {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-content">
        <div className="modal-blob"></div>
        <button className="modal-close" onClick={onClose}>&times;</button>
        <h2 className="modal-title">Add Review</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Full Name</label>
            <input 
              type="text" 
              name="fullName" 
              placeholder="Enter" 
              required
              value={formData.fullName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Subject</label>
            <input 
              type="text" 
              name="subject" 
              placeholder="Enter" 
              required
              value={formData.subject}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Enter your Review</label>
            <textarea 
              name="reviewText" 
              placeholder="Description" 
              style={{ height: '120px' }}
              required
              value={formData.reviewText}
              onChange={handleChange}
            ></textarea>
          </div>
          <div className="form-group">
            <label>Rating</label>
            <StarRatingInput rating={rating} setRating={setRating} />
          </div>
          <button type="submit" className="btn-save">Save</button>
        </form>
      </div>
    </div>
  );
};

export default AddReviewModal;
