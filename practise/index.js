// console.log("hello");
// const fs = require("fs");
const http= require("http");

// const os= require("os");
// console.log(os.cpus().length);
const port=3000;


// fs.readFile("contacts.txt","utf-8",(err,data)=>{   
//     if (err) throw err;
//     console.log(data);
// });  
const myserver=http.createServer((req,res)=>{
    // console.log(req);
    res.send("hello from ndoe js");
});

myserver.listen(port,()=>{
    console.log(`server is running at ${port}`);
});