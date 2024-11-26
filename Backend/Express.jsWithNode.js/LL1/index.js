import express from 'express';
const app = express();

// Initialsie our server name in a constant
const port=5000;
  
app.listen(port,() => {
    console.log(`Our Server is ${port}`); /*call back function it tells us or remind us swhere our code is running */
});
  