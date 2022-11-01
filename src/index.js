const chalk = require('chalk');
const fs = require('fs')
const path = require('path');
const marked = require('marked');
const axios = require('axios');
const routeTest = 'testmd';

//Convertir la ruta de relativa a absolut
const processPath = process.argv[2];


const pathAbsolute = (route) => {
  const absoluteRoute = path.resolve(route).normalize();
  if (!path.isAbsolute(processPath)) {
    return absoluteRoute;
  } else {
    return processPath;
  }
};

function getMDfiles(allFileMD) {
  const isFile = fs.statSync(allFileMD).isFile();
  const isDirectory = fs.statSync(allFileMD).isDirectory();
  const readextName = path.extname(allFileMD);
  let arrayMarkDown = [];
  let pathContainer = pathAbsolute(allFileMD);
  // console.log(chalk.cyan(pathContainer));
  if (isFile && readextName === '.md') {
    arrayMarkDown.push(pathContainer)
    // console.log(chalk.magenta(arrayMarkDown));
  } else if (isFile && readextName !== '.md') {
    // console.log(chalk.red('Archivo no tiene extensión .md son', readextName))
  } else if (isDirectory === true) {
    fs.readdirSync(allFileMD).forEach(file => {
      let routePath = path.join(allFileMD, file);
      // console.log(fs.readdirSync(allFileMD))
      // console.log(chalk.magenta(routePath));
      if (isDirectory) {
        arrayMarkDown = arrayMarkDown.concat(getMDfiles(routePath))
      } else {
        if (path.extname(routePath) === '.md') {
          arrayMarkDown.push(routePath)
        }
      }
    })
  }
  return arrayMarkDown; // Retornando un array de archivos MD 
}

const containerArray = getMDfiles(routeTest);

const readMd = (file) => {
  // "[hola](test) l l ll ll l ll [hola2](test2)".match(/\[([^\[\]]*)\]\((.*?)\)/g)
  return new Promise((resolve, reject) => {
    let arrayObjects = [];
    fs.readFile(file, 'utf8', (err, datafile) => {
      if (err) { resolve(err) };
      const renderer = new marked.Renderer()
      renderer.link = function (href, title, text) {
        const objectContainer = {
          'href': href,
          'text': text,
          'file': file,
        }
        if (objectContainer.href.includes('http')) {
          arrayObjects.push(objectContainer);
        }
      }
      marked.marked(datafile,
        { renderer })
      
      resolve(arrayObjects);
    });
  })  
}  
const getAllobjects = (arraysMD) => {
const returnPromise= arraysMD.map(file => readMd(file));
return Promise.all(returnPromise).then(res => res.flat());
}
// readMd(processPath).then((val) => { console.log("probando", val) })

function processLink(link) {
  return new Promise((resolve, reject) => {
    axios.get(link.href)
      .then((response) => {
        if(response.status >= 200 && response.status < 400){
        link.status = response.status
        link.ok = '✅';
        resolve(link);
         }
      }) .catch((error) => {
        let status = 500; 
        if(error.response){
          status = error.response.status
        }else if(error.request){
          status = 503;
        }
        link.status = error.status
        link.ok = '🚫';
        resolve(link);
      }); 
    })
    
}
  const getvalidateLinks = (validateLinks) => {
    let returnValidateLinks= validateLinks.map(link => processLink(link));
  return Promise.all(returnValidateLinks).then(res => res);
  }



const markDownLinks = (Path, option={validate:true}) => {
  return new Promise((resolve, reject) => {
    const verifyAbsolut = pathAbsolute(Path);
    const containerArray = getMDfiles(verifyAbsolut);
   if(option.validate){
    getAllobjects(containerArray)
    .then(res => getvalidateLinks(res))
    .then(res2 => resolve(res2))
   }else {
    getAllobjects(containerArray)
    .then(res => resolve(res))
   }
  })
}

markDownLinks(processPath).then((data) => {
  console.log("si sirve", data);
});
//prueba subir readme. 