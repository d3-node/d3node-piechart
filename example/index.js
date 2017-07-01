const output = require('d3node-output');
const d3nPie = require('../');

const gen = n => {
  const data = [];

  for (let i = 0; i < n; ++i) {
    data.push({
      key: `item ${i}`,
      value: Math.max(10, Math.floor(Math.random() * 1000)),
    });
  }

  return data;
};

// create output files
output('./example/output', d3nPie({ data: gen(5) }));
