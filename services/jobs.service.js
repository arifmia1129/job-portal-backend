const JobInfo = require("../Model/JobInfo");

exports.createJobService = async (job) => {
    return await JobInfo.create(job);
}

exports.getJobsService = async () => {
    return await JobInfo.find({});
}

exports.updateJobService = async (id, data) => {
    return await JobInfo.updateOne({ _id: id }, data, { runValidators: true });
}