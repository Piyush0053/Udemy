import express from 'express';
const app = express();

const port= 3000;
app.listen(port, ()=>{
    console.log(`Your server is: ${port}`);
});
app.get('/', function (req, res) {
  res.send('Hello !');
});
app.get('/contacts', function (req, res) {
  res.send('Hello fan');
});
app.get('/about', function (req, res) {
  res.send('Hello ffucking');
});

