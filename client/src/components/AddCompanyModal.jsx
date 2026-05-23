import React, { useState } from 'react';

const PinIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
    <circle cx="12" cy="10" r="3"></circle>
  </svg>
);

export default function AddCompanyModal({ isOpen, onClose, onSave }) {
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [foundedOn, setFoundedOn] = useState('');
  const [city, setCity] = useState('');
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

    if (!name.trim()) {
      setError('Company name is required.');
      return;
    }
    if (!location.trim()) {
      setError('Location is required.');
      return;
    }
    if (!foundedOn) {
      setError('Founded date is required.');
      return;
    }
    if (!city.trim()) {
      setError('City is required.');
      return;
    }

    onSave({
      name: name.trim(),
      location: location.trim(),
      foundedOn,
      city: city.trim()
    });
  };

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
        <h2 className="modal-title">Add Company</h2>

        {error && (
          <div className="error-alert-banner">
            <span>{error}</span>
            <button className="error-alert-close" onClick={() => setError('')}>&times;</button>
          </div>
        )}

        {/* Form */}
        <form className="modal-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label" htmlFor="company-name">Company Name</label>
            <input
              type="text"
              id="company-name"
              className="form-input"
              placeholder="Enter..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="company-location">Location</label>
            <div className="form-input-icon-wrapper">
              <span className="input-icon">
                <PinIcon />
              </span>
              <input
                type="text"
                id="company-location"
                className="form-input"
                placeholder="Select Location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="company-founded">Founded on</label>
            <input
              type="date"
              id="company-founded"
              className="form-input"
              value={foundedOn}
              onChange={(e) => setFoundedOn(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="company-city">City</label>
            <input
              type="text"
              id="company-city"
              className="form-input"
              placeholder="City"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn-pill-save">
            Save
          </button>
        </form>
      </div>
    </div>
  );
}
