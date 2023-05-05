const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profile_pic: {
        type: String,
        default: "https://www.pngarts.com/files/10/Default-Profile-Picture-Download-PNG-Image.png"
    },
    isAdmin: {
        type: Boolean // True if Teacher False if Student
    }
    
},{timestamps: true});

module.exports= mongoose.model("User", userSchema);