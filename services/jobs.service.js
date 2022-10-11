const JobInfo = require("../Model/JobInfo");

exports.createJobService = async (job) => {
    return await JobInfo.create(job);
}