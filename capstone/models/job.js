const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema(
  {
    companyName: {
      type: String,
      require: true,
    },
    title: {
      type: String,
      require: true,
    },
    description: {
      type: String,
      require: true,
    },
    sallary: {
      type: String,
      require: true,
    },
    logoUrl: {
      type: String,
      require: true,
    },
    location: {
      type: String,
      require: true,
    },
    duration: {
      type: String,
      require: true,
    },
    locationType: {
      type: String,
      require: true,
    },
    jobType: {
      type: String,
      require: true,
    },
    aboutCompany: {
      type: String,
      require: true,
    },
    additionalInfo: {
      type: String,
      require: true,
    },
    skills: {
      type: Array,
      require: true,
    },
    userId: {
      type: mongoose.ObjectId,
    },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "updatedAt" } }
);

const jobModel = new mongoose.model("jobModel", jobSchema);

module.exports = jobModel;
