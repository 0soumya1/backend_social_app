const router = require("express").Router();
const bcrypt = require("bcrypt");
const User = require("../models/User");
const resHandler = require("../middleware/resHandler");

//update
router.put("/update/:id", async (req, res) => {
  // if (req.body.password) {
  //           const salt = await bcrypt.genSalt(10);
  //           req.body.password = await bcrypt.hash(req.body.password, salt);
  //         }
  // let result = await User.updateOne(
  //     {_id:req.params.id},
  //     {$set: req.body}
  // )
  // res.send(result);
  try {
    if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
      .then(() => {
        res
          .status(200)
          .json({ status: true, message: "user data updated successfully" });
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  } catch (err) {
    res.status(500).json(err);
  }
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
      res.status(200).json({
        status: true,
        message: "user fetched successfully",
        data: user,
      });
    !user && res.status(200).json({ status: false, message: "user not found" });
  } catch (err) {
    res.status(500).json(err);
  }
});

// get user by username and id
router.get("/", async (req, res) => {
  const userId = req.query.userId;
  const name = req.query.name;
  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ name: name });
    const { password, updatedAt, ...other } = user._doc;
    resHandler(res, 200, true, "get user success", other);
  } catch (err) {
    resHandler(res, 500, false, "get user catch err", err);
  }
});

//follow
router.put("/follow/:id", async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.params.id });
    // const currentUser = await User.findOne({ _id: req.body.userId });

    let isFollowed = false;
    user.followers.map((item) => {
      if (item == req.body.userId) {
        isFollowed = true;
      }
    });

    if (isFollowed) {
      const res1 = await User.updateOne(
        { _id: req.params.id },
        { $pull: { followers: req.body.userId } }
      );
      const res2 = await User.updateOne(
        { _id: req.body.userId },
        { $pull: { following: req.params.id } }
      );
      res
        .status(200)
        .json({ status: false, message: "unfollowed user successfully" });
    } else {
      const res1 = await User.updateOne(
        { _id: req.params.id },
        { $push: { followers: req.body.userId } }
      );
      const res2 = await User.updateOne(
        { _id: req.body.userId },
        { $push: { following: req.params.id } }
      );
      res
        .status(200)
        .json({ status: true, message: "followed user successfully" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

//unfollow
// router.put("/unfollow/:id", async (req, res) => {
//   try {
//     const user = await User.findOne({ _id: req.params.id });
//     const currentUser = await User.findOne({ _id: req.body.userId });

//     let isFollowed = false;
//     user.followers.map((item) => {
//       if (item == req.body.userId) {
//         isFollowed = true;
//       }
//     });

//     if (!isFollowed) {
//       res
//         .status(200)
//         .json({ status: false, message: "you are not following this user" });
//     } else {
//       const res1 = await User.updateOne(
//         { _id: req.params.id },
//         { $pull: { followers: req.body.userId } }
//       );
//       const res2 = await User.updateOne(
//         { _id: req.body.userId },
//         { $pull: { following: req.params.id } }
//       );
//       res
//       .status(200)
//       .json({ status: true, message: "unfollowed user successfully" });
//     }
//   } catch (err) {
//     res.status(500).json(err)
//   }
// });

module.exports = router;
