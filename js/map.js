var width = 760;
var height = 700;

var canvas = d3.select("#map")
    .append("svg")
    .attr("width", 760)
    .attr("height", 700)
    .attr('viewBox','0 0 '+Math.min(width,height) +' '+Math.min(width,height) )
    .attr('preserveAspectRatio','xMinYMin')

d3.json("romania-geo.geojson", function (data) {
var group = canvas.selectAll("g")
    .data(data.features)
    .enter()
    .append("g")
                        
var projection = d3.geoMercator()
    .center([25, 46])
    .scale(3800)
    .translate([ width/2, height/2 ]);

var path = d3.geoPath()
    .projection(projection);

var areas = group.append("path")
    .attr("d", path)
    .attr("class", "area")
    .attr("fill", "steelblue");
                        
group.append("text")
    .attr("x", function(d) { return path.centroid(d)[0]; })
    .attr("y", function(d) { return path.centroid(d)[1]; })
    .attr("text-anchor", "middle")
    .text(function(d) { return d.properties.name; })
});