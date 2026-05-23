const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const reviewController = require('../controllers/reviewController');

router.get('/', companyController.getCompanies);
router.post('/', companyController.createCompany);
router.get('/:id', companyController.getCompanyById);

// We can put the review routes related to a company here or in reviews.js
router.get('/:id/reviews', reviewController.getReviews);
router.post('/:id/reviews', reviewController.createReview);

module.exports = router;
