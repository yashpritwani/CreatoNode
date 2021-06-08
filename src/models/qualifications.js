const mongoose = require('mongoose');
const skillSchema = require('./skills');
const qualificationSchema = new mongoose.Schema(
    {
        institute: {
          type: String,
          required: true,
          trim: true,
        },
        course: {
          type: String,
          required: true,
          trim: true,
        },
        skillsInvolved: [{ type: mongoose.Types.ObjectId, ref: skillSchema }],
        subject: {
          type: String,
          required: true,
          trim: true,
        },
        points: {
          type: Number,
        },
        startDate: { type: Date },
        endDate: { type: Date },
      },
      { timestamps: true }
);

module.exports = mongoose.model('qualification', qualificationSchema);
