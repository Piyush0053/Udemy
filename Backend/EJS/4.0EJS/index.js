import express from "express";

const app =express();
const port=3000;

app.get("/",(req,res)=>{
    // We initialise a getDay() function we takes the current day
    const today=new Date();
    const day=today.getDay();

    let type="a weekday";
    let adv="it's time to work hard";
    let self="new din";
    if(day===0 || day===6){
        type="a weekend";
        adv="it's time to relax";
    }
    if(day===1){
        type="a Monday";
        adv="it's time to work";
    }
    if(day===2){
        type="a Tuesday";
        adv="it's time to pooja";
    }

    // In EJS we use render method
    res.render("index.ejs",{
        dayType:type,
        advice:adv,
        timeLunch:self,
    });
});

app.listen(port,()=>{
    console.log(`Server running on port${port}.`);
});