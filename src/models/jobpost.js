const mongoose = require('mongoose')

const jobPostSchema = new mongoose.Schema({
    companyName: {
      type: String,
      trim: true,
    },
    companyId: {
      type: String,
    },
    jobTitle: {
      type: String,
      required: true,
    },
    jobPostType: {
      type: String,
      enum: [
        'Internship',
        'Full time',
        'Part time',
        'Volunteer',
        'Freelancer',
        'Partner',
        'Cofounder',
      ],
      required: true,
    },
    skills: [
      {
        skillName: String,
        skillScore: String,
      },
    ],
    city: [{ type: String }],
    state: [{ type: String }],
    stipend: {
      type: String,
      trim: true,
    },
    jobDescription: {
      type: String,
      trim: true,
    },
    perks: {
      type: String,
      required: true,
      trim: true,
    },
    postedBy: {
      type: String,
    },
    startDate: { type: String },
    endDate: { type: String },
    applicants: [
      {
        type: String,
      },
    ],
    preselect: [{ type: String }],
    viewer: [
      {
        type: String,
      },
    ],
    selectedApplicants: [{ type: String }],
    rejectedApplicants: [{ type: String }],
});

module.exports = mongoose.model('jobpost',jobPostSchema)

