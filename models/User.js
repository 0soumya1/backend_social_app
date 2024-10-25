const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      default: "",
    },
    emailId: {
      type: String,
      default: "",
    },
    mobile: {
      type: String,
      default: "",
    },
    bio: {
      type: String,
      default: "",
    },
    password: {
      type: String,
      required: true,
      default: "",
    },
    gender: {
      type: String,
      default: "",
    },
    dob: {
      type: String,
      default: "",
    },
    address: {
      type: String,
      default: "",
    },
    profilePic: {
      type: String,
      default: "",
    },
    coverPic: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
