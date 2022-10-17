const { createJobService, updateJobService, getJobsService, getUserService, getJobService } = require("../services/jobs.service");
const { getJobServices } = require("../services/manager.service");
const { getMeService } = require("../services/user.service");

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

exports.getJob = async (req, res) => {
    try {
        const { id } = req.params;
        const job = await getJobServices(id);
        res.status(200).json({
            status: "success",
            message: "Successfully get jobs",
            job
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get jobs",
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
exports.applyJob = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await getMeService(req?.user?.email);
        const job = await getJobService(id);

        const date = new Date().toISOString().split('T')[0];


        if (new Date(job.deadline) < new Date(date)) {
            return res.status(400).json({
                status: 'fail',
                message: "Deadline over. Can't apply",
            })
        }

        if (user?.appliedJobs.includes(id)) {
            return res.status(400).json({
                status: "fail",
                message: "Already applied for this job"
            })
        }


        user?.appliedJobs.push(id);
        job?.resume.push(req.file.filename)


        await user?.save({ validatorBeforeSave: false })
        await job?.save({ validatorBeforeSave: false })

        res.status(200).json({
            status: "success",
            message: "Successfully applied job",
            resume: req.file
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't applied the job",
            error: error.message
        })
    }
}