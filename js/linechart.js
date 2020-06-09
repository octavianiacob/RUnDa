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

      let svg = container.selectAll('svg').data([null])//selectez svg-ul
      svg = svg.enter().append('svg')//il formatez in functie de width si height la care a ajuns
        .merge(svg)
        .attr('width', width)
        .attr('height', height)
        .attr('version', "1.1")
        .attr('xmlns', "http://www.w3.org/2000/svg")// pt svg

      const title = `${getTableName.charAt(0).toLocaleUpperCase() + getTableName.slice(1)} 
                       ${getCountyName.charAt(0).toLocaleUpperCase() + getCountyName.slice(1)}`;


      const xValue = d => numberToMonth(d.month).substring(0, 3);
      const xAxisLabel = 'Month';
      const yValue = d => d[getColumn];
      const yAxisLabel = getColumn.charAt(0).toLocaleUpperCase() + getColumn.slice(1)


      const margin = { top: 60, right: 40, bottom: 88, left: 105 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const xScale = scaleBand()//scalez cu scaleBand ca sa scalez in functie de o anumita categorie, in cazul meu luna
        .domain(data.map(xValue))//d inseamna 1 row(de   la linia 41)
        .range([0, innerWidth])




      const yScale = scaleLinear()
        .domain(extent(data, yValue))//interval pt cea mica-mare valoare
        .range([innerHeight, 0])
        .nice();


      const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);//ca sa pun axa verticala in partea stanga

      const xAxis = axisBottom(xScale)
        .tickSize(-innerHeight)
        .tickPadding(15)


      const yAxis = axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickPadding(1)


      const yAxisG = g.append('g').call(yAxis);
      yAxisG.selectAll('.domain').remove()//sterg liniile care marcheaza locul de unde pleaca valoarea
        .attr('transform', `translate(500,${margin.top})`);

      yAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', -60)
        .attr('x', -innerHeight / 2)
        .style('fill', '#8E8883')
        .style('font-size', '2.5em')
        .attr('transform', `rotate(-90)`)//sa fie la 90 grade fata de modul obisnuit de citire
        .attr('text-anchor', 'middle')
        .text(yAxisLabel.replace('_', ' ').replace('_', ' '));

      const xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate(0,${innerHeight})`);//ca sa pun axa orizontala jos

      xAxisG.select('.domain').remove();//sterg liniile care marcheaza locul de unde pleaca valoarea


      xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 80)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text(xAxisLabel.replace('_', ' ').replace('_', ' '));//scot _ din numele coloanei

      const lineGenerator = line()//line e importata din d3
        .x(d => xScale(xValue(d)))//returneaza pixel coordinates
        .y(d => yScale(yValue(d)))
        .curve(curveBasis)


      g.append('path')
        .attr('class', 'line-path')
        .attr('d', lineGenerator(data))//apelez functia de mai sus ca sa-mi puna efectiv linia unde vreau eu
        //styles pentru cum sa arate linia
        .style('fill', "none")//scot excesul de culoare din linie
        .style('stroke', "#137B80")
        .style('stroke-width', '4')
        .style('stroke-linejoin', 'round')//sa-i faca colturile mai putin ascutite
        .style('stroke-linecap', 'round')


      g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .style('font-size', '1em')
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
    data.forEach(d => {

      d[getColumn] = +d[getColumn]

    });
    render(data);
  })



  d3.selectAll("svg > *").remove(); //ca sa imi stearga chart-ul inainte de alt apel

}//lineChart()