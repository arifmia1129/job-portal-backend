const User = require("../Model/User")

exports.signupService = async (user) => {
    return await User.create(user);
}

exports.loggedInUser = async (email) => {
    return await User.findOne({ email });
}

exports.getMeService = async (email) => {
    return await User.findOne({ email });
}