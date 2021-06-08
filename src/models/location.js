const mongoose = require('mongoose');
const locationSchema = new mongoose.Schema(
  {
    lat: {
        type: String,
        required: true,
        trim: true,
      },
      lng: {
        type: String,
        required: true,
        trim: true,
      },
      city: {
        type: String,
      },
      district: {
        type: String,
      },
      formatted_address: {
        type: String,
      },
      locality: {
        type: String,
      },
      pincode: {
        type: String,
      },
      state: {
        type: String,
      },
      street: {
        type: String,
      },
    },
    { timestamps: true }
);

module.exports = mongoose.model('location', locationSchema);
