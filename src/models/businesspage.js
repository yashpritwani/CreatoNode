const mongoose = require('mongoose');

const businessPageSchema = new mongoose.Schema(
    {
        businessPageName: {
          type: String,
          required: true,
          trim: true,
        },
        businessPageIntro: {
          type: String,
          required: true,
        },
        businessPageType: {
          type: String,
    
          required: false,
          trim: true,
        },
        businessPageUrl: {
          type: String,
          required: false,
        },
        associatedTeammates: {
          type: [String],
          required: false,
        },
        businessPageLogoUrl: {
          type: String,
          required: false,
        },
        chats: [{ type: String }],
        jobsPosted: {
          type: [String],
        },
      },
      { timestamps: true },
);

module.exports = mongoose.model('business', businessPageSchema);