const fs = require('fs');
const path = '/Users/dana/Documents/Dana 2022/Laboratoria/BOG005-md-links/src/prueba.md';
console.log(path)

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

// function existsFile(path) {
//   return new Promise((resolve, reject) => {
//   fs.stat(path, (err, stats) => {
//     if (path === 'null') {
//       reject(err);
//     }
//     // resolvemos la promesa
//     resolve(stats.isFile());
//   });
// })}; 

// existsFile(path)
// .then(exists => {
//   if(exists) {
// console.log("existe")
//   } else {
// //lanza error
//   }
// })
// .catch(err => {
//   console.log("error")
// });

// module.exports = { existsFile }; 