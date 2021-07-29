var width = 800,
    height = 6000;
var diameter = 1000;
var duration = 2000;


function transitionToRadialCluster() {

    var nodes = radialCluster.nodes(root), // recalculate layout
        links = radialCluster.links(nodes);
    
    svg.transition().duration(duration)
        .attr("transform", "translate(" + (width) + "," + (height/10) + ")");
        // set appropriate translation (origin in middle of svg)
    
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
    .attr("viewBox", "0 0 1600 6000")
	.attr("preserveAspectRatio", "xMinYMin meet")
    .append("g")
    .attr("transform", "translate(80,0)")
	.on('click', transitionToRadialCluster.bind(this));
	
    var root = getData(),
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

	


function getData() {
    return {"name": "Corpus" ,"children": [{ "name" : "job1", 
 "children" : [{ "name" : "sentence1", 
 "children" : [{ "name" :  " year " },{ "name" :  " experience " },{ "name" :  " advanced " },{ "name" :  " statistical " },{ "name" :  " technique " }]},{ "name" : "sentence2", 
 "children" : [{ "name" :  " year " },{ "name" :  " experience " },{ "name" :  " data " },{ "name" :  " design " }]},{ "name" : "sentence3", 
 "children" : [{ "name" :  " domain " },{ "name" :  " knowledge " },{ "name" :  " background " },{ "name" :  " pharmaceutical " },{ "name" :  " manufacturing " },{ "name" :  " process " },{ "name" :  " operation " }]},{ "name" : "sentence4", 
 "children" : [{ "name" :  " experience " },{ "name" :  " data " },{ "name" :  " analysis " },{ "name" :  " modelling " },{ "name" :  " method " },{ "name" :  " particularly " },{ "name" :  " application " },{ "name" :  " process " },{ "name" :  " system " }]},{ "name" : "sentence5", 
 "children" : [{ "name" :  " strong " },{ "name" :  " statistic " },{ "name" :  " programming " },{ "name" :  " background " },{ "name" :  " proven " },{ "name" :  " experience " },{ "name" :  " delivering " },{ "name" :  " machine " },{ "name" :  " learning " },{ "name" :  " project " }]},{ "name" : "sentence6", 
 "children" : [{ "name" :  " experience " },{ "name" :  " number " },{ "name" :  " following " },{ "name" :  " language " },{ "name" :  " tool " },{ "name" :  " sql " },{ "name" :  " python " },{ "name" :  " matlab " },{ "name" :  " sas " },{ "name" :  " java " },{ "name" :  " spark " },{ "name" :  " scala " }]},{ "name" : "sentence7", 
 "children" : [{ "name" :  " experience " },{ "name" :  " big " },{ "name" :  " data " },{ "name" :  " technology " },{ "name" :  " hadoop " },{ "name" :  " mapreduce " },{ "name" :  " hive " },{ "name" :  " etc " }]}]},{ "name" : "job2", 
 "children" : [{ "name" : "sentence1", 
 "children" : [{ "name" :  " experience " },{ "name" :  " data " },{ "name" :  " analytic " }]},{ "name" : "sentence2", 
 "children" : [{ "name" :  " year " },{ "name" :  " experience " },{ "name" :  " data " },{ "name" :  " architecture " }]},{ "name" : "sentence3", 
 "children" : [{ "name" :  " experience " },{ "name" :  " data " },{ "name" :  " analysis " },{ "name" :  " modelling " },{ "name" :  " method " },{ "name" :  " particularly " },{ "name" :  " application " },{ "name" :  " process " },{ "name" :  " system " }]},{ "name" : "sentence4", 
 "children" : [{ "name" :  " knowledge " },{ "name" :  " variety " },{ "name" :  " machine " },{ "name" :  " learning " },{ "name" :  " technique " },{ "name" :  " clustering " },{ "name" :  " decision " },{ "name" :  " tree " },{ "name" :  " learning " },{ "name" :  " artificial " },{ "name" :  " neural " },{ "name" :  " network " },{ "name" :  " etc " }]},{ "name" : "sentence5", 
 "children" : [{ "name" :  " strong " },{ "name" :  " statistic " },{ "name" :  " programming " },{ "name" :  " background " },{ "name" :  " proven " },{ "name" :  " experience " },{ "name" :  " delivering " },{ "name" :  " data " },{ "name" :  " science " }]},{ "name" : "sentence6", 
 "children" : [{ "name" :  " experience " },{ "name" :  " number " },{ "name" :  " following " },{ "name" :  " language " },{ "name" :  " tool " },{ "name" :  " sql " },{ "name" :  " python " },{ "name" :  " matlab " },{ "name" :  " sas " },{ "name" :  " java " },{ "name" :  " spark " },{ "name" :  " scala " },{ "name" :  " aws " },{ "name" :  " tableau " }]},{ "name" : "sentence7", 
 "children" : [{ "name" :  " experience " },{ "name" :  " big " },{ "name" :  " data " },{ "name" :  " technology " },{ "name" :  " spark " },{ "name" :  " hadoop " },{ "name" :  " mapreduce " },{ "name" :  " hive " },{ "name" :  " etc " }]}]},{ "name" : "job3", 
 "children" : [{ "name" : "sentence1", 
 "children" : [{ "name" :  " year " },{ "name" :  " experience " },{ "name" :  " relational " },{ "name" :  " nonrelational " },{ "name" :  " database " }]},{ "name" : "sentence2", 
 "children" : [{ "name" :  " year " },{ "name" :  " experience " },{ "name" :  " data " },{ "name" :  " modelling " },{ "name" :  " transactional " },{ "name" :  " analytic " }]},{ "name" : "sentence3", 
 "children" : [{ "name" :  " experience " },{ "name" :  " tool " },{ "name" :  " managing " },{ "name" :  " analyzing " },{ "name" :  " visualizing " },{ "name" :  " large " },{ "name" :  " datasets " }]},{ "name" : "sentence4", 
 "children" : [{ "name" :  " knowledge " },{ "name" :  " variety " },{ "name" :  " machine " },{ "name" :  " learning " },{ "name" :  " technique " },{ "name" :  " clustering " },{ "name" :  " decision " },{ "name" :  " tree " },{ "name" :  " learning " },{ "name" :  " artificial " },{ "name" :  " neural " },{ "name" :  " network " },{ "name" :  " etc " }]},{ "name" : "sentence5", 
 "children" : [{ "name" :  " strong " },{ "name" :  " statistic " },{ "name" :  " programming " },{ "name" :  " background " },{ "name" :  " data " },{ "name" :  " science " },{ "name" :  " machine " },{ "name" :  " learning " },{ "name" :  " project " }]},{ "name" : "sentence6", 
 "children" : [{ "name" :  " experience " },{ "name" :  " number " },{ "name" :  " following " },{ "name" :  " language " },{ "name" :  " tool " },{ "name" :  " sql " },{ "name" :  " python " },{ "name" :  " matlab " },{ "name" :  " sas " },{ "name" :  " sql " }]},{ "name" : "sentence7", 
 "children" : [{ "name" :  " experience " },{ "name" :  " big " },{ "name" :  " data " },{ "name" :  " technology " },{ "name" :  " spark " },{ "name" :  " hadoop " },{ "name" :  " mapreduce " },{ "name" :  " hive " },{ "name" :  " etc " }]}]},{ "name" : "job4", 
 "children" : [{ "name" : "sentence1", 
 "children" : [{ "name" :  " bachelor " },{ "name" :  " degree " },{ "name" :  " graphic " },{ "name" :  " design " },{ "name" :  " related " },{ "name" :  " field " }]},{ "name" : "sentence2", 
 "children" : [{ "name" :  " experience " },{ "name" :  " graphic " },{ "name" :  " designer " },{ "name" :  " related " },{ "name" :  " field " }]},{ "name" : "sentence3", 
 "children" : [{ "name" :  " develop " },{ "name" :  " campaign " },{ "name" :  " pitch " },{ "name" :  " consisting " },{ "name" :  " concept " },{ "name" :  " option " }]},{ "name" : "sentence4", 
 "children" : [{ "name" :  " demonstrable " },{ "name" :  " graphic " },{ "name" :  " design " },{ "name" :  " skill " },{ "name" :  " strong " },{ "name" :  " portfolio " }]},{ "name" : "sentence5", 
 "children" : [{ "name" :  " proficiency " },{ "name" :  " required " },{ "name" :  " desktop " },{ "name" :  " publishing " },{ "name" :  " tool " },{ "name" :  " including " },{ "name" :  " photoshop " },{ "name" :  " illustrator " }]},{ "name" : "sentence6", 
 "children" : [{ "name" :  " strong " },{ "name" :  " eye " },{ "name" :  " visual " },{ "name" :  " composition " }]},{ "name" : "sentence7", 
 "children" : [{ "name" :  " effective " },{ "name" :  " time " },{ "name" :  " management " },{ "name" :  " skill " },{ "name" :  " ability " },{ "name" :  " meet " },{ "name" :  " deadline " }]},{ "name" : "sentence8", 
 "children" : [{ "name" :  " understanding " },{ "name" :  " marketing " },{ "name" :  " production " },{ "name" :  " website " },{ "name" :  " design " },{ "name" :  " corporate " },{ "name" :  " identity " },{ "name" :  " product " },{ "name" :  " packaging " }]}]},{ "name" : "job5", 
 "children" : [{ "name" : "sentence1", 
 "children" : [{ "name" :  " bachelor " },{ "name" :  " degree " },{ "name" :  " graphic " },{ "name" :  " design " },{ "name" :  " web " },{ "name" :  " design " },{ "name" :  " interactive " },{ "name" :  " medium " }]},{ "name" : "sentence2", 
 "children" : [{ "name" :  " demonstrable " },{ "name" :  " graphic " },{ "name" :  " design " },{ "name" :  " skill " },{ "name" :  " strong " },{ "name" :  " portfolio " }]},{ "name" : "sentence3", 
 "children" : [{ "name" :  " present " },{ "name" :  " complete " },{ "name" :  " campaign " },{ "name" :  " pitch " },{ "name" :  " consisting " },{ "name" :  " design " },{ "name" :  " strategy " }]},{ "name" : "sentence4", 
 "children" : [{ "name" :  " experience " },{ "name" :  " web " },{ "name" :  " marketing " },{ "name" :  " web " },{ "name" :  " design " },{ "name" :  " strong " },{ "name" :  " knowledge " },{ "name" :  " html " },{ "name" :  " photoshop " },{ "name" :  " illustrator " }]},{ "name" : "sentence5", 
 "children" : [{ "name" :  " strong " },{ "name" :  " eye " },{ "name" :  " visual " },{ "name" :  " composition " }]},{ "name" : "sentence6", 
 "children" : [{ "name" :  " effective " },{ "name" :  " time " },{ "name" :  " management " },{ "name" :  " skill " },{ "name" :  " ability " },{ "name" :  " meet " },{ "name" :  " deadline " }]},{ "name" : "sentence7", 
 "children" : [{ "name" :  " understanding " },{ "name" :  " marketing " },{ "name" :  " production " },{ "name" :  " website " },{ "name" :  " design " },{ "name" :  " corporate " },{ "name" :  " identity " },{ "name" :  " advertisement " },{ "name" :  " multimedia " },{ "name" :  " design " }]}]},{ "name" : "job6", 
 "children" : [{ "name" : "sentence1", 
 "children" : [{ "name" :  " proficient " },{ "name" :  " adobe " },{ "name" :  " creative " },{ "name" :  " suite " },{ "name" :  " graphic " },{ "name" :  " design " },{ "name" :  " related " },{ "name" :  " field " }]},{ "name" : "sentence2", 
 "children" : [{ "name" :  " year " },{ "name" :  " experience " },{ "name" :  " graphic " },{ "name" :  " designer " },{ "name" :  " related " },{ "name" :  " field " }]},{ "name" : "sentence3", 
 "children" : [{ "name" :  " demonstrable " },{ "name" :  " graphic " },{ "name" :  " design " },{ "name" :  " skill " },{ "name" :  " strong " },{ "name" :  " portfolio " }]},{ "name" : "sentence4", 
 "children" : [{ "name" :  " develop " },{ "name" :  " present " },{ "name" :  " complete " },{ "name" :  " campaign " },{ "name" :  " pitch " },{ "name" :  " design " }]},{ "name" : "sentence5", 
 "children" : [{ "name" :  " experienced " },{ "name" :  " mac " },{ "name" :  " platform " },{ "name" :  " excellent " },{ "name" :  " skill " },{ "name" :  " adobe " },{ "name" :  " cs5 " },{ "name" :  " specializing " },{ "name" :  " photoshop " },{ "name" :  " dreamweaver " },{ "name" :  " illustrator " }]},{ "name" : "sentence6", 
 "children" : [{ "name" :  " strong " },{ "name" :  " eye " },{ "name" :  " visual " },{ "name" :  " composition " }]},{ "name" : "sentence7", 
 "children" : [{ "name" :  " effective " },{ "name" :  " time " },{ "name" :  " management " },{ "name" :  " skill " },{ "name" :  " ability " },{ "name" :  " meet " },{ "name" :  " deadline " }]},{ "name" : "sentence8", 
 "children" : [{ "name" :  " understanding " },{ "name" :  " marketing " },{ "name" :  " product " },{ "name" :  " packaging " },{ "name" :  " advertisement " },{ "name" :  " multimedia " },{ "name" :  " design " }]}]},{ "name" : "job7", 
 "children" : [{ "name" : "sentence1", 
 "children" : [{ "name" :  " bachelor " },{ "name" :  " science " },{ "name" :  " mechanical " },{ "name" :  " engineering " }]},{ "name" : "sentence2", 
 "children" : [{ "name" :  " must " },{ "name" :  " active " },{ "name" :  " professional " },{ "name" :  " engineering " },{ "name" :  " license " }]},{ "name" : "sentence3", 
 "children" : [{ "name" :  " experience " },{ "name" :  " preparing " },{ "name" :  " report " }]},{ "name" : "sentence4", 
 "children" : [{ "name" :  " proficient " },{ "name" :  " autocad " },{ "name" :  " revit " },{ "name" :  " mep " }]},{ "name" : "sentence5", 
 "children" : [{ "name" :  " using " },{ "name" :  " autocad " },{ "name" :  " revit " },{ "name" :  " mep " },{ "name" :  " produce " },{ "name" :  " hvac " },{ "name" :  " plumbing " },{ "name" :  " piping " },{ "name" :  " design " },{ "name" :  " associated " },{ "name" :  " calculation " },{ "name" :  " wide " },{ "name" :  " variety " },{ "name" :  " project " }]},{ "name" : "sentence6", 
 "children" : [{ "name" :  " must " },{ "name" :  " familiar " },{ "name" :  " related " },{ "name" :  " symbol " },{ "name" :  " different " },{ "name" :  " type " },{ "name" :  " heating " },{ "name" :  " cooling " },{ "name" :  " system " },{ "name" :  " variety " },{ "name" :  " facility " }]},{ "name" : "sentence7", 
 "children" : [{ "name" :  " experience " },{ "name" :  " following " },{ "name" :  " process " },{ "name" :  " industrial " },{ "name" :  " system " },{ "name" :  " domestic " },{ "name" :  " water " },{ "name" :  " piping " },{ "name" :  " system " }]}]},{ "name" : "job8", 
 "children" : [{ "name" : "sentence1", 
 "children" : [{ "name" :  " bachelor " },{ "name" :  " degree " },{ "name" :  " mechanical " },{ "name" :  " engineering " },{ "name" :  " professional " },{ "name" :  " engineering " },{ "name" :  " license " }]},{ "name" : "sentence2", 
 "children" : [{ "name" :  " experience " },{ "name" :  " presenting " },{ "name" :  " design " },{ "name" :  " review " }]},{ "name" : "sentence3", 
 "children" : [{ "name" :  " proficient " },{ "name" :  " autocad " },{ "name" :  " revit " },{ "name" :  " mep " },{ "name" :  " produce " },{ "name" :  " hvac " },{ "name" :  " plumbing " },{ "name" :  " piping " },{ "name" :  " design " },{ "name" :  " associated " },{ "name" :  " calculation " },{ "name" :  " wide " },{ "name" :  " variety " },{ "name" :  " project " }]},{ "name" : "sentence4", 
 "children" : [{ "name" :  " must " },{ "name" :  " familiar " },{ "name" :  " related " },{ "name" :  " symbol " },{ "name" :  " different " },{ "name" :  " type " },{ "name" :  " heating " },{ "name" :  " cooling " },{ "name" :  " system " },{ "name" :  " variety " },{ "name" :  " facility " }]},{ "name" : "sentence5", 
 "children" : [{ "name" :  " desired " },{ "name" :  " area " },{ "name" :  " following " },{ "name" :  " process " },{ "name" :  " industrial " },{ "name" :  " system " },{ "name" :  " medical " },{ "name" :  " gas " },{ "name" :  " piping " },{ "name" :  " system " },{ "name" :  " plumbing " }]}]}]};
}