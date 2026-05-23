const Review = require('../models/Review');

exports.getReviews = async (req, res) => {
  try {
    const { id } = req.params;
    const { sort } = req.query;

    let sortObj = {};
    if (sort === 'Name') {
      sortObj.fullName = 1;
    } else if (sort === 'Date') {
      sortObj.createdAt = -1;
    } else if (sort === 'Rating') {
      sortObj.rating = -1;
    } else {
      sortObj.createdAt = -1;
    }

    const reviews = await Review.find({ companyId: id }).sort(sortObj);
    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { fullName, subject, reviewText, rating } = req.body;

    const review = new Review({
      companyId: id,
      fullName,
      subject,
      reviewText,
      rating
    });

    await review.save();
    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
