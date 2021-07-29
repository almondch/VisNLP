d3.json("/Vocab/unique_2gram.json", function(data) {
	
	var width = 1600,
		height = 1200,
		diameter = 800,
		duration = 2000;

	var radialCluster = d3.layout.cluster()
		.size([360, diameter/2])
		.separation(function(a, b) {
			return (a.parent == b.parent ? 1 : 2) / a.depth;
		});

	var radialDiagonal = d3.svg.diagonal.radial()
		.projection(function(d) {
			return [d.y, d.x / 180 * Math.PI];
		});
	
	var svg = d3.select("#uwg").append("svg")
		.attr("viewBox", "0 0 1600 1200")
		.attr("preserveAspectRatio", "xMinYMin meet")
		.call(d3.behavior.zoom().on("zoom", function () {
		svg.attr("transform", "translate(" + (d3.event.translate[0] + width/2) +
        "," + (d3.event.translate[1] + height/2) + ")" + " scale(" + d3.event.scale + ")")
		}))
		.append("g")
		.attr("transform", "translate(" + width/2 + "," + height/2 + ")");
	
	var nodes = radialCluster.nodes(data),
		links = radialCluster.links(nodes);

	var link = svg.selectAll(".link")
		.data(links)
		.enter()
		.append("path")
		.attr("class", "link")
		.attr("d", radialDiagonal)
		.style("stroke", "lightgray")
		.style("stroke-width", "1.5px");

	var node = svg.selectAll(".node")
		.data(nodes)
		.enter()
		.append("g")
		.attr("class", "node")
		.attr("transform", function (d) {
			return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
		})

	node.append("circle")
		.attr("r", 6)
		.style("fill", "#b30000")
		.style("stroke", "#b30000")
		.style("stroke-width", 1.5);

	node.append("text")
		.attr("dy", ".31em")
		.style("font-size", "18px")
		.attr("fill", "black")
		.style("text-anchor", function (d) {
			return d.x < 180 ? "start" : "end";
		})
		.attr("transform", function(d) {
			return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)";
		})
		.text(function (d) {
			return d.name;
		})
		.on("mouseover", function(d) {
			return d3.select(this).style("fill", "red").style("font-weight", "bold")})
		.on("mouseout", function(d) {
			return d3.select(this).style("fill", "black").style("font-weight", "normal")});
		
	d3.select(self.frameElement).style("height", height + "px");
});