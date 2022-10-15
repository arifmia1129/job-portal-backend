const express = require("express");
const app = express();
const cors = require("cors");
const jobsRoute = require("./routes/jobInfo.route.js");
const userRoute = require("./routes/user.route.js");
const managerRoute = require("./routes/manager.router.js");


app.use(express.json());
app.use(cors());

app.use("/api/v1/jobs", jobsRoute);
app.use("/api/v1/user", userRoute);
app.use("/api/v1/manager", managerRoute);

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});


module.exports = app;
