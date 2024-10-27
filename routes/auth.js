const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const resHandler = require("../middleware/resHandler");

// register
router.post("/register", async (req, res) => {
  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(
      req.body.password.toString().toLowerCase(),
      salt
    );

    let emailExist = await User.findOne({
      emailId: req.body.emailId.trim().toLowerCase(),
    });

    if (emailExist) {
      return resHandler(res, 400, false, "email already exist", "");
    } else {
      if (!req.body.emailId) {
        return resHandler(res, 400, false, "email required", "");
      }
      if (!req.body.password) {
        return resHandler(res, 400, false, "password required", "");
      }
      if (!req.body.name) {
        return resHandler(res, 400, false, "name required", "");
      }
      if (!req.body.mobile) {
        return resHandler(res, 400, false, "mobile required", "");
      }
      let data = {
        name: req.body.name.toLowerCase(),
        emailId: req.body.emailId.toLowerCase(),
        mobile: req.body.mobile.toString(),
        bio: "",
        gender: req.body.gender.toLowerCase(),
        password: hashedPassword,
      };
      let newUser = await User.create(data);

      // res, code, isSuccess, msg, data
      resHandler(res, 200, true, "User signup successfully", newUser);
    }
  } catch (err) {
    resHandler(res, 500, false, " signup catch err", err);
  }
});

// login
router.post("/login", async (req, res) => {
  const emailId = req.body.emailId.toString().trim().toLowerCase();
  const pass = req.body.password.toString().toLowerCase();
  try {
    const user = await User.findOne({ emailId });
    console.log("user", user);
    if (!user) return resHandler(res, 400, false, "User not found", "");

    const validPassword = await bcrypt.compare(pass, user.password);

    if (!validPassword)
      return resHandler(res, 400, false, "Wrong password", "");

    resHandler(res, 200, true, "User found successfully", user);
  } catch (err) {
    resHandler(res, 500, false, " login catch err", err);
  }
});

module.exports = router;
