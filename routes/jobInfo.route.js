const express = require("express");
const router = express.Router();
const jobsController = require("../controller/jobs.controller.js");

router.post("/", jobsController.createJob)


module.exports = router;