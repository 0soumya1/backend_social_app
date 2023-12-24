const mongoose = require("mongoose");

const commentSchema = new mongoose.Schema({
    comment:{
        type:String,
        max: 200
    },
    userId:{
        type:String,
        required: true
    },
    userName:{
        type:String,
        required: true
    },
    postId:{
        type:String,  
        required: true    
    },
   
}, {timestamps: true})

module.exports = mongoose.model("comments", commentSchema);