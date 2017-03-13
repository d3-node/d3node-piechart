const D3Node = require('d3-node');

const defaultContainer = `
<div id="container">
  <h2>Pie Chart</h2>
  <div id="chart"></div>
</div>`;

const defaultStyle = `
 .arc text {font: 10px sans-serif; text-anchor: middle;}
 .arc path {stroke: #fff;}
`;

function pieChart (data, selector = '#chart', container = defaultContainer, style = defaultStyle/*, options*/) {

  const d3n = new D3Node({
    selector: selector,
    svgStyles: style,
    container: container
  });

  const d3 = d3n.d3;

  // adapted from: https://bl.ocks.org/mbostock/3887235
  ///-- start D3 code

  const width = 960;
  const height = 500;
  const radius = Math.min(width, height) / 2;

  const color = d3.scaleOrdinal()
    .range(['#98abc5', '#8a89a6', '#7b6888', '#6b486b', '#a05d56', '#d0743c', '#ff8c00']);

  const arc = d3.arc()
    .outerRadius(radius - 10)
    .innerRadius(0);

  const labelArc = d3.arc()
    .outerRadius(radius - 40)
    .innerRadius(radius - 40);

  const pie = d3.pie()
    .sort(null)
    .value((d) => d.value);

  const svg = d3n.createSVG()
    .attr('width', width)
    .attr('height', height)
    .append('g')
    .attr('transform', `translate( ${width / 2} , ${height / 2} )`);

  const g = svg.selectAll('.arc')
    .data(pie(data))
    .enter().append('g')
    .attr('class', 'arc');

  g.append('path')
    .attr('d', arc)
    .style('fill', (d) => color(d.data.label));

  g.append('text')
    .attr('transform', (d) => `translate(${labelArc.centroid(d)})`)
    .attr('dy', '.35em')
    .text((d) => d.data.label);

  /// -- end D3 code

  return d3n;
}

module.exports = pieChart;
