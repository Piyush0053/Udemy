import express from 'express'
const app=express()
const port=3000

app.get('/',(req,res)=>{
    const data={
        title:"EJS Tags",
        seconds: new Date().getSeconds(),
        items:["apple","banana","cherry"],
        htmlContent:"<strong> This is some em text</strong>",
    }
    // if(data.seconds%2===0){

    // }
    res.render("index.ejs",data)
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`)
})