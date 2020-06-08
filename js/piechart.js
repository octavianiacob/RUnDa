import { numberToMonth } from './util.js'
export function pieChart(url, getTableName,getColumn, tipChart,getCountyName,tipDIV) {


    const title = `${getCountyName.charAt(0).toLocaleUpperCase() + getCountyName.slice(1)}`;


    const render = data => {
        function myResponsiveComponent(container, props) {
            if (getColumn === "")
                return 0

            const { width, height } = props
            if(tipDIV==1)
      d3.select("#diagram svg").remove()
      else
      d3.select("#diagram2 svg").remove();
            let svg = container.selectAll('svg').data([null]);
            svg = svg
                .enter().append('svg')
                .merge(svg)
                .attr('width', width)
                .attr('height', height)
                .attr('version', "1.1")
                .attr('xmlns', "http://www.w3.org/2000/svg")

            var pie = d3.pie()
                .value(function (d) { return d[getColumn] })

            var slices = pie(data);
            let radius = Math.min(width, height) / 2;
            var arc = d3.arc()
                .innerRadius(0)
                .outerRadius(radius - 40);
                const margin = { top: 50, right: 40, bottom: 77, left: 250 };
                let innerWidth = width - margin.left - margin.right;
            // helper that returns a color based on an ID
            var color = d3.scaleOrdinal(d3.schemeCategory20c)
            var g = svg.append('g')
                .attr('transform', `translate(${width / 2},${height / 1.8})`);

            var arcGraph = g.selectAll('path.slice')
                .data(slices)
                .enter();
            arcGraph.append('path')
                .attr('class', 'slice')
                .attr('d', arc)
                .attr('fill', function (d) {
                    return color(d.data.month);
                });
                        
            arcGraph.append("text")
                .attr("transform", function (d) { return "translate(" + arc.centroid(d) + ")"; })

                .attr("dy", "-0.30em")
                .attr("dx", "-1em")
                .text(function (d) { return d.data[getColumn] });
            svg.append('g')
                .attr('class', 'legend')
                .selectAll('text')
                .data(slices)
                .enter()
                .append('text')
                
                .text(function (d) { return numberToMonth(d.data.month).substring(0, 3); })
                .attr('fill', function (d) { return color(d.data.month); })
                .attr('y', function (d, i) { return 20 * (i + 1); }) ;
              
                svg.append('text')
                  .attr('fill','black')
                  .style('font-size', '1.2em')
                  .attr('y', 35)
                  .attr('x',document.body.clientWidth / 2.6)
                 .text(title)
                 .style('text-align','center')
                 
                
    //             svg.append("text")
    // .attr("x", w / 2 )
    // .attr("y", 0)
    // .style("text-anchor", "middle")
    // .text("Title of Diagram");
                
        }
        function render1() {
            if(tipDIV==1)
            myResponsiveComponent(d3
                .select('#diagram'), {
                width: document.body.clientWidth / 1.2,
                height: document.body.clientHeight / 2

            });
            else
            myResponsiveComponent(d3
                .select('#diagram2'), {
                width: document.body.clientWidth / 1.2,
                height: document.body.clientHeight / 2

            });

        }
        render1();
        if (tipChart == 2)
            window.addEventListener('resize', render1);

    };


    d3.json(url, function (data) {
        console.log(url)
        data.forEach(d => {

            d[getColumn] = +d[getColumn]

        });
        render(data);
    })



    d3.selectAll("svg > *").remove();
}