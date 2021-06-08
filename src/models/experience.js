const mongoose = require('mongoose');
const skillSchema = require('./skills');
const experienceSchema = new mongoose.Schema(
  {
    company: {
        type: String,
        trim: true,
        required: true,
      },
      position: {
        type: String,
        trim: true,
        required: true,
      },
      skillsInvolved: [{ type: mongoose.Types.ObjectId, ref: skillSchema }],
      workDescription: {
        type: String,
        trim: true,
        required: true,
      },
      points: {
        type: Number,
      },
      startDate: { type: Date },
      endDate: { type: Date }
    }
);

module.exports = mongoose.model('experience', experienceSchema);
