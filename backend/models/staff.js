const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  name: { type: String, required: true },
  position: { type: String, required: true },
  bio: { type: String },
  email: { type: String },
  socialMedia: {
    linkedin: { type: String },
    twitter: { type: String }
  },
  image: { type: String },
});

module.exports = mongoose.model('Staff', staffSchema);
