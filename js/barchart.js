import { numberToMonth } from './util.js'
export function barChart(url, getTableName, getColumn, getCountyName) {
  const {
    scaleLinear,
    max,
    scaleBand,
    axisLeft,
    axisBottom,
    format,
  } = d3;



  const titleText = `${getTableName.charAt(0).toLocaleUpperCase() + getTableName.slice(1)} 
                       ${getCountyName.charAt(0).toLocaleUpperCase() + getCountyName.slice(1)}`;


  const xAxisLabelText = getColumn;


  const render = data => {//functie care face  un chenar de ala pt fiecare rand



    d3.selectAll("svg > *").remove()
    function myResponsiveComponent(container, props) {
      if (getColumn === "")
        return 0
      d3.selectAll("svg > *").remove()
      let { width, height } = props
      if (width < 500)
        width = 700
      let svg = container.selectAll('svg').data([null])
      svg = svg.enter().append('svg')
        .merge(svg)
        .attr('width', width)
        .attr('height', height)
        .style('fill','#137B80')
        .attr('version', "1.1")
        .attr('xmlns', "http://www.w3.org/2000/svg")


      let xValue = d => d[getColumn]//pun coloana, iar pe orizonatl o sa-mi puna val maxima din coloana pe care o aleg
      let yValue = d => numberToMonth(d.month).substring(0, 3);

      const margin = { top: 50, right: 40, bottom: 77, left: 90 };
      let innerWidth = width - margin.left - margin.right;
      let innerHeight = height - margin.top - margin.bottom;
      // console.log(innerWidth);// afiseaza toate valorile pe care le ia ecranul la resize
      //one rectangle for each row
      let xScale = scaleLinear()
        .domain([0, max(data, xValue)])//0 si max  element populatie
        .range([0, innerWidth])

      //.nice()// imi seteaza mai bine intervalul, dar am o bara in plus la final





      let yScale = scaleBand()
        .domain(data.map(yValue))//d inseamna 1 row
        .range([0, innerHeight])
        .padding(0.5);

      let g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);


      //  if (getColumn === 'rata_somaj' || getColumn === 'rata_somaj_femei' || getColumn === 'rata_somaj_barbat')
      let xAxisTickFormat = number =>
        format('.2s')(number)


      // else
      //   const xAxisTickFormat = number =>
      //     format('.2s')(number)


      let xAxis = axisBottom(xScale)
        .tickFormat(xAxisTickFormat)
        .tickSize(-innerHeight);

      g.append('g')//g.append('g) este selectia
        .call(axisLeft(yScale))
        .selectAll('.domain, .tick line')
        .remove();

      let xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate(0,${innerHeight})`);//ca sa cifrele din populatie jos

      xAxisG.select('.domain').remove();

      xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 65)
        .attr('x', innerWidth / 2)
        .attr('fill', 'black')
        .text(xAxisLabelText.replace('_', ' ').replace('_', ' '))



      g.selectAll('rect').data(data)
        .enter().append('rect')
         
        .attr('y', d => yScale(yValue(d)))
        .attr('width', d => xScale(xValue(d)))
        .attr('height', yScale.bandwidth());

      g.append('text')
        .style("fill", "grey")
        .attr('class', 'title')
        .attr('y', -10)
        .text(titleText)


    }


    function render1() {
      myResponsiveComponent(d3
        .select('#diagram'), {
        width: document.body.clientWidth / 1.1,
        height: document.body.clientHeight / 2

      });
    }

    render1();
    window.addEventListener('resize', render1);
    //d3.selectAll('.line-path').remove()
    //d3.selectAll("svg > *").remove();

  };


  d3.json(url, function (data) {
    // console.log(url)
    data.forEach(d => {

      d[getColumn] = +d[getColumn]

    });
    render(data);
  })


  d3.selectAll("svg > *").remove(); //ca sa imi stearga chart-ul inainte de alt apel
}