
const fs = require('fs');
const axios = require("axios");
const chalk= require("chalk")

fs.readFile('src/text.txt', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});

var path = require('path');
//Return the extension:
var ext = path.extname('./src/index.js');
console.log(ext);



const folderPath = '/Users/Usuario/BOG005-md-links';
fs.readdirSync(folderPath);
console.log(fs.readdirSync(folderPath));


// Getting information for a file
statsObj = fs.statSync("README.md");
  
console.log(statsObj); 
console.log("Path is file:", statsObj.isFile());
console.log("Path is directory:", statsObj.isDirectory());
  
// Getting information for a directory
statsObj = fs.statSync("README.md");
  
console.log(statsObj);
console.log("Path is file:", statsObj.isFile());
console.log("Path is directory:", statsObj.isDirectory());



axios.get('https://es.wikipedia.org/wiki/Markdown')
  .then(response => {
    console.log(response.status);
    console.log(response.statusText);
  })
  .catch(error => {
    console.log(error.status);
    console.log(error.statusText);
  });