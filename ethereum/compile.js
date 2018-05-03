const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

//Path to build directory
const buildPath = path.resolve(__dirname, 'build');
//Remove build directory
fs.removeSync(buildPath);

//Path to MemoryBank contract file
const contractPath = path.resolve(__dirname, 'contracts', 'MemoryBank.sol');
//Read contents of MemoryBank cotract file
const source = fs.readFileSync(contractPath, 'utf8');
//Compile MemoryBank contract and save only contracts output to variable 
const output = solc.compile(source, 1).contracts;

//Check that build directory exists. If not(we just removed it), create it
fs.ensureDirSync(buildPath);

//For every contract in output, save it to json file.
for (let contract in output) {
  fs.outputJsonSync(
    path.resolve(buildPath, contract.replace(':','') + '.json'),
    output[contract]
  );
}

// To compile, run node compile.js