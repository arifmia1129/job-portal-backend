const { getJobsServices, getJobServices } = require("../services/manager.service")

exports.getJobs = async (req, res) => {
    try {
        const jobs = await getJobsServices(req?.user?.email);
        res.status(200).json({
            status: "success",
            message: "Successfully get jobs",
            jobs
        })
    } catch (error) {
        res.status(400).json({
            status: "fail",
            message: "Couldn't get jobs",
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