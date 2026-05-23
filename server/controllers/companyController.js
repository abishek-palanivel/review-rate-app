const mongoose = require('mongoose');
const Company = require('../models/Company');

function generateLogoText(name) {
  if (!name) return 'CO';
  const words = name.trim().split(/\s+/);
  if (words.length >= 2) {
    return (words[0][0] + words[1][0]).toUpperCase().slice(0, 2);
  }
  return name.trim().slice(0, 2).toUpperCase();
}

function getRandomColor() {
  const colors = [
    '#7C3AED', // Primary purple
    '#A855F7', // Purple gradient end
    '#3B82F6', // Blue
    '#10B981', // Emerald
    '#F59E0B', // Amber
    '#EF4444', // Red
    '#EC4899', // Pink
    '#6366F1', // Indigo
    '#14B8A6'  // Teal
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

exports.getCompanies = async (req, res) => {
  try {
    const { search, city, sort } = req.query;
    const match = {};

    if (search) {
      match.name = { $regex: search, $options: 'i' };
    }
    if (city) {
      match.city = { $regex: city, $options: 'i' };
    }

    const pipeline = [];
    if (Object.keys(match).length > 0) {
      pipeline.push({ $match: match });
    }

    pipeline.push(
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'companyId',
          as: 'reviews'
        }
      },
      {
        $project: {
          name: 1,
          location: 1,
          city: 1,
          foundedOn: 1,
          logoText: 1,
          logoColor: 1,
          createdAt: 1,
          reviewCount: { $size: '$reviews' },
          avgRating: { $ifNull: [ { $avg: '$reviews.rating' }, 0 ] }
        }
      }
    );

    const sortStage = {};
    if (sort === 'name') {
      sortStage.name = 1;
    } else if (sort === 'rating') {
      sortStage.avgRating = -1;
    } else if (sort === 'location') {
      sortStage.location = 1;
    } else {
      sortStage.createdAt = -1;
    }
    pipeline.push({ $sort: sortStage });

    const companies = await Company.aggregate(pipeline);
    res.json(companies);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving companies', error: error.message });
  }
};

exports.createCompany = async (req, res) => {
  try {
    const { name, location, city, foundedOn } = req.body;
    if (!name) {
      return res.status(400).json({ message: 'Company name is required' });
    }

    const logoText = generateLogoText(name);
    const logoColor = getRandomColor();

    const company = new Company({
      name,
      location,
      city,
      foundedOn: foundedOn ? new Date(foundedOn) : undefined,
      logoText,
      logoColor
    });

    await company.save();
    res.status(201).json(company);
  } catch (error) {
    res.status(500).json({ message: 'Error creating company', error: error.message });
  }
};

exports.getCompanyById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid company ID' });
    }

    const companyArray = await Company.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'companyId',
          as: 'reviews'
        }
      },
      {
        $project: {
          name: 1,
          location: 1,
          city: 1,
          foundedOn: 1,
          logoText: 1,
          logoColor: 1,
          createdAt: 1,
          reviewCount: { $size: '$reviews' },
          avgRating: { $ifNull: [ { $avg: '$reviews.rating' }, 0 ] }
        }
      }
    ]);

    if (companyArray.length === 0) {
      return res.status(404).json({ message: 'Company not found' });
    }

    res.json(companyArray[0]);
  } catch (error) {
    res.status(500).json({ message: 'Error retrieving company details', error: error.message });
  }
};
