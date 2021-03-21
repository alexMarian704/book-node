const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const books = new Schema({
    title:{
        type:String,
        require:true,
    },
    author:{
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:false,
    },
    poster:{  
        type:String,
        required:false
    },
    pages:{
        type:String,
        require:true,
    }
}, {timestamps:true});

const Book = mongoose.model("Book" , books);

module.exports = Book;