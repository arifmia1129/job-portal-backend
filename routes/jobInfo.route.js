const express = require("express");
const router = express.Router();
const jobsController = require("../controller/jobs.controller.js");

router.post("/", jobsController.createJob);
router.patch("/:id", jobsController.updateJob)


module.exports = router;