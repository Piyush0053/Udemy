const express=require("express");
const app=express();
const port=8080;
// To use the Public and Views Folders
const path=require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require('method-override');

app.use(express.urlencoded({extended:true}));

app.set("view engine","ejs");
app.set("views", path.join(__dirname,"views"));

// To use the public folder
app.use(express.static(path.join(__dirname,"public")));

app.use(methodOverride('_method'));

// Create an array
let posts=[
    {   
        id:uuidv4(),
        username:"Piyush",
        content:"Making Blogs",
    },
    {
        id:uuidv4(),
        username:"Shradha",
        content:"Teaching Blogs",
    },
    {
        id:uuidv4(),
        username:"Sneha",
        content:"Read Blogs",
    },
]

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
})
app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
})

app.post("/posts",(req,res)=>{
    let {username,content}=req.body;

    // To add a id for a new Post 
    let id=uuidv4();
    posts.push({id,username,content});

    // WE can use alternate method for redirecting the page

    // res.render("index.ejs",{posts});

    //  It redirects to the  first get requests  
    res.redirect("/posts");
})

app.get("/posts/:id",(req,res)=>{
    // To fetch the id
    let {id} =req.params;
    // To check if that id is present or not
    let post = posts.find((p)=>id===p.id);
    // Sends request so that user can see that particular post
    res.render("showid.ejs",{post});
})

// To update the content in the Post we use Patch
app.patch("/posts/:id",(req,res)=>{
    let {id} =req.params;
    let post = posts.find((p)=>id===p.id);
    // Yeah Post man Patch ki help se ho raha hai
    // Jo naya content hame add karna hai use requset karo conntent ki body se 
    let newContent=req.body.content;
    // make changes to old Content
    post.content=newContent;
    console.log(post);
    res.redirect("/posts");
})
app.get("/posts/:id/edit",(req,res)=>{
    let {id} =req.params;
    let post = posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
})
app.delete("/posts/:id",(req,res)=>{
    let {id} =req.params;
    posts = posts.filter((p)=>id!==p.id);
    res.redirect("/posts"); 
})
app.listen(port,()=>{
   console.log(`Server is running on port ${port}`);
})