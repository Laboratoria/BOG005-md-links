const fs = require('fs');
const path = require('path');
const {pathAbsolute, getFilesMD} = require('./utilities.js');
const chalk = require('chalk');
const routeRelative = 'pruebaDirectory';


// function existsFile(path) {
//   return fs.existsSync(path);
// }
// console.log(existsFile(path))

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    const absolutPath = pathAbsolute(path);
    const arrayFileMDS = getFilesMD(absolutPath);
    resolve(arrayFileMDS);

  })

}
mdLinks(routeRelative).then((data)=>{
  console.log(data)
})

