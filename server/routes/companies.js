const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');
const reviewController = require('../controllers/reviewController');

router.get('/', companyController.getCompanies);
router.post('/', companyController.createCompany);
router.get('/:id', companyController.getCompanyById);

// Reviews sub-routes
router.get('/:id/reviews', reviewController.getReviewsByCompanyId);
router.post('/:id/reviews', reviewController.addReview);

module.exports = router;
