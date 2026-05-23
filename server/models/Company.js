const mongoose = require('mongoose');

const companySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: String,
  city: String,
  foundedOn: Date,
  logoText: String,
  logoColor: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Company', companySchema);
