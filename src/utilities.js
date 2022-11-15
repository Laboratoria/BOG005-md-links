const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const marked = require('marked');
const fetch = require('node-fetch');
const routeRelative = 'src/testFile.md';
const folderRelative = 'testDirectory';


function pathAbsolute(pathParameter) { // Convirtiendo la ruta relativa en absoluta
    let pathForChange = '';
    if (!path.isAbsolute(pathParameter)) {
        pathForChange = path.resolve(pathParameter);
    } else {
        pathForChange = pathParameter;
    }
    return pathForChange;
}
// console.log(chalk.magenta(pathAbsolute(folderRelative)));

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

    } else { // Leyendo directorio, comparando .md, empujando los nuevos resultados al array
        fs.readdirSync(pathFileMD).forEach(file => {
            let dirPath = path.join(pathFileMD, file);
            if (isADirectory) {
                arrayMD = arrayMD.concat(getFilesMD(dirPath)) // Recursividad: función dentro de una función
            } else {
                if (path.extname(dirPath) === '.md') {
                    arrayMD.push(dirPath)
                }
            }
        })
    }
    return arrayMD; // Retornando un array de archivos MD 
}
// console.log(getFilesMD(folderRelative))

const arrayFilesMDS = getFilesMD(folderRelative);
// Solo saca la info de readFile

// Leer un archivo .md y extraer los links
function obtainInfoLink(filePathMD) {
    return new Promise((resolve, reject) => {
        const infoLink = [];
        fs.readFile(filePathMD, 'utf-8', (err, data) => {
            if (err) resolve(err);
            marked.marked(data, {
                walkTokens: (token) => {
                    if (token.type === 'link' && token.href.includes('http')) {
                        infoLink.push({
                            href: token.href,
                            text: token.text,
                            file: filePathMD,
                        })
                    }
                }
            })
            resolve(infoLink);
        })
    })
}
// obtainInfoLink(routeRelative).then((val) => { console.log(val) }) //.then dice que hacer cuando la promesa exitosa

// Leer el array de archivos y extraer info links con obtainInfoLink
function getInfoLinks(allFilesMD) {
    return new Promise((resolve, reject) => {

        const arrAllFilesMD = allFilesMD.map((file) => obtainInfoLink(file))

        Promise.all(arrAllFilesMD).then((value) => {
            resolve(value.flat())
        })
    })
}
// getInfoLinks(arrayFilesMDS).then((val) => {console.log(val)})

// realizando la validación HTTP
function getRequestHTTP(filePathMD) {
    const requestHTTP = filePathMD.map((link) => {
       return fetch(link.href).then((answer) => {
            link.status = answer.status;
            link.txt = answer.status <= 299 ? 'Ok' : 'Fail';
            //console.log('soy link', link)
            return (link);

        })
    })
    return Promise.all(requestHTTP)
}

module.exports = { getFilesMD, pathAbsolute, getInfoLinks, getRequestHTTP }


