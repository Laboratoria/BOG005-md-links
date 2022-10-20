const fs = require('fs');
const path = require('path');
console.log(path)


fs.readFile(path, 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log(data);
});
