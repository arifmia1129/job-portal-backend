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
        const jobs = await getJobsService();
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