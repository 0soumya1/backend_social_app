const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");

//update
router.put("/update/:id", async (req, res) => {
    // if (req.body.password) {
    //           const salt = await bcrypt.genSalt(10);
    //           req.body.password = await bcrypt.hash(req.body.password, salt);
    //         }
    let result = await User.updateOne(
        {_id:req.params.id},
        {$set: req.body}
    )
    res.send(result);
//   try {
//     if (req.body.password) {
//       const salt = await bcrypt.genSalt(10);
//       req.body.password = await bcrypt.hash(req.body.password, salt);
//     }
//     User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
//       .then(() => {
//         res
//           .status(200)
//           .json({ status: true, message: "user data updated successfully" });
//       })
//       .catch((err) => {
//         res.status(500).json(err);
//       });
//   } catch (err) {
//     res.status(500).json(err);
//   }
});

//delete
router.delete("/delete/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    if (user) {
      User.findByIdAndDelete({ _id: req.params.id }).then(() => {
        res.status(200).json({ status: true, message: "User deleted" });
      });
    } else {
      res
        .status(200)
        .json({ status: false, message: "User not found by this id" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

// get users
router.get("/get", (req, res) => {
  User.find()
    .then((users) => {
      res.status(200).json({
        status: true,
        message: "users fetched successfully",
        data: users,
      });
    })
    .catch((err) => {
      res.status(500).json(err);
    });
});

// get user by id
router.get("/getUser/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    user &&
      res
        .status(200)
        .json({
          status: true,
          message: "user fetched successfully",
          data: user,
        });
    !user && res.status(200).json({ status: false, message: "user not found" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
