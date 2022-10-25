const fs = require('fs');
const path = require('path');
const routeRelative = ('src/prueba.md'); 


fs.readFile(routeRelative, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
