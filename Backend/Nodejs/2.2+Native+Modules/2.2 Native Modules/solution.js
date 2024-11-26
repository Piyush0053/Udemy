const fs= require("fs");


//To create and write in the file 

// fs.writeFile('message.txt', "hello from here", (err) => {
//   if (err) throw err;
//   console.log('The file has been saved!');
// }); 

// To read the text witten in the file
fs.readFile('./message.txt', "UTF8", (err, data) => {
  if (err) throw err;
  console.log(data);
}); 