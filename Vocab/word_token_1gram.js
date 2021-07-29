d3.json("Vocab/token_1gram_uncollapse.json", function(data) {
	
	var width = 800,
		height = 4200;
	var diameter = 800;
	var duration = 2000;
	
	
	function transitionToRadialCluster() {

    var nodes = radialCluster.nodes(root), // recalculate layout
        links = radialCluster.links(nodes);
	
	svg.transition().duration(duration)
        .attr("transform", "translate(" + (width) + "," + (height/7) + ")")
	
	d3.selectAll("svg").call(d3.behavior.zoom().on("zoom", function () {
		svg.attr("transform", "translate(" + (d3.event.translate[0] + 800) +
        "," + (d3.event.translate[1] + 600) + ")" + " scale(" + d3.event.scale + ")")
		}));
	
    link.data(links)
        .transition()
        .duration(duration)
		.style("stroke", "lightgray")
		.style("stroke-width", "1.5px")
        .attr("d", radialDiagonal); //get the new radial path

    node.data(nodes)
        .transition()
        .duration(duration)
        .attr("transform", function(d) {
            return "rotate(" + (d.x - 90) + ")translate(" + d.y + ")";
        });
    
    node.select("circle")
        .transition()
        .duration(duration);

	node.select("text")
		.remove()
	
	node.append("text")
		.attr("dy", ".31em")
		.style("text-anchor", function (d) {
			return d.x < 180 ? "start" : "end";
		})
		.attr("transform", function(d) {
			return d.x < 180 ? "translate(8)" : "rotate(180)translate(-8)";
		})
		.text(function (d) {
			return d.name;
		});
	};
	
	
	var root; // store data in a variable accessible by all functions

	var tree = d3.layout.tree()
		.size([height, width - 160]);

	var cluster = d3.layout.cluster()
		.size([height, width - 160]);

	var diagonal = d3.svg.diagonal()
		.projection(function (d) { return [ d.y, d.x ]; });

	var radialCluster = d3.layout.cluster()
		.size([360, diameter / 2 ])
		.separation(function(a, b) {
        return (a.parent == b.parent ? 1 : 2) / a.depth;
		});

	var radialDiagonal = d3.svg.diagonal.radial()
		.projection(function(d) {
        return [d.y, d.x / 180 * Math.PI];
		});
	
	var svg = d3.select("#ws").append("svg")
		.attr("viewBox", "0 0 1600 1200")
		.attr("preserveAspectRatio", "xMinYMin meet")
		.call(d3.behavior.zoom().on("zoom", function () {
		svg.attr("transform", "translate(" + (d3.event.translate[0]+400) +
        "," + (d3.event.translate[1]) + ")" + " scale(" + d3.event.scale + ")")
		}))
		.append("g")
		.attr("transform", "translate(400,0)")
		.on("click", transitionToRadialCluster.bind(this));
	
    var root = data,
        nodes = tree.nodes(root),
        links = tree.links(nodes);

    var link = svg.selectAll(".link")
        .data(links)
       .enter()
        .append("path")
        .attr("class", "link")
        .attr("d", diagonal);

    var node = svg.selectAll(".node")
        .data(nodes)
       .enter()
        .append("g")
        .attr("class", "node")
        .attr("transform", function (d) {
        return "translate(" + d.y + "," + d.x + ")";})
		.on('mouseover', function(p) {

			var nodes = [];
			nodes.push(p);
			while(p.parent) {p = p.parent; nodes.push(p);
			}
			//color the links
			link.filter(function(d) {
			if(nodes.indexOf(d.target) !== -1) return true;
			}).style("stroke","red").style("stroke-width", "4px");
			//color the nodes 
				node.filter(function(d) {
			if(nodes.indexOf(d) !== -1) return true;
			}).style("fill","red").style("font-weight", "bold");
		})
		.on('mouseout', function(p) {
			var nodes = [];
			nodes.push(p);
			while(p.parent) {p = p.parent; nodes.push(p);
			}
			//color the links
			link.filter(function(d) {
			if(nodes.indexOf(d.target) !== -1) return true;
			}).style("stroke","lightgray").style("stroke-width", "2px");
			//color the nodes 
				node.filter(function(d) {
			if(nodes.indexOf(d) !== -1) return true;
			}).style("fill","black").style("font-weight", "normal");
		})

    node.append("circle")
        .attr("r", 6)
		.on('mouseover', function(d) {
		d3.select(this).style("fill", "red")})
		.on('mouseout', function(d) {
		d3.select(this).style("fill", "white")});

    node.append("text")
        .attr("dx", function (d) { return d.children ? -13 : 13; })
        .attr("dy", 3)
		.style("font-size", "16px")
        .style("text-anchor", function (d) { return d.children ? "end" : "start"; })
        .text(function (d) { return d.name; });
	
	
});
