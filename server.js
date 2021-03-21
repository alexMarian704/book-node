const express = require("express");
const mongoose = require("mongoose");
const Book = require("./schema/schema"); 
const router = require("./routes/routes");
const bodyParser = require("body-parser");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
require('dotenv').config()

const host = process.env.NAME;
const password = process.env.PASSWORD;

const app = express();
const port = 5000;

const link  = `mongodb+srv://@cluster0.nkbze.mongodb.net/first-node?retryWrites=true&w=majority`
mongoose.connect(link , {useNewUrlParser:true , useUnifiedTopology:true})
    .then((result)=> {app.listen(port),console.log("connected")})
    .catch((err) => console.log(err));

app.set("view engine" , "ejs")
app.use(express.urlencoded({extended:true}))
app.use(express.static('public'))
app.use(express.static('images'));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))

app.get('/' , (req,res)=>{
    Book.find()
    .then((result)=>{
        // console.log(result)
        res.render("index" , {title: "Books"  , book:result , navId:"navId"});
    })
    .catch((err)=>{
        console.log(err);
    })
})

app.use("/book",router)

app.use((req,res)=>{
    res.status(404).render("404" , {title : "404", navId : "nu"});
})
