const jobpost = require('../models/jobpost')
const businesspage = require('../models/businesspage')

exports.create = async function (req, res) {
    const businessPageId = req.body.businessPageId;
    const post = req.body.post;
    const business = await businesspage.findById(businessPageId)
    const jobPost = new jobpost(post)
    business.jobsPosted.push(jobPost._id);
    jobPost.companyName = business.businessPageName;
    jobPost.companyId = business._id;
    await business.save()
    return jobPost.save()
}