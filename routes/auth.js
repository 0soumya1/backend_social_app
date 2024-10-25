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
  try {
    const user = await User.findOne({ emailId: req.body.emailId });
    !user && res.status(200).json({ status: false, message: "User not found" });
    if (user) {
      const validPassword = await bcrypt.compare(
        req.body.password,
        user.password
      );
      if (validPassword) {
        res.status(200).json({
          status: true,
          message: "User found successfully",
          data: user,
        });
      } else {
        res.status(200).json({ status: false, message: "Wrong Credential" });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
