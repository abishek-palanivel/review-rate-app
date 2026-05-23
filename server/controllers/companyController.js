const mongoose = require('mongoose');
const Company = require('../models/Company');
const Review = require('../models/Review');

exports.getCompanies = async (req, res) => {
  try {
    const { search, city, sort } = req.query;
    
    let query = {};
    if (search) {
      query.name = { $regex: search, $options: 'i' };
    }
    if (city) {
      query.city = { $regex: city, $options: 'i' };
    }

    const companies = await Company.find(query).lean();
    
    // Calculate average ratings for each
    const companyIds = companies.map(c => c._id);
    const reviews = await Review.aggregate([
      { $match: { companyId: { $in: companyIds } } },
      { $group: { _id: '$companyId', avgRating: { $avg: '$rating' }, reviewCount: { $sum: 1 } } }
    ]);

    const reviewMap = {};
    reviews.forEach(r => {
      reviewMap[r._id] = { avgRating: r.avgRating, reviewCount: r.reviewCount };
    });

    companies.forEach(c => {
      const stats = reviewMap[c._id] || { avgRating: 0, reviewCount: 0 };
      c.avgRating = stats.avgRating;
      c.reviewCount = stats.reviewCount;
    });

    if (sort === 'Name') {
      companies.sort((a, b) => a.name.localeCompare(b.name));
    } else if (sort === 'Average Rating') {
      companies.sort((a, b) => b.avgRating - a.avgRating);
    } else if (sort === 'Location') {
      companies.sort((a, b) => (a.location || '').localeCompare(b.location || ''));
    }

    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.createCompany = async (req, res) => {
  try {
    const { name, location, city, foundedOn } = req.body;
    const logoText = name ? name.substring(0, 2).toUpperCase() : 'CO';
    const logoColor = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    
    const company = new Company({
      name,
      location,
      city,
      foundedOn,
      logoText,
      logoColor
    });

    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    const company = await Company.findById(id).lean();
    if (!company) {
      return res.status(404).json({ message: 'Company not found' });
    }

    const stats = await Review.aggregate([
      { $match: { companyId: new mongoose.Types.ObjectId(id) } },
      { $group: { _id: '$companyId', avgRating: { $avg: '$rating' }, reviewCount: { $sum: 1 } } }
    ]);

    if (stats.length > 0) {
      company.avgRating = stats[0].avgRating;
      company.reviewCount = stats[0].reviewCount;
    } else {
      company.avgRating = 0;
      company.reviewCount = 0;
    }

    res.json(company);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
