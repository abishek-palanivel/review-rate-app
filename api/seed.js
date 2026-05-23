const mongoose = require('mongoose');
const Company = require('./models/Company');
const Review = require('./models/Review');
require('dotenv').config();

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/reviewrate';

const companiesData = [
  {
    name: "InfoBeans Technologies",
    location: "Crystal IT Park, Indore, MP, India",
    city: "Indore",
    foundedOn: new Date("2004-03-15"),
    logoText: "IB",
    logoColor: "#7C3AED"
  },
  {
    name: "Walkover Web Solutions",
    location: "Vijay Nagar, Indore, MP, India",
    city: "Indore",
    foundedOn: new Date("2011-08-10"),
    logoText: "WW",
    logoColor: "#059669"
  },
  {
    name: "CDN Software Solutions",
    location: "Electronic Complex, Indore, MP, India",
    city: "Indore",
    foundedOn: new Date("2009-06-20"),
    logoText: "CS",
    logoColor: "#2563EB"
  },
  {
    name: "WittyFeed",
    location: "Geeta Bhawan, Indore, MP, India",
    city: "Indore",
    foundedOn: new Date("2014-09-01"),
    logoText: "WF",
    logoColor: "#D97706"
  }
];

const reviewsByCompany = {
  "InfoBeans Technologies": [
    {
      fullName: "Amit Trivedi",
      subject: "Fantastic culture and balance",
      reviewText: "InfoBeans has a wonderful work environment and great employee benefits. The work-life balance is top-notch, and the workspace is beautiful.",
      rating: 5
    },
    {
      fullName: "Neha Sharma",
      subject: "Great learning for beginners",
      reviewText: "Learnt a lot of new technologies here. The senior staff is very helpful and mentors freshers nicely. Highly recommend to start a career here.",
      rating: 4
    },
    {
      fullName: "Rahul Gupta",
      subject: "Good but salary increments are average",
      reviewText: "The environment is peaceful and stress-free. However, the salary increments are quite standard and average compared to MNCs.",
      rating: 3
    }
  ],
  "Walkover Web Solutions": [
    {
      fullName: "Siddharth Jain",
      subject: "Innovation-driven and startup vibe",
      reviewText: "Walkover has a great entrepreneurial culture. If you are self-motivated, you can build great products. Free food and fun events make it feel like family.",
      rating: 5
    },
    {
      fullName: "Anjali Dubey",
      subject: "Amazing workspace and benefits",
      reviewText: "Very flat hierarchy, you can talk to founders easily. The work is challenging, and you get to learn full-stack development really fast.",
      rating: 4
    },
    {
      fullName: "Vikram Rathore",
      subject: "Work pressure is sometimes high",
      reviewText: "Amazing learning experience and products, but sometimes deadlines are very tight leading to long working hours on weekdays.",
      rating: 3
    }
  ],
  "CDN Software Solutions": [
    {
      fullName: "Deepak Agrawal",
      subject: "Highly supportive management",
      reviewText: "Very friendly environment. The managers support you during difficult timelines, and there is a great focus on quality code delivery.",
      rating: 4
    },
    {
      fullName: "Pooja Mehta",
      subject: "Great project variety",
      reviewText: "I worked on multiple international projects which helped improve my client communication and technical skills immensely.",
      rating: 5
    },
    {
      fullName: "Rohan Sen",
      subject: "Average infrastructure",
      reviewText: "Decent project options and technologies, but the office infrastructure and policy flexibility can be improved.",
      rating: 3
    }
  ],
  "WittyFeed": [
    {
      fullName: "Aditya Joshi",
      subject: "Super creative workspace",
      reviewText: "The vibe at WittyFeed is extremely energetic and creative. If you love media and technology, this is the best place to express yourself.",
      rating: 5
    },
    {
      fullName: "Shreya Patel",
      subject: "Great exposure to media tech",
      reviewText: "I had a great time working with content and coding tools. The team is very young and full of enthusiasm.",
      rating: 4
    },
    {
      fullName: "Kunal Chouhan",
      subject: "Uncertain shifts at times",
      reviewText: "Nice team and fun environment, but sometimes changes in business strategy lead to sudden shifts in project goals.",
      rating: 3
    }
  ]
};

async function seedDatabase() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await Company.deleteMany({});
    await Review.deleteMany({});
    console.log('Cleared existing companies and reviews.');

    for (const compInfo of companiesData) {
      // Create company
      const company = new Company(compInfo);
      const savedCompany = await company.save();
      console.log(`Saved company: ${savedCompany.name}`);

      // Get reviews for this company
      const reviews = reviewsByCompany[savedCompany.name] || [];
      const reviewsWithCompanyId = reviews.map(rev => ({
        ...rev,
        companyId: savedCompany._id
      }));

      await Review.insertMany(reviewsWithCompanyId);
      console.log(`Seeded ${reviewsWithCompanyId.length} reviews for ${savedCompany.name}`);
    }

    console.log('Database seeding completed successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
