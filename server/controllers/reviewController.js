const mongoose = require('mongoose');
const Review = require('../models/Review');
const Company = require('../models/Company');

exports.getReviewsByCompanyId = async (req, res) => {
  try {
    const { id } = req.params;
    const { sort } = req.query;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid company ID' });
    }

    const query = { companyId: new mongoose.Types.ObjectId(id) };
    let sortObj = { createdAt: -1 }; // default sort by newest review

    if (sort === 'name') {
      sortObj = { fullName: 1 };
    } else if (sort === 'date') {
      sortObj = { createdAt: -1 };
    } else if (sort === 'rating') {
      sortObj = { rating: -1 };
    }

    const reviews = await Review.find(query).sort(sortObj);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving reviews', error: error.message });
  }
};

exports.addReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, subject, reviewText, rating } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid company ID' });
    }

    if (!fullName || !reviewText || rating === undefined) {
      return res.status(400).json({ message: 'Full name, review text, and rating are required' });
    }

    const ratingNum = Number(rating);
    if (isNaN(ratingNum) || ratingNum < 1 || ratingNum > 5) {
      return res.status(400).json({ message: 'Rating must be a number between 1 and 5' });
    }

    const company = await Company.findById(id);
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    const review = new Review({
      companyId: id,
      fullName,
      subject,
      reviewText,
      rating: ratingNum
    });

    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: 'Error adding review', error: error.message });
  }
};
