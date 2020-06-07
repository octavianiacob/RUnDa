var width = 2000;
var height = 1500;
let newName
let map = document.getElementById('map');
let backbtn = document.getElementById('map-btn');
let nextbtn = document.getElementById('next-btn')
let countyCounter = 0;
let queryparam1 = "";
let queryparam2 = "";
let url;


let nameCity = undefined;

var canvas = d3.select("#map")
    .append("svg")
    .attr("width", 2000)
    .attr("height", 1500)
    .attr('viewBox', '0 0 ' + Math.min(width, height) + ' ' + Math.min(width, height))
    .attr('preserveAspectRatio', 'xMinYMin')

d3.json("romania-geo.geojson", function (data) {

    var group = canvas.selectAll("g")
        .data(data.features)
        .enter()
        .append("g")

    var projection = d3.geoMercator()
        .center([25, 46])
        .scale(12000)
        .translate([width / 2, height / 2]);

    var path = d3.geoPath()
        .projection(projection);

    var areas = group.append("path")
        .attr("d", path)
        .attr("id", function (d, i) {
            return "path-" + data.features[i].properties.id;
            i++;
        })
        .attr("name", function (d, i) {
            return data.features[i].properties.name;
            i++;
        })
        .attr("class", "area")
        .style("fill", "#174255")
        .attr("value", "off")
        .style("stroke", "#C3D3D0")
        .on("mouseover", function (d) {
            d3.select(this).style("stroke", "#ff0000");
            d3.select(this).style("stroke-width", "5px");
        })
        .on("mouseout", function (d) {
            d3.select(this).style("stroke", "#C3D3D0");
            d3.select(this).style("stroke-width", "2px");
        })
        .on("click", function (d) {
            console.log("Ai dat click pe " + d3.select(this).attr('id'));
            console.log("Ai dat click pe judetul " + d3.select(this).attr("name"));

            if (d3.select(this).attr("value") == "off" && countyCounter < 2) {
                d3.select(this).attr("value", "on")
                    .style("fill", "#C3D3D0")
                    .style("stroke-width", "5px");
                countyCounter++;
                if (queryparam1 == "")
                    queryparam1 = d3.select(this).attr("name");
                else if (queryparam2 == "")
                    queryparam2 = d3.select(this).attr("name");
            } else if (d3.select(this).attr("value") == "on" && countyCounter <= 2) {
                d3.select(this).attr("value", "off")
                    .style("fill", "#174255")
                    .style("stroke-width", "2px");
                countyCounter--;
                if (queryparam1 == d3.select(this).attr("name"))
                    queryparam1 = "";
                else if (queryparam2 == d3.select(this).attr("name"))
                    queryparam2 = "";
            }

            console.log("State-ul lui " + d3.select(this).attr("name") + " este: " + d3.select(this).attr("value") + " CNT = " + countyCounter);
            console.log("Q1 = " + queryparam1 + " Q2 = " + queryparam2);
            nameCity = d3.select(this).attr("name");

            if (queryparam1 != "" && queryparam2 != "") {
                url = "./ajax.html" + "?judet=" + queryparam1 + "&" + queryparam2;
                //window.location.href=url;
                nextbtn.setAttribute("href", url);
            } else if (queryparam1 != "" && queryparam2 == "") {
                url = "./ajax.html" + "?judet=" + queryparam1;
                nextbtn.setAttribute("href", url);
            } else if (queryparam1 == "" && queryparam2 != "") {
                url = "./ajax.html" + "?judet=" + queryparam2;
                nextbtn.setAttribute("href", url);
            }

        });

    group.append("text")
        .attr("x", function (d) { return path.centroid(d)[0]; })
        .attr("y", function (d) { return path.centroid(d)[1]; })
        .attr("id", function (d, i) { return "text-" + i; })
        .attr("text-anchor", "middle")
        .style("font-size", "28px")
        .style("fill", "#FFE200")
        .style("font-family", "Roboto")
        .text(function (d) { return d.properties.id; })




});

// backbtn.addEventListener('click', function(){
//     map.style.display = "block";
//     map.style.opacity = 1;
//     backbtn.style.display="none";
// })