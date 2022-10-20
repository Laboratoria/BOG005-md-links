const fs = require('fs');
const path = require('path');
const chalk = require('chalk');
const routeRelative = 'pruebaBadDirectory';
const routeAbsolute = '/Users/dana/Documents/Dana 2022/Laboratoria/BOG005-md-links/src/prueba.md';


function pathAbsolute(pathParameter) {
    let pathAbsolute = '';
    if (!path.isAbsolute(pathParameter)) {
        pathAbsolute = path.resolve(pathParameter);
    } else {
        pathAbsolute = pathParameter;
    }
    return pathAbsolute;
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
    } else if(isAFile && fileExtension !== '.md'){
        console.log(chalk.red('Archivo no tiene extensión .md son', fileExtension))
    } else{ // Leyendo directorio, comparando .md, empujando los nuevos resultados al array
        fs.readdirSync(pathFileMD).forEach(file => {
            let dirPath = path.join(pathFileMD, file);
            if(isADirectory){
                arrayMD = arrayMD.concat(getFilesMD(dirPath))
            } else{
                if(path.extname(dirPath) === '.md'){
                    arrayMD.push(dirPath)
                }
            }
        })
    }
    return arrayMD; // Retornando un array de archivos MD 
}

console.log(getFilesMD(routeRelative))

module.exports = { getFilesMD, pathAbsolute }