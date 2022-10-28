const fs = require('fs');
const path = require('path');
const { pathAbsolute, getFilesMD, getInfoLinks, getRequestHTTP } = require('./utilities.js');
const chalk = require('chalk');
const routeRelative = 'src/testFile.md';
const folderRelative = 'testDirectory';


const mdLinks = (path, options = { validate: true }) => {
  return new Promise((resolve, reject) => {
    const absolutPath = pathAbsolute(path);
    const arrayFileMDS = getFilesMD(absolutPath);
    const obtainInfoLinks = getInfoLinks(arrayFileMDS);
    if (options.validate === false) {
      resolve(obtainInfoLinks);
    } else {
      getInfoLinks(arrayFileMDS).then((res) => {
        getRequestHTTP(res).then(obj => resolve(obj))
      })
    }
  })

}
mdLinks(routeRelative).then((data) => {
  // console.log('soy yo?', data)
  console.table(data)
})

