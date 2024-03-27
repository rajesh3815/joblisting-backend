const express = require("express");
const {
  jobController,
  getjobDetails,
  updateDetails,
  allJobdetails,
} = require("../controller/job.controller");
const { verifyToken, upload } = require("../middleware/verifyToken");

const jobRoute = express.Router();
const middlewares = [];
jobRoute.post("/create", verifyToken,  jobController);
jobRoute.get("/job-details/:jobId", getjobDetails);
jobRoute.put(
  "/update/:jobId",
  verifyToken,
  updateDetails
);
jobRoute.get("/all", allJobdetails);

module.exports = jobRoute;
