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
        .attr("id", function(d,i){ return "path-" + data.features[i].properties.id; i++;})
        .attr("class", "area")
        .attr("fill", "#174255")
        .style("stroke", "#C3D3D0")
        .on("mouseover", function(d) {
            d3.select(this).style("fill", "#C3D3D0");
          })
        .on("mouseout", function(d) {
            d3.select(this).style("fill", "#174255");
          })
        .on("click", function(d) {
            console.log("Ai dat click pe " + d3.select(this).attr('id'));
        });

    group.append("text")
        .attr("x", function(d) { return path.centroid(d)[0]; })
        .attr("y", function(d) { return path.centroid(d)[1]; })
        .attr("id", function(d,i){ return "text-" + i; })
        .attr("text-anchor", "middle")
        .style("font-size", "8px")
        .style("fill", "#FFE200")
        .style("font-family", "Roboto")
        .text(function(d) { return d.properties.id; })
});