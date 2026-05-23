const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

// Review routes are primary handled under /api/companies/:id/reviews
// but we include this file as specified in the folder structure.

module.exports = router;
