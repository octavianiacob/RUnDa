let getCountyName = location.search.slice(7)//valoare default doar ca poate fi si stringul gol, si voi avea 400 pana cand nu-i dau toate criteriile
let getTableName = ""//idem
let getColumn = ""
let getYear = ""
let containerElement = document.querySelector("#container");
function numberToMonth(number) {
  let month;
  switch (number) {
    case "1":
      month = "January";
      break;
    case "2":
      month = "February";
      break;
    case "3":
      month = "March";
      break;
    case "4":
      month = "April";
      break;
    case "5":
      month = "May";
      break;
    case "6":
      month = "June";
      break;
    case "7":
      month = "July";
      break;
    case "8":
      month = "August";
      break;
    case "9":
      month = "September";
      break;
    case "10":
      month = "October";
      break;
    case "11":
      month = "November";
      break;
    case "12":
      month = "December";
      break;
  }
  return month;
}
if (containerElement)//ca sa scap de eroarea cu addEventList null
  containerElement.addEventListener("click", onClick);
function onClick(e) {


  d3.selectAll("svg > *").remove();


  if (e.target.hasAttribute("data-getTableName")) {


    if (getTableName !== "") {

      getTableName = e.target.getAttribute("data-getTableName");
      getColumn = ""

      //getYear = ""
    }
    else getTableName = e.target.getAttribute("data-getTableName");
    switch (getTableName) {
      case "educatie":
        document.querySelector(".clasaEducatie").style.display = "inline";
        document.querySelector(".clasaVarste").style.display = "none";
        document.querySelector(".clasaRata").style.display = "none";
        document.querySelector(".clasaMedii").style.display = "none";
        break;
      case "varste":
        document.querySelector(".clasaVarste").style.display = "inline";
        document.querySelector(".clasaEducatie").style.display = "none";
        document.querySelector(".clasaRata").style.display = "none";
        document.querySelector(".clasaMedii").style.display = "none";
        break;
      case "rata":
        document.querySelector(".clasaRata").style.display = "inline";
        document.querySelector(".clasaEducatie").style.display = "none";
        document.querySelector(".clasaVarste").style.display = "none";
        document.querySelector(".clasaMedii").style.display = "none";
        break;
      case "medii":
        document.querySelector(".clasaMedii").style.display = "inline";
        document.querySelector(".clasaEducatie").style.display = "none";
        document.querySelector(".clasaVarste").style.display = "none";
        document.querySelector(".clasaRata").style.display = "none";
        break;
    }
  }


  if (e.target.hasAttribute("data-getYear")) {

    getYear = e.target.getAttribute("data-getYear");
  }

  if (e.target.hasAttribute("data-getColumn")) {
    getColumn = e.target.getAttribute("data-getColumn");

  }

  if (!(getCountyName === "" || getTableName === "" || getColumn === "" || getYear === "")) {
    let url = `/RunDa/api/counties/${getCountyName}?filtered_by=${getTableName}&year=${getYear}&sorted_by=month`

    fetch(url)
      .then(function (resp) {
        return resp.json()

      })
      .then(function (jsonResp) {

        let jsonObject = jsonResp
        //console.log(jsonObject)

      })
      .catch(error => {
        console.error(error);
      })
    console.log(url)

    // if (getColumn != "")
    // barChart(url);

    if (getColumn != "")
      lineChart(url)

    // if (getColumn != "")
    //   pieChart(url);

  }

}
function barChart(url) {
  const {
    select,
    scaleLinear,
    max,
    scaleBand,
    axisLeft,
    axisBottom,
    format,
    json
  } = d3;



  const titleText = `${getTableName.charAt(0).toLocaleUpperCase() + getTableName.slice(1)} 
                     ${getCountyName.charAt(0).toLocaleUpperCase() + getCountyName.slice(1)}`;


  const xAxisLabelText = getColumn;

  const yAxisLabelText = 'Month'


  const render = data => {//functie care face  un chenar de ala pt fiecare rand




    function myResponsiveComponent(container, props) {
      if (getColumn === "")
        return 0
      d3.selectAll("svg > *").remove()
      const { width, height } = props
      let svg = container.selectAll('svg').data([null])
      svg = svg.enter().append('svg')
        .merge(svg)
        .attr('width', width)
        .attr('height', height)


      const xValue = d => d[getColumn]//pun coloana, iar pe orizonatl o sa-mi puna val maxima din coloana pe care o aleg
      const yValue = d => numberToMonth(d.month).substring(0, 3);
      const margin = { top: 50, right: 40, bottom: 77, left: 90 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;
      //one rectangle for each row
      const xScale = scaleLinear()
        .domain([0, max(data, xValue)])//0 si max  element populatie
        .range([0, innerWidth])
      //.nice()// imi seteaza mai bine intervalul, dar am o bara in plus la final





      const yScale = scaleBand()
        .domain(data.map(yValue))//d inseamna 1 row
        .range([0, innerHeight])
        .padding(0.5);

      const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);


      //  if (getColumn === 'rata_somaj' || getColumn === 'rata_somaj_femei' || getColumn === 'rata_somaj_barbat')
      const xAxisTickFormat = number =>
        format('.2s')(number)


      // else
      //   const xAxisTickFormat = number =>
      //     format('.2s')(number)


      const xAxis = axisBottom(xScale)
        .tickFormat(xAxisTickFormat)
        .tickSize(-innerHeight);

      g.append('g')//g.append('g) este selectia
        .call(axisLeft(yScale))
        .selectAll('.domain, .tick line')
        .remove();

      const xAxisG = g.append('g').call(xAxis)
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
        width: document.body.clientWidth,
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


function lineChart(url) {

  const {
    select,
    scaleLinear,
    extent,
    axisLeft,
    axisBottom,
    line,
    curveBasis,
    json,
    scaleBand,
    selectAll,
    style

  } = d3;


  const render = data => {

    function myResponsiveComponent(container, props) {
      if (getColumn === "")
        return 0
      selectAll("svg > *").remove()
      const { width, height } = props
      let svg = container.selectAll('svg').data([null])
      svg = svg.enter().append('svg')
        .merge(svg)
        .attr('width', width)
        .attr('height', height)

      const title = `${getTableName.charAt(0).toLocaleUpperCase() + getTableName.slice(1)} 
                     ${getCountyName.charAt(0).toLocaleUpperCase() + getCountyName.slice(1)}`;


      const xValue = d => numberToMonth(d.month).substring(0, 3);
      const xAxisLabel = getColumn.charAt(0).toLocaleUpperCase() + getColumn.slice(1)

      const yValue = d => d[getColumn];
      const yAxisLabel = 'Month';

      const margin = { top: 60, right: 40, bottom: 88, left: 105 };
      const innerWidth = width - margin.left - margin.right;
      const innerHeight = height - margin.top - margin.bottom;

      const xScale = scaleBand()
        .domain(data.map(xValue))//d inseamna 1 row
        .range([0, innerWidth])




      const yScale = scaleLinear()
        .domain(extent(data, yValue))
        .range([innerHeight, 0])
        .nice();


      const g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);

      const xAxis = axisBottom(xScale)
        .tickSize(-innerHeight)
        .tickPadding(15)


      const yAxis = axisLeft(yScale)
        .tickSize(-innerWidth)
        .tickPadding(10)


      const yAxisG = g.append('g').call(yAxis);
      yAxisG.selectAll('.domain').remove();

      yAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', -60)
        .attr('x', -innerHeight / 2)
        .attr('fill', 'black')
        .attr('transform', `rotate(-90)`)
        .attr('text-anchor', 'middle')
        .text(yAxisLabel);

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
        .curve(curveBasis);

      g.append('path')
        .attr('class', 'line-path')
        .attr('d', lineGenerator(data));

      g.append('text')
        .attr('class', 'title')
        .attr('y', -10)
        .text(title);
    }

    function render1() {
      myResponsiveComponent(d3
        .select('#diagram'), {
        width: document.body.clientWidth,
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


function pieChart(url) {

  const render = data => {
    function myResponsiveComponent(container, props) {
      if (getColumn === "")
        return 0
      d3.selectAll("svg > *").remove()
      const { width, height } = props
      let svg = container.selectAll('svg').data([null]).attr("class", "pie");
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
      var color = d3.scaleOrdinal(d3.schemeCategory10);
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
        .text(function (d) { return '• ' + numberToMonth(d.data.month).substring(0, 3); })
        .attr('fill', function (d) { return color(d.data.month); })
        .attr('y', function (d, i) { return 20 * (i + 1); })
    }
    function render1() {
      myResponsiveComponent(d3
        .select('#diagram'), {
        width: document.body.clientWidth,
        height: document.body.clientHeight / 2

      });
    }
    render1();
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