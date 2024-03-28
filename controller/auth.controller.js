const user = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const registerUser = async (req, res) => {
  const { name, email, password, phone } = req.body;
  if (!name || !email || !password || !phone) {
    res.status(404).send({ message: "field error" });
  }
  const duplicacyCheck = await user.findOne({ email: email });
  if (duplicacyCheck) {
    return res.send({ message: "duplicate email" });
  }
  const hashedPassword = await bcrypt.hash(password, 5);
  try {
    const newuser = new user({
      name,
      email,
      password: hashedPassword,
      phone,
    });
    await newuser.save();
    res.send("user created sucessfully");
  } catch (error) {
    res.status(500).json({
      message: "error catch",
    });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const isEmailExist = await user.findOne({ email: email });
  if (!isEmailExist) {
    return res.status(500).send({
      message: "user doesnot exist!",
      status:500
    });
  }
  try {
    const decryptPassword = await bcrypt.compare(
      password,
      isEmailExist.password
    );
    if (!decryptPassword) {
      return res.status(400).send({
        message: "password error",
        status:404
      });
    } else {
      const token =  jwt.sign({userId:isEmailExist._id}, process.env.SECRET_KEY);
      return res.send({
        message: "successfully loged-in",
        token
      });
    }
  } catch (error) {
    res.status(400).send({
      message: "Error in login",
    });
  }
};

module.exports = { registerUser, loginUser };
