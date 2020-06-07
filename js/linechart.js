import { numberToMonth } from './util.js'
export function lineChart(url, getTableName, getColumn, getCountyName,tipDIV) {

  const {
    scaleLinear,
    extent,
    axisLeft,
    axisBottom,
    line,
    curveBasis,
    scaleBand,
    selectAll

  } = d3;


  const render = data => {

    function myResponsiveComponent(container, props) {
      if (getColumn === "")
        return 0
        if(tipDIV==1)
        d3.select("#diagram svg").remove()
        else
        d3.select("#diagram2 svg").remove();
      let { width, height } = props
      if (width < 500)//fac scroll aici pe diagrama
        width = 700
      let svg = container.selectAll('svg').data([null])
      svg = svg.enter().append('svg')
        .merge(svg)
        .attr('width', width)
        .attr('height', height)
        .attr('version', "1.1")
        .attr('xmlns', "http://www.w3.org/2000/svg")

      const title = `${getTableName.charAt(0).toLocaleUpperCase() + getTableName.slice(1)} 
                       ${getCountyName.charAt(0).toLocaleUpperCase() + getCountyName.slice(1)}`;


      const xValue = d => numberToMonth(d.month).substring(0, 3);
      const xAxisLabel = 'Month';
      const yValue = d => d[getColumn];
      const yAxisLabel = getColumn.charAt(0).toLocaleUpperCase() + getColumn.slice(1)


      const margin = { top: 60, right: 40, bottom: 88, left: 105 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const xScale = scaleBand()
        .domain(data.map(xValue))//d inseamna 1 row
        .range([0, innerWidth])




      const yScale = scaleLinear()
        .domain(extent(data, yValue))//interval pt cea mica-mare valoare
        .range([innerHeight, 0])
        .nice();


      const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const xAxis = axisBottom(xScale)
        .tickSize(-innerHeight)
        .tickPadding(15)


      const yAxis = axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickPadding(1)


      const yAxisG = g.append('g').call(yAxis);
      yAxisG.selectAll('.domain').remove()
        .attr('transform', `translate(500,${margin.top})`);

      yAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', -60)
        .attr('x', -innerHeight / 2)
        .style('fill', '#8E8883')
        .style('font-size', '2.5em')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
        .text(yAxisLabel.replace('_', ' ').replace('_', ' '));

      const xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate(0,${innerHeight})`);

      xAxisG.select('.domain').remove();

      xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 80)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text(xAxisLabel.replace('_', ' ').replace('_', ' '));

      const lineGenerator = line()
        .x(d => xScale(xValue(d)))
        .y(d => yScale(yValue(d)))
        .curve(curveBasis)


      g.append('path')
        .attr('class', 'line-path')
        .attr('d', lineGenerator(data))
        //styles pentru cum sa arate linia
        .style('fill', "none")
        .style('stroke', "#137B80")
        .style('stroke-width', '4')
        .style('stroke-linejoin', 'round')
        .style('stroke-linecap', 'round')


      g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .style('font-size', '2em')
        .style('font-family', 'sans-serif')

        .text(title);
    }

    function render1() {
        if(tipDIV==1)
        myResponsiveComponent(d3
            .select('#diagram'), {
            width: document.body.clientWidth / 1.3,
            height: document.body.clientHeight / 2

        });
        else
        myResponsiveComponent(d3
            .select('#diagram2'), {
            width: document.body.clientWidth / 1.3,
            height: document.body.clientHeight / 2

        });
    }

    render1();
    window.addEventListener('resize', render1);
    //d3.selectAll('.line-path').remove()
    //d3.selectAll("svg > *").remove();


  };

  d3.json(url, function (data) {
    console.log(url)
    data.forEach(d => {

      d[getColumn] = +d[getColumn]

    });
    render(data);
  })



  d3.selectAll("svg > *").remove(); //ca sa imi stearga chart-ul inainte de alt apel

}//lineChart()