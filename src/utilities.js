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
