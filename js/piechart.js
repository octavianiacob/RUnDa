import { numberToMonth } from './util.js'
export function pieChart(url, getColumn, tipChart) {


  d3.selectAll("svg > *").remove()
  const render = data => {
    function myResponsiveComponent(container, props) {
      if (getColumn === "")
        return 0
    
      const { width, height } = props
      d3.selectAll("svg > *").remove()
      let svg = d3.select('#diagram').selectAll('svg').data([null]).attr("class", "pie");
      svg = svg
        .enter().append('svg')
        .merge(svg)
        .attr('width', width)
        .attr('height', height)

      var pie = d3.pie()
        .value(function (d) { return d[getColumn] })

      var slices = pie(data);
      let radius = Math.min(width, height) / 2;
      var arc = d3.arc()
        .innerRadius(0)
        .outerRadius(radius - 40);

      // helper that returns a color based on an ID
      var color = d3.scaleOrdinal(d3.schemeCategory20);
      var g = svg.append('g')
        .attr('transform', `translate(${width / 2},${height / 2})`);

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
        .attr('y', function (d, i) { return 20 * (i + 1); })
    }
    function render1() {
      myResponsiveComponent(d3
        .select('#diagram'), {
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