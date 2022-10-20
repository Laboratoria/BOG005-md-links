const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const routeRelative = 'src/prueba.md';
const absoluteRoute = '/Users/dana/Documents/Dana 2022/Laboratoria/BOG005-md-links/src/prueba.md';

console.log(chalk.magenta(path));

function existsFile(path) {
  return fs.existsSync(path);
}

console.log(existsFile(path))

const mdLinks = (path, options) => {
  return new Promise((resolve, reject) => {
    if (fs.existsSync(path) === true) {
resolve(console.log("Existe"))
    } else {
      reject(new Error('No es una ruta válida'));
    }
  })

}
mdLinks(path)

