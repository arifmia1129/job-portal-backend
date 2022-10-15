const JobInfo = require("../Model/JobInfo")

exports.getJobsServices = async (email) => {
    return await JobInfo.find({ "hiringManager.email": email });
}
exports.getJobServices = async (id) => {
    return await JobInfo.findOne({ _id: id }).populate("hiringManager.id");
}