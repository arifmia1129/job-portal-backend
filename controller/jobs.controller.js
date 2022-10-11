const { createJobService } = require("../services/jobs.service")

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