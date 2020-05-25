
var width = 2000;
var height = 1500;
let newName
let map = document.getElementById('map');
let backbtn = document.getElementById('map-btn');
// const sticla=1000;
// export {sticla};

let nameCity = ""

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
        .attr("id", function (d, i) { return "path-" + data.features[i].properties.id; i++; })
        .attr("name", function (d, i) { return data.features[i].properties.name; i++; })
        .attr("class", "area")
        .attr("fill", "#174255")
        .style("stroke", "#C3D3D0")
        .on("mouseover", function (d) {
            d3.select(this).style("fill", "#C3D3D0");
        })
        .on("mouseout", function (d) {
            d3.select(this).style("fill", "#174255");
        })
        .on("click", function (d) {
            console.log("Ai dat click pe " + d3.select(this).attr('id'));
            console.log("Ai dat click pe judetul " + d3.select(this).attr("name"));

            nameCity = d3.select(this).attr("name");//mures
            //aici am dat click si stiu judetul

            function findOutCounty(param){
                console.log("esti un  "+ nameCity)
                param=nameCity
               return param
                
            }

            findOutCounty("ceva")
           
                    console.log(nameCity+" nu estiefenwfiew")

            console.log("fenjenekjfnejkfnekfneejke"+ nameCity)
            console.log("aici imi afiseaza sigur orasul "+ nameCity);
           
            //let namecity="" e declarat global

            window.open  ("./ajax.html");
            // return nameCity
            map.style.opacity = 1;
            (function fade() { (map.style.opacity -= 0.05) < 0 ? map.style.display = "none" : setTimeout(fade, 40) })();
            //backbtn.style.display="block";
            
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

        console.log("baaaaaaaaaaaaaaaaaaaaaaaaa "+ nameCity);// nici aici nu afiseaza

       
});

//codul ajunge aici inainte sa dau click
//dau click si imi intra in functia de mai sus

export {nameCity};

console.log("aici nu arata nimic decat textul asta"+ nameCity)
//aici am incercat sa apelez si o functie, functie pe care o facusem la linia 65


// backbtn.addEventListener('click', function(){
//     map.style.display = "block";
//     map.style.opacity = 1;
//     backbtn.style.display="none";
// })

