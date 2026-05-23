const mongoose = require('mongoose');

const CompanySchema = new mongoose.Schema({
  name: { type: String, required: true },
  location: { type: String },
  city: { type: String },
  foundedOn: { type: Date },
  logoText: { type: String }, // 1-2 letters for placeholder logo
  logoColor: { type: String }, // hex color for logo background
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Company', CompanySchema);
