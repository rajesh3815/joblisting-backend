const { verifyEditable } = require("../middleware/verifyToken");
const job = require("../models/job");
const usermodel=require('../models/user')
const jobController = async (req, res) => {
  // const fileImage=req.file.filename
  const userId = req.userId;
  let nameUser
  if(userId){
     const User=await usermodel.findOne({_id:userId},{name:1})
     nameUser=User.name
  }
  const {
    companyName,
    title,
    description,
    logoUrl,
    location,
    duration,
    locationType,
    skills,
    sallary,
    jobType,
    aboutCompany,
    additionalInfo,
  } = req.body;
  if (
    !companyName ||
    !title ||
    !description ||
    !logoUrl ||
    !location ||
    !duration ||
    !locationType ||
    !skills ||
    !sallary ||
    !jobType ||
    !aboutCompany ||
    !additionalInfo 
    // !fileImage
  ) {
    return res.status(500).send({
      message: "field Error",
    });
  }
  try {
    const user_job = new job({
      companyName,
      title,
      description,
      sallary,
      logoUrl,
      location,
      duration,
      locationType,
      skills,
      userId,
      userName:nameUser,
      jobType,
      aboutCompany,
      additionalInfo,
      // fileImage
    });
    // console.log(user_job);
    await user_job.save();
    res.send({
      message: "job created successfully😊",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in jobs",
    });
    // console.log(error);
  }
};

const getjobDetails = async (req, res) => {
  try {
    const token = req.headers["authorization"];
    const userId = verifyEditable(token);
    const { jobId } = req.params;
    const jdDetails = await job.findById(jobId);
    if (!jdDetails) {
      return res.status(400).json({
        message: "data not found",
      });
    }

    let flag = false;
    if (userId) {
      if (userId === jdDetails.userId.toString()) {
        flag = true;
      }
    }
    res.json({
      data: jdDetails,
      flag,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in jobs id",
    });
  }
};

const updateDetails = async (req, res) => {
  try {
    // const fileImage=req.file.filename
    const { jobId } = req.params;
    const userId = "65f2d8f8a13ea5d4cc217707";

    if (!jobId) {
      return res.status(400).send({
        message: "Error in jobs id",
      });
    }

    const isJobexist = await job.findOne({  _id: jobId });

    if (!isJobexist) {
      return res.status(400).send({
        message: "job doesnot exist",
      });
    }

    const {
      companyName,
      title,
      description,
      logoUrl,
      location,
      duration,
      locationType,
      skills,
      sallary,
      jobType,
      aboutCompany,
      additionalInfo,
    } = req.body;
    if (
      !companyName ||
      !title ||
      !description ||
      !logoUrl ||
      !location ||
      !duration ||
      !locationType ||
      !skills ||
      !sallary ||
      !jobType ||
      !aboutCompany ||
      !additionalInfo 
      // ! fileImage
    ) {
      res.status(500).send({
        message: "field Error",
      });
    }
    // console.log(req)
    await job.updateOne(
      {  _id: jobId },
      {
        $set: {
          companyName,
          title,
          description,
          logoUrl,
          location,
          duration,
          locationType,
          skills,
          sallary,
          jobType,
          aboutCompany,
          additionalInfo,
          // fileImage
        },
      }
    );
    res.send({
      message: "updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).send({
      message: "Error in job details updation",
    });
  }
};

const allJobdetails = async (req, res) => {
  try {
    const title = req.query.title || "";
    const skills = req.query.skills || "";
    let skillsData;
    let filter = {};
    if (skills) {
      skillsData = skills.split(",");
      filter = { skills: { $in: skillsData } };
    }
    const data = await job.find(
      { title: { $regex: title, $options: "i" }, ...filter }
    );
    if (!data) {
      return res.status(400).send({
        message: "job data not found",
      });
    }
    res.json({
      data,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({
      message: "Error in job fetching",
    });
  }
};

module.exports = { jobController, getjobDetails, updateDetails, allJobdetails };
