const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const { marked } = require('marked');
const routeRelative = 'pruebaDirectory';


function pathAbsolute(pathParameter) {
    let pathForChange = '';
    if (!path.isAbsolute(pathParameter)) {
        pathForChange = path.resolve(pathParameter);
    } else {
        pathForChange = pathParameter;
    }
    return pathForChange;
}

function getFilesMD(pathFileMD) { // Se lee el archivo o directorio (Directorio -> recursividad)
    const isAFile = fs.statSync(pathFileMD).isFile();
    const isADirectory = fs.statSync(pathFileMD).isDirectory();
    const fileExtension = path.extname(pathFileMD);
    let arrayMD = [];
    let pathObtain = pathAbsolute(pathFileMD);
    // Leyendo archivo, comparando .md y obteniendo array
    if (isAFile && fileExtension === '.md') {
        arrayMD.push(pathObtain)
    } else if (isAFile && fileExtension !== '.md') {
        console.log(chalk.red('Archivo no tiene extensión .md son', fileExtension))
    } else { // Leyendo directorio, comparando .md, empujando los nuevos resultados al array
        fs.readdirSync(pathFileMD).forEach(file => {
            let dirPath = path.join(pathFileMD, file);
            if (isADirectory) {
                arrayMD = arrayMD.concat(getFilesMD(dirPath))
            } else {
                if (path.extname(dirPath) === '.md') {
                    arrayMD.push(dirPath)
                }
            }
        })
    }
    return arrayMD; // Retornando un array de archivos MD 
}
// console.log(getFilesMD(routeRelative))


const arrayMDFiles = getFilesMD(routeRelative);

// Leer el archivo .md y extraer los links
const getLinks = (arrMdFiles) => {
    let mdLinks = [];
    arrMdFiles.forEach((filesMD) => {
        mdLinks.push(
            new Promise((resolve, reject) => {
                fs.readFile(filesMD, 'utf-8', (err, data) => {
                    if (err) {
                        console.error(err);
                    } else {
                        resolve({
                            path: filesMD,
                            data: data,
                        })
                    }
                });
            })

        )
    })
    return mdLinks;
    // return new Promise((resolve, reject) =>{
    //     const mdLinks = [];
    //     const fileExtension = path.extname((arrMdFiles) === '.md');
    //     const selectMDLinks = fileExtension(arrMdFiles);
    //     if(!selectMDLinks){
    //         resolve(mdLinks);
    //     }
    // })

    // usar readfile con forEache
    // filter para extraer los links con una condición
}

console.log(getLinks(arrayMDFiles))

module.exports = { getFilesMD, pathAbsolute }