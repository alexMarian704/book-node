const express = require("express");
const mongoose = require("mongoose");
const Book = require("../schema/schema");
const multer = require('multer');
const Comment = require("../schema/comment");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
// const myConst = require("../public/delete")
let deleteToggle = true;


const storage = multer.diskStorage({
    destination:function(req , file , cb){
        cb(null , "./images")
    },
    filename:function(req , file , cb){
        cb(null , file.originalname)
    }
})

const upload = multer({
    storage:storage
})

const routes = express.Router()

routes.post("/add", upload.single('poster'),(req,res)=>{
    console.log(req.file)
    const book = new Book({
        title:req.body.title,
        author:req.body.author,
        description:req.body.description,
        pages:req.body.pages,
        poster:req.file.filename,
    });

    book.save()
        .then((result) => {
            res.redirect("/")
        }).catch((err) => {
            console.log(err)
        });
})

routes.get("/add" , (req,res)=>{
    res.render("addbook" , {title:"Add books" , navId:"not"})
})

routes.get("/json" ,(req,res) =>{
    Comment.find()
    .then((result)=>{
        res.json({data: result})
        console.log(Comment)
    })
    .catch((err)=>{
        console.log(err)
    })
})

routes.get("/:id" , async (req,res)=>{
    let id = req.params.id;
    try{
     const bookValue = await Book.findById(id)
     const commentValue = await Comment.find(req.body.parenBook)
     res.render("singlebook" , {book:bookValue , title:"Book" , navId:"not" , id:id , comment:commentValue , deleteToggle:deleteToggle})
    }
    catch(err){
        console.log(err)
    }   
})

routes.post("/:id" , (req,res)=>{
   let id = req.params.id;
   const comment = new Comment({
        text:req.body.text,
        parenBook: id,
   })

   comment.save()
    .then((result) => {
        console.log(result)
        res.redirect(`/book/${id}`)
    }).catch((err) => {
        console.log(err)
    });
})

routes.delete("/:id" , (req,res , next)=>{
    const id = req.params.id;

    if(deleteToggle != true){
    Comment.findOneAndDelete(id)
        .then((result) => {
            console.log("com sters")
            res.json({redirect: `/book/${id}`})
        }).catch((err) => {
            console.log(err);
        });
    }else{
    Book.findByIdAndDelete(id)
        .then((result) => {
            console.log("post sters")
            res.json({ redirect: "/" })
        }).catch((err) => {
            console.log(err)
        });
    }
    
})

module.exports = routes;