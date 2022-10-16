const express = require("express");
const router = express.Router();
const jobsController = require("../controller/jobs.controller.js");

router.route("/")
    .get(jobsController.getJobs)
    .post(jobsController.createJob)
router.patch("/:id", jobsController.updateJob)


module.exports = router;