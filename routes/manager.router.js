const express = require("express");
const router = express.Router();
const managerController = require("../controller/manager.controller.js");
const auth = require("../middleware/auth.js");
const verifyToken = require("../middleware/verifyToken.js");

router.get("/jobs", verifyToken, auth("hiring-manager"), managerController.getJobs);
router.get("/jobs/:id", verifyToken, managerController.getJob);



module.exports = router;