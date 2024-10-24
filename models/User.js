const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        max: 50,
        required: true,
    },
    emailId:{
        type: String,
        max: 50,
        required: true,
        // unique: true
    },
    mobile:{
        type: String,
        max: 10,
        required: true,
        // unique: true
    },
    bio:{
        type:String,
        default:""
    },
    password:{
        type: String,
        max: 50,
        required: true,
    },
    gender:{
        type: String,
        max: 50,
        required: true,
    },
    dob:{
        type: String,
        max: 50,      
    },
    address:{
        type: String,
        max: 50,       
    },
    profilePic:{
        type: String,
        default:""     
    },
    coverPic:{
        type: String,
        default:""     
    },
    followers:{
        type: Array,
        default:[]    
    },
    following:{
        type: Array,
        default:[]    
    },
},{timestamps:true});

module.exports = mongoose.model("User", userSchema);