const express = require("express");
const router = express.Router();
const jobsController = require("../controller/jobs.controller.js");
const upload = require("../middleware/upload.js");
const verifyToken = require("../middleware/verifyToken.js");

router.route("/")
    .get(jobsController.getJobs)
    .post(jobsController.createJob)

router.route("/:id")
    .get(jobsController.getJob)
    .patch(jobsController.updateJob)

router.post("/:id/apply", verifyToken, upload.single("resume"), jobsController.applyJob)


module.exports = router;