const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: false
    },
    username: {
        type: String,
        required: true
    },
    category: {
        type: Array,
        required: false
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    comments: {
        type: Array,
        required: false
        
    }
},{timestamp: true});

module.exports= mongoose.model('Post', PostSchema);