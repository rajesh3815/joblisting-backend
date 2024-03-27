const express = require("express");
const { registerUser, loginUser } = require("../controller/auth.controller");
const authroute = express.Router();

authroute.post("/register", registerUser);
authroute.post("/login", loginUser);

module.exports = authroute;
