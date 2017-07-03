const fs = require('fs');
const output = require('d3node-output');
const d3 = require('d3-node')().d3;
const d3nPie = require('../');

const csvString = fs.readFileSync('data/data.csv').toString();
const data = d3.csvParse(csvString);

// create output files
output('./example/output', d3nPie({ data: data }));
