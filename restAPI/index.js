const express= require ('express');
const users = require ('./MOCK_DATA.json');
const mongoose = require('mongoose');
const app= express();

const port= 3000;

//To print all user names 
app.get('/users',(req,res)=>{
    // an html format is created there
   const html=`
        <ul>
            ${users.map((user)=>`<li>
                ${user.first_name}
            </li>`).join("")}
        </ul>
   `;
//    res.send --> to send response to user
   res.send(html);
});

// To print only the specific id of the users
app.get('/api/users/:id', (req,res)=>{
    // request for the id of the user
    const id= Number(req.params.id);
    // match if that id is find in the database or not
    const user= users.find((user)=>user.id===id);
    // return the data in the form of json file 
    return res.json(user);
})

// Rests API to print all the data
app.get('/api/users',(req,res)=>{
    res.setHeader("X-myname",12);
 return res.json(users);
});


app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
});