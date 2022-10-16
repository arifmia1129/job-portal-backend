const JobInfo = require("../Model/JobInfo");

exports.createJobService = async (job) => {
    return await JobInfo.create(job);
}

exports.getJobsService = async (filters, queries) => {
    const jobs = await JobInfo.find(filters)
        .skip(queries.skip)
        .limit(queries.limit)
        .select(queries.fields)
        .sort(queries.sortBy)

    const total = await JobInfo.countDocuments(filters);
    const pages = Math.ceil(total / queries.limit);
    return { jobs, total, pages }
}

exports.updateJobService = async (id, data) => {
    return await JobInfo.updateOne({ _id: id }, data, { runValidators: true });
}