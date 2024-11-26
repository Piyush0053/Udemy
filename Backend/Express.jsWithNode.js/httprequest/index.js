import express from 'express';
const app = express();

const port= 3000;
app.listen(3000, ()=>{
    console.log(`Our port is ${port}`);
});

app.get('/', function (req, res) {
  res.send('Hello World')
})
