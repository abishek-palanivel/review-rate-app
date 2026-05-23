import React, { useState } from 'react';
import api from '../api';

const AddCompanyModal = ({ isOpen, onClose, onAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    foundedOn: '',
    city: ''
  });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/companies', formData);
      onAdded();
      onClose();
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add company');
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
        <h2 className="modal-title">Add Company</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Company name</label>
            <input 
              type="text" 
              name="name" 
              placeholder="Enter..." 
              required
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <div className="icon-input-wrapper">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
              <input 
                type="text" 
                name="location" 
                placeholder="Select Location" 
                required
                value={formData.location}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label>Founded on</label>
            <div className="icon-input-wrapper">
              <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              <input 
                type="date" 
                name="foundedOn" 
                required
                value={formData.foundedOn}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="form-group">
            <label>City</label>
            <input 
              type="text" 
              name="city" 
              required
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <button type="submit" className="btn-save">Save</button>
        </form>
      </div>
    </div>
  );
};

export default AddCompanyModal;
