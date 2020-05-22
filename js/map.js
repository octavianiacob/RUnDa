// The svg
var svg = d3.select("svg");
//var width = +svg.attr("width");
//var height = +svg.attr("height");
var card = document.getElementsByClassName("background-card");
var width = 300;
var height = 300;
svg.attr("width", '100%')
.attr("height", '100%')
.attr('viewBox','0 0 '+Math.min(width,height) +' '+Math.min(width,height) )
.attr('preserveAspectRatio','xMinYMin')

// Map and projection
var projection = d3.geoMercator()
.center([25, 46])                // GPS of location to zoom on
.scale(1800)                       // This is like the zoom
.translate([ width/2, height/2 ])

// Load external data and boot
d3.json("./romania-geo.geojson", function(data){

// Draw the map
svg.append("g")
    .selectAll("path")
    .data(data.features)
    .enter().append("path")
        .attr("fill", "#69b3a2")
        .attr("d", d3.geoPath()
            .projection(projection)
        )
        .style("stroke", "#fff")
})