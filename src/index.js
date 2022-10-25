const fs = require('fs');
const path = require('path');
const {pathAbsolute, getFilesMD, getInfoLinks} = require('./utilities.js');
const chalk = require('chalk');
const routeRelative = 'testDirectory';


// function existsFile(path) {
//   return fs.existsSync(path);
// }
// console.log(existsFile(path))

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    const absolutPath = pathAbsolute(path);
    const arrayFileMDS = getFilesMD(absolutPath);
    const obtainInfoLinks = getInfoLinks(arrayFileMDS);
    console.log(obtainInfoLinks)
    resolve(obtainInfoLinks);

  })

}
mdLinks(routeRelative).then((data)=>{
  console.log(data)
})

