const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
      unique: true,
    },
    password: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
  },
  { timestamps: { createdAt: "", updatedAt: "" } }
);

const userModel = new mongoose.model("userModel", userSchema);

module.exports =  userModel ;
