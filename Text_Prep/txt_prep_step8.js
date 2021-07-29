// ************** Generate the tree diagram	 *****************
var margin = {top: 20, right: 10, bottom: 20, left: 30},
	width = 1980 - margin.right - margin.left,
	height = 1200 - margin.top - margin.bottom;
	
var i = 0,
	duration = 750,
	root;

var tree = d3.layout.tree()
	.size([height, width]);

var diagonal = d3.svg.diagonal()
	.projection(function(d) { return [d.y, d.x]; });

var svg = d3.select("#txt_step8").append("svg")
	.attr("viewBox", "0 0 2178 1320")
	.attr("preserveAspectRatio", "xMinYMin meet")
	.call(d3.behavior.zoom().on("zoom", function () {
		svg.attr("transform", "translate(" + (d3.event.translate[0] + 100) +
        "," + (d3.event.translate[1] + 80) + ")" + " scale(" + d3.event.scale + ")")
		}))
  .append("g")
	.attr("transform", "translate(" + 100 + "," + 80 + ")");


root = treeData[0];
root.x0 = height / 2;
root.y0 = 0;
  
update(root);

d3.select(self.frameElement).style("height", "500px");

function update(source) {

  // Compute the new tree layout.
  var nodes = tree.nodes(root).reverse(),
	  links = tree.links(nodes);

  // Normalize for fixed-depth.
  nodes.forEach(function(d) { d.y = d.depth * 180; });

  // Update the nodes…
  var node = svg.selectAll("g.node")
	  .data(nodes, function(d) { return d.id || (d.id = ++i); });

  // Enter any new nodes at the parent's previous position.
  var nodeEnter = node.enter().append("g")
	  .attr("class", "node")
	  .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
	  .on("click", click)
		.on("mouseover", function(p) {
			// Select the element by class, use .text to set the content
			d3.select(".infobox .type").text(p['type']);
			d3.select(".infobox .detail").text(p['detail']);
			check(p['before'], p['after']);
			// Show the infobox
			d3.select(".infobox").style('visibility', 'visible');
			
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
			}).style("stroke","#404040").style("stroke-width", "2px");
			//color the nodes 
				node.filter(function(d) {
			if(nodes.indexOf(d) !== -1) return true;
			}).style("fill","black").style("font-weight", "normal");
		  // Hide the infobox
			d3.select(".infobox").style('visibility', 'visible');
		});
		
  nodeEnter.append("circle")
	  .attr("r", 1e-6)
	  .style("fill", function(d) { return d._children ? "#ff6666" : "#fff"; })
	  .on('mouseover', function(d) {
		d3.select(this).style("fill", "red")})
	  .on('mouseout', function(d) {
		d3.select(this).style("fill", "white")});
		
  nodeEnter.append("text")
	  .attr("x", function(d) { return d.children || d._children ? -13 : 13; })
	  .attr("dy", ".35em")
	  .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
	  .html(function(d) { 
		if (d['level']==="1") {return d['job']}
		else if (d['level']==="0") {return d['type'];}
		else { return d.children || d._children ? "" : d['change']; } })
	  .style("font-size", "20px")
	  .style("fill-opacity", 1e-6);

  // Transition nodes to their new position.
  var nodeUpdate = node.transition()
	  .duration(duration)
	  .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeUpdate.select("circle")
	  .attr("r", 10)
	  .style("fill", function(d) { return d._children ? "#ff6666" : "#fff"; });

  nodeUpdate.select("text")
	  .style("fill-opacity", 1);
	  
  // Transition exiting nodes to the parent's new position.
  var nodeExit = node.exit().transition()
	  .duration(duration)
	  .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
	  .remove();

  nodeExit.select("circle")
	  .attr("r", 1e-6);

  nodeExit.select("text")
	  .style("fill-opacity", 1e-6);

  // Update the links…
  var link = svg.selectAll("path.link")
	  .data(links, function(d) { return d.target.id; });

  // Enter any new links at the parent's previous position.
  link.enter().insert("path", "g")
	  .attr("class", "link")
	  .attr("d", function(d) {
		var o = {x: source.x0, y: source.y0};
		return diagonal({source: o, target: o});
	  });

  // Transition links to their new position.
  link.transition()
	  .duration(duration)
	  .attr("d", diagonal);

  // Transition exiting nodes to the parent's new position.
  link.exit().transition()
	  .duration(duration)
	  .attr("d", function(d) {
		var o = {x: source.x, y: source.y};
		return diagonal({source: o, target: o});
	  })
	  .remove();
  
  // Stash the old positions for transition.
  nodes.forEach(function(d) {
	d.x0 = d.x;
	d.y0 = d.y;
  });
}

// Toggle children on click.
function click(d) {
  if (d.children) {
	d._children = d.children;
	d.children = null;
  } else {
	d.children = d._children;
	d._children = null;
  }
  update(d);
}

function check(d1,d2,) {
  if (d1===d2) {
	d3.select(".infobox .before").html("<br>");
	d3.select(".infobox .after").html(d2+"   <span style='font-size:20px; color:green;'>&#10004;</span>");
  } else if (d1 === undefined) {
	d3.select(".infobox .before").html("<br>");
	d3.select(".infobox .after").html(d2);
  } else {
	d3.select(".infobox .before").html(d1+"   <span style='font-size:20px; color:red;'>&#10008;</span>");
	d3.select(".infobox .after").html(d2+"   <span style='font-size:20px; color:green;'>&#10004;</span>");
  }
}