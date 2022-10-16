const { createJobService, updateJobService, getJobsService } = require("../services/jobs.service")

exports.createJob = async (req, res) => {
    try {
        const result = await createJobService(req.body);
        res.status(200).json({
            status: "success",
            message: "Successfully created job"
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't create the job",
            error: error.message
        })
    }
}

exports.getJobs = async (req, res) => {
    try {

        let filters = { ...req.query };
        const queries = {};

        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");
            queries.sortBy = sortBy;
        }

        if (req.query.fields) {
            const fields = req.query.fields.split(",").join(" ");
            queries.fields = fields;
        }

        if (req.query.page) {
            const { page = 1, limit = 10 } = req.query;
            queries.skip = (page - 1) * Number(limit);
            queries.limit = Number(limit);
        }

        const excludeField = ["page", "limit", "fields", "sort"];

        excludeField.forEach(field => delete filters[field])

        let filterString = JSON.stringify(filters);
        filterString = filterString.replace(/\b(gt|lt|gte|lte)\b/g, match => `$${match}`)
        filters = JSON.parse(filterString);

        const jobs = await getJobsService(filters, queries);
        res.status(200).json({
            status: "success",
            message: "Successfully get jobs",
            jobs
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get the job",
            error: error.message
        })
    }
}


exports.updateJob = async (req, res) => {
    try {
        const { id } = req.params;
        const result = await updateJobService(id, req.body);
        res.status(200).json({
            status: "success",
            message: "Successfully updated job"
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't updated the job",
            error: error.message
        })
    }
}