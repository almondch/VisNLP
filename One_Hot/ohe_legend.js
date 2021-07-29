	
var w = 800, h = 60;

var key = d3.select("#legend1")
    .append("svg")
    .attr("viewBox", "0 0 800 60")
	.attr("preserveAspectRatio", "xMinYMin meet");

var legend = key.append("defs")
    .append("svg:linearGradient")
    .attr("id", "gradient")
    .attr("x1", "0%")
    .attr("y1", "100%")
    .attr("x2", "100%")
    .attr("y2", "100%")
    .attr("spreadMethod", "pad");

legend.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", "white")
    .attr("stop-opacity", 1);

legend.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", "#b30000")
    .attr("stop-opacity", 1);

key.append("rect")
    .attr("width", w-60)
    .attr("height", h-40)
    .style("fill", "url(#gradient)")
    .attr("transform", "translate(30,10)");

var x = d3.scaleLinear()
    .range([30, 770])
    .domain([0, 1]);

var xAxis = d3.axisBottom()
    .scale(x)
    .ticks(5);

key.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0,30)")
    .call(xAxis)
    .append("text")
    .attr("transform", "rotate(-90)")
    .attr("x", 0)
    .attr("dx", 30)
    .style("text-anchor", "end")
    .text("axis title");