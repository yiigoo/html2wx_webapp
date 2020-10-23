const process = require('child_process')
console.log('start ... ')
process.exec('cd ./src && anywhere', (error, stdout, stderr) => {})