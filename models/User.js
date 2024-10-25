const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      default: "",
    },
    emailId: {
      type: String,
      required: true,
      default: "",
    },
    mobile: {
      type: String,
      required: true,
      default: "",
    },
    password: {
      type: String,
      required: true,
      default: "",
    },
    gender: {
      type: String,
      required: true,
      default: "",
    },
    bio: {
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
