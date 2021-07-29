d3.json("/Tfidf/tfidf_step1_doc1.json", function(data) {
	
	var width = 1600,
		height = 1200,
		diameter = 1000,
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
		
	var myColor = d3.scale.linear()
		.domain([0, 1])
		.range(["white", "#b30000"]);
	
	var svg = d3.select("#tfidf_step1").append("svg")
		.attr("viewBox", "0 0 1600 1200")
		.attr("preserveAspectRatio", "xMinYMin meet")
		.append("g")
		.attr("transform", "translate(" + width/2 + "," + height/2 + ")");
	
	var nodes = radialCluster.nodes(data),
		links = radialCluster.links(nodes);

	var link = svg.selectAll(".link")
		.data(links)
		.enter()
		.append("path")
		.attr("class", "link")
		.attr("d", radialDiagonal);

	var tooltip = d3.select("#tfidf_step1")
		.append("div")
		.attr('class', 'tooltip');

	var node = svg.selectAll(".node")
		.data(nodes)
		.enter()
		.append("g")
		.attr("class", "node")
		.attr("transform", function (d) {
			return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
		})
		.on("mouseover", function(d) {
			return tooltip.style("visibility", "visible").text(d.name + ' : ' + d.value);})
		.on("mousemove", function() {
			return tooltip.style("top", (event.pageY - 50) + "px").style("left", (event.pageX - 50) + "px");})
		.on("mouseout", function() {
			return tooltip.style("visibility", "hidden");});

	node.append("circle")
		.attr("r", 6);

	node.append("text")
		.attr("dy", ".31em")
		.style("font-size", "14px")
		.style("text-anchor", function (d) {
			return d.x < 180 ? "start" : "end";
		})
		.attr("transform", function(d) {
			return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)";
		})
		.text(function (d) {
			return d.name;
		});
	
	d3.select(self.frameElement).style("height", height + "px");
});

function getMax(arr, prop) {
    var max;
    for (var i=0 ; i<arr.length ; i++) {
        if (max == null || parseInt(arr[i][prop]) > parseInt(max[prop]))
            max = arr[i];
    }
    return max;
};