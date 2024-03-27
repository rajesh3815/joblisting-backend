const express = require("express");
const cors = require("cors");
require("dotenv").config();
const mongoose = require("mongoose");
const userAuth = require("./routes/auth.routes");
const jobRoute = require("./routes/jobs.routes");
const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/v1/auth", userAuth);
app.use("/api/v1/jobs", jobRoute);

app.get("/api/health", (req, res) => {
  res.send({
    message: "API is working",
    time: Date.now(),
  });
});

app.listen(4000, async () => {
  try {
    await mongoose.connect(process.env.URL);

    console.log("DB connected");
  } catch (error) {
    console.log("db connection error");
  }

  console.log("server is up :)");
});
