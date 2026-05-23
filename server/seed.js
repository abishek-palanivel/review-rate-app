require('dotenv').config();
const mongoose = require('mongoose');
const Company = require('./models/Company');
const Review = require('./models/Review');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/reviewrate';

const seedData = async () => {
  try {
    await mongoose.connect(MONGO_URI);

    await Company.deleteMany();
    await Review.deleteMany();

    const companies = [
      {
        name: 'TCS',
        location: 'Super Corridor, Indore',
        city: 'Indore, Madhya Pradesh, India',
        foundedOn: new Date('1968-04-01'),
        logoText: 'TC',
        logoColor: '#3b82f6'
      },
      {
        name: 'Infosys',
        location: 'Super Corridor, Indore',
        city: 'Indore, Madhya Pradesh, India',
        foundedOn: new Date('1981-07-02'),
        logoText: 'IN',
        logoColor: '#10b981'
      },
      {
        name: 'Impetus',
        location: 'Bhawarkua, Indore',
        city: 'Indore, Madhya Pradesh, India',
        foundedOn: new Date('1991-01-01'),
        logoText: 'IM',
        logoColor: '#f59e0b'
      },
      {
        name: 'Yash Technologies',
        location: 'Crystal IT Park, Indore',
        city: 'Indore, Madhya Pradesh, India',
        foundedOn: new Date('1996-01-01'),
        logoText: 'YT',
        logoColor: '#ef4444'
      }
    ];

    const insertedCompanies = await Company.insertMany(companies);

    for (const company of insertedCompanies) {
      const reviews = [
        {
          companyId: company._id,
          fullName: 'Amit Sharma',
          subject: 'Great Work Environment',
          reviewText: 'The culture here is amazing. People are very supportive and the projects are interesting.',
          rating: 5
        },
        {
          companyId: company._id,
          fullName: 'Priya Patel',
          subject: 'Good but can improve',
          reviewText: 'Work life balance is decent. Management could be better.',
          rating: 4
        },
        {
          companyId: company._id,
          fullName: 'Rahul Verma',
          subject: 'Average Experience',
          reviewText: 'Standard corporate experience. Nothing too special but nothing terrible either.',
          rating: 3
        }
      ];
      await Review.insertMany(reviews);
    }

    console.log('Database seeded successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seedData();
