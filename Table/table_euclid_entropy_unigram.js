// set the dimensions and margins of the graph
var margin = {top: 20, right: 120, bottom: 20, left: 120},
  width = 800 - margin.left - margin.right,
  height = 400 - margin.top - margin.bottom;

// append the svg_1 object to the body of the page
var svg_1_ent = d3.select(".entropy_euclid_heatmap")
.append("svg")
  .attr("viewBox", "0 0 800 400")
  .attr("preserveAspectRatio", "xMinYMin meet")
.append("g")
  .attr("transform", "translate(" + margin.left + "," + 40 + ")");

//Read the data
d3.csv("Table/csv_euclid_entropy_1gram.csv", function(data) {

  var x_elements = d3.set(data.map(function(d){return d.doc_a;})).values();
  var y_elements = d3.set(data.map(function(d){return d.doc_b;})).values();

  var xScale = d3.scaleBand()
        .domain(x_elements)
        .range([0, width])
        .padding(0.05);

  var xAxis = d3.axisBottom()
        .scale(xScale)
        .tickFormat(function (d) {
            return d;
        });

  var yScale = d3.scaleBand()
        .domain(y_elements)
        .range([0, height])
        .padding(0.05);

  var yAxis = d3.axisLeft()
        .scale(yScale)
        .tickFormat(function (d) {
            return d;
        });

  // Build color scale
  var myColor = d3.scaleLinear()
    .range(["white", "#b30000"])
    .domain([0,1])

	
  var tooltip = d3.select(".entropy_euclid_heatmap")
		.append("div")
		.attr('class', 'tooltip');


  // add the squares
  svg_1_ent.selectAll()
    .data(data, function(d) {return d.doc_a+':'+d.doc_b;})
    .enter()
    .append('g').append('rect')
	  .attr('class', 'cell')
      .attr('width', xScale.bandwidth())
      .attr('height', yScale.bandwidth())
      .attr("x", function(d) { return xScale(d.doc_a) })
      .attr("y", function(d) { return yScale(d.doc_b) })
      .attr("rx", 4)
      .attr("ry", 4)
      .attr("fill", function(d) { return myColor(d.value1)} )
      .style("stroke-width", 0.4)
      .style("stroke", "black")
      .style("opacity", 0.8)
    .on("mouseover", function(d) {
		d3.select(this)
	  .style("stroke-width", 2.5)
			return tooltip.style("visibility", "visible").text(d.doc_b + " : " + d.doc_a +" = "+ d.value2+" (" + d.value1 +") ");})
		.on("mousemove", function() {
			return tooltip.style("top", (event.pageY - 50) + "px").style("left", (event.pageX - 50) + "px");})
		.on("mouseout", function() {
			d3.select(this)
      .style("stroke-width", 0.4)
			return tooltip.style("visibility", "hidden");});
	
  svg_1_ent.append("g")
        .attr("class", "y axis")
        .call(yAxis)
		.select(".domain").remove()
        .selectAll('text')
        .attr('font-weight', 'normal');

  svg_1_ent.append("g")
        .attr("class", "x axis")
		.attr("transform", "translate(0," + -2.5 + ")")
        .call(xAxis)
        .selectAll('text')
        .attr('font-weight', 'normal')
        .style("text-anchor", "end")
        .attr("dx", 14)
        .attr("dy", -15);
})

