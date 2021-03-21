const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;

const comments = new Schema({
    text:{
        type:String,
        required:true
    },
    parenBook:{
        type:ObjectId,
        ref: "Book"
    }
},{timestamps:true});

const Comment = mongoose.model("Comment" , comments);

module.exports = Comment;