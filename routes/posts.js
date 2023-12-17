const router = require("express").Router();
const Post = require("../models/Post");

//add post
router.post("/add", async (req, res) => {
    let post = new Post(req.body);
    let result = await post.save();
    res.send(result); 
//   try {
//     const newPost = new Post(req.body);
//     newPost.save()
//       .then(() => {
//         res
//           .status(200)
//           .json({ status: true, message: "post added sucessfully" });
//       })
//       .catch((err) => {
//         res.status(500).json(err);
//       });
//   } catch (err) {
//     res.status(500).json(err);
//   }
});

// update post
router.put("/update/:id", async (req, res)=>{
    try{
        Post.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })
        .then(() => {
          res
            .status(200)
            .json({ status: true, message: "post data updated successfully" });
        })
        .catch((err) => {
          res.status(500).json(err);
        });
    }catch(err){
        res.status(500).json(err);
    }
})

// delete post

// get post details by id

//get all posts


// get all posts of any user

module.exports = router;
