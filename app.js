const express = require("express");
const app = express();
const cors = require("cors");
const jobsRoute = require("./routes/jobInfo.route.js");


app.use(express.json());
app.use(cors());

app.use("/api/v1/jobs", jobsRoute);

app.get("/", (req, res) => {
  res.send("Route is working! YaY!");
});


module.exports = app;
