const express = require("express");
const app = express();

const mongoose = require("mongoose");
const morgan = require("morgan");
const helmet = require("helmet");
const dotenv = require("dotenv");

const authRouter = require("./routes/auth");
const userRouter = require("./routes/users");
const postRouter = require("./routes/posts");
const commentRouter = require("./routes/comments");

dotenv.config();
app.use(express.json());
app.use(helmet()); 
app.use(morgan("common"));
app.use("/uploads", express.static("uploads"));
//http://localhost:5000/uploads/1703429826773_food.jpg
app.use("/socialapp/api/auth", authRouter);
app.use("/socialapp/api/users", userRouter);
app.use("/socialapp/api/post", postRouter);
app.use("/socialapp/api/post/comment", commentRouter);

app.get("/",(req,res)=>{
    res.send("hello user");
})

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("mongodb database connected");
  });

app.listen(5000, () => {
  console.log("app is running on " + 5000);
});
