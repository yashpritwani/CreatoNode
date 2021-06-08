const User = require('../models/user');
const {uploader, sendEmail} = require('../utils/emailAndStorage');

exports.index = async function (req, res) {
    const users = await User.find({});
    res.status(200).json({users});
};

exports.store = async (req, res) => {
    try {
        const {email} = req.body;
        const user = await User.findOne({email});
        if (user) 
            return res.status(401).json({message: 'The email address you have entered is already associated with another account. You can change this users role instead.'});
        const password = '_' + Math.random().toString(36).substr(2, 9); 
        const newUser = new User({...req.body, password});
        const user_ = await newUser.save();
        user_.generatePasswordReset();
        await user_.save();
        let domain = "http://" + req.headers.host;
        let subject = "New Account Created";
        let to = user.email;
        let from = process.env.FROM_EMAIL;
        let link = "http://" + req.headers.host + "/api/auth/reset/" + user.resetPasswordToken;
        let html = `<p>Hi ${user.username}<p><br><p>A new account has been created for you on ${domain}. Please click on the following <a href="${link}">link</a> to set your password and login.</p> 
                  <br><p>If you did not request this, please ignore this email.</p>`
        await sendEmail({to, from, subject, html});
        res.status(200).json({message: 'An email has been sent to ' + user.email + '.'});
    } catch (error) {
        res.status(500).json({success: false, message: error.message})
    }
};

exports.show = async function (req, res) {
    try {
        const id = req.params.id;
        const user = await User.findById(id);
        if (!user) 
            return res.status(401).json({message: 'User does not exist'});
        res.status(200).json({user});
    } catch (error) {
        res.status(500).json({message: error.message})
    }
};

exports.update = async function (req, res) {
    try {
        const update = req.body;
        const id = req.user._id;
        
        const user = await User.findByIdAndUpdate(id, {$set: update}, {new: true});
        if (!req.file) 
            return res.status(200).json({user, message: 'User has been updated'});
        const result = await uploader(req);
        const user_ = await User.findByIdAndUpdate(id, {$set: update}, {$set: {profileImage: result.url}}, {new: true});
        if (!req.file) 
            return res.status(200).json({user: user_, message: 'User has been updated'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

exports.destroy = async function (req, res) {
    try {
        const id = req.params.id;
        const user_id = req.user._id;
        if (user_id.toString() !== id.toString()) 
            return res.status(401).json({message: "No permission to delete this data."});
        await User.findByIdAndDelete(id);
        res.status(200).json({message: 'User has been deleted'});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};