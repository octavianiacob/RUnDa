let getCountyName = location.search.slice(7)//valoare default doar ca poate fi si stringul gol, si voi avea 400 pana cand nu-i dau toate criteriile
let getTableName = ""//idem
let getColumn = ""
let getYear = ""
let getCsv = ""
let url = ""
let urlForCsv = ""
let getPdf = ""

let containerElement = document.querySelector("#filters-container");

let buttonElement = document.querySelector("#exportButton")

let buttonDiagram = document.querySelector("#lineChartBtn");

let buttonDiagram1 = document.querySelector("#pieChartBtn");
let tipChart;
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

if (buttonElement)
  buttonElement.addEventListener("click", onClickExport)

// if(buttonDiagram)
//   buttonDiagram.addEventListener("click",diagrama);

// if(buttonDiagram1)
// buttonDiagram1.addEventListener("click",diagrama1);


//-------------------------------------------------------SELECTARE FILTRE+GENERARE DIAGRAMA----------------------------------------------------------

function onClick(e) {

  if (e.target.tagName == 'INPUT') {
    d3.selectAll("svg > *").remove();
    if (e.target.hasAttribute("data-getTableName")) {


      if (getTableName !== "") {

        getTableName = e.target.getAttribute("data-getTableName");

        getColumn = ""

        //getYear = ""
      }
      else
        getTableName = e.target.getAttribute("data-getTableName");
      console.log("ai apasat pe " + getTableName)

      //}

      switch (getTableName) {
        case "educatie":
          document.querySelector(".clasaEducatie").style.display = "flex";
          document.querySelector(".clasaVarste").style.display = "none";
          document.querySelector(".clasaRata").style.display = "none";
          document.querySelector(".clasaMedii").style.display = "none";
          break;
        case "varste":
          document.querySelector(".clasaVarste").style.display = "flex";
          document.querySelector(".clasaEducatie").style.display = "none";
          document.querySelector(".clasaRata").style.display = "none";
          document.querySelector(".clasaMedii").style.display = "none";

          break;
        case "rata":
          document.querySelector(".clasaRata").style.display = "flex";
          document.querySelector(".clasaEducatie").style.display = "none";
          document.querySelector(".clasaVarste").style.display = "none";
          document.querySelector(".clasaMedii").style.display = "none";
          document.querySelector("#filters-container").style.maxHeight = "500px";
          document.querySelector("#options-container").style.maxHeight = "500px";
          break;
        case "medii":
          document.querySelector(".clasaMedii").style.display = "flex";
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
      url = `/RunDa/api/counties/${getCountyName}?filtered_by=${getTableName}&year=${getYear}&sorted_by=month`


      document.getElementById('lineChartBtn').onclick = function alegereLineChart() {
        tipChart = 1;
        lineChart(url);
      }
      document.getElementById('pieChartBtn').onclick = function alegerePieChart() {
        tipChart = 2;
        pieChart(url);
      }
      document.getElementById('barChartBtn').onclick = function alegerePieChart() {
        tipChart = 3;
        barChart(url);
      }
      if(getColumn!="")
      switch (tipChart) {
        case 1: lineChart(url);
          break;
        case 2: pieChart(url);
          break;
        case 3: barChart(url);
          break;
      }

    }

  }

}


//------------------------------------------------------------------EXPORT CSV, XML etc-----------------------------------------------

function onClickExport(e) {
  if (e.target.tagName === "BUTTON") {

    if (e.target.hasAttribute("data-getCsv")) {
      getCsv = e.target.getAttribute("data-getCsv")
    }
    if (e.target.hasAttribute("data-getPdf")) {
      getPdf = e.target.getAttribute("data-getPdf")
    }


    if (!(getCountyName === "" || getTableName === "" || getColumn === "" || getCsv === "" || getYear === "")) {
      urlForCsv = `/RunDa/api/counties/${getCountyName}?filtered_by=${getTableName}&year=${getYear}&sorted_by=month`

      const objectToCsv = function (data) {
        //get the  HEADERS
        const csvRows = []
        const headers = Object.keys(data[0]);
        csvRows.push(headers.join(','))

        //loop over the rows
        for (const row of data) {
          //add the data to object
          const values = headers.map(header => {
            const escaped = ('' + row[header]).replace(/"/g, '\\"')//din number il fac string
            return `"${escaped}"`
          })
          csvRows.push(values.join(','))
        }
        //form csv

        return csvRows.join('\n')
      };

      const download = function (data) {
        const blob = new Blob([data], { type: 'text/csv' })
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.setAttribute('hidden', '')
        a.setAttribute('href', url)
        a.setAttribute('download', `${getTableName}_${getCountyName}_${getYear}.csv`)
        document.body.appendChild(a)
        a.click();
        document.body.removeChild(a)
      }


      const getReport = async function () {

        const res = await fetch(urlForCsv)
        const json = await res.json()
        //  console.log(json)

        console.log(getColumn);
        const data = json.map(row => ({

          ORASE: row.ORASE,
          month: row.month,
          year: row.year,
          [getColumn]: row[getColumn]


        }));
        const csvData = objectToCsv(data)
        download(csvData)

        console.log(data)

      }

      getReport();
    }

    // //pdf??

    // var json = '[["Customer Id","Name","Country"],[1,"John Hammond","United States"],[2,"Mudassar Khan","India"],[3,"Suzanne Mathews","France"],[4,"Robert Schidner","Russia"]]';

    // //Convert JSON string to JSON object.
    // var customers = eval(json);

    // //Convert JSON to HTML Table.
    // var table = document.createElement("TABLE");
    // table.border = "1";
    // table.Id = "tblCustomers";

    // //Get the count of columns.
    // var columnCount = customers[0].length;

    // //Add the header row.
    // var row = table.insertRow(-1);
    // for (var i = 0; i < columnCount; i++) {
    //   var headerCell = document.createElement("TH");
    //   headerCell.innerHTML = customers[0][i];
    //   row.appendChild(headerCell);
    // }

    // //Add the data rows.
    // for (var i = 1; i < customers.length; i++) {
    //   row = table.insertRow(-1);
    //   for (var j = 0; j < columnCount; j++) {
    //     var cell = row.insertCell(-1);
    //     cell.innerHTML = customers[i][j];
    //   }
    // }

    // //Append the Table to the HTML DIV.
    // var dvTable = document.getElementById("dvTable");
    // dvTable.innerHTML = "";
    // dvTable.appendChild(table);


    // //Convert Table to PDF.
    // html2canvas(document.getElementById('dvTable'), {
    //   onrendered: function (canvas) {
    //     var data = canvas.toDataURL();
    //     var docDefinition = {
    //       content: [{
    //         image: data,
    //         width: 500
    //       }]
    //     };
    //     pdfMake.createPdf(docDefinition).download("JSON.pdf");

    //     //Remove the Table.
    //     dvTable.innerHTML = "";
    //   }
    // });
  }
}



function barChart(url) {
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




    function myResponsiveComponent(container, props) {
      if (getColumn === "")
        return 0
      d3.selectAll("svg > *").remove()
      let { width, height } = props
      let svg = container.selectAll('svg').data([null])
      svg = svg.enter().append('svg')
        .merge(svg)
        .attr('width', width)
        .attr('height', height)


      let xValue = d => d[getColumn]//pun coloana, iar pe orizonatl o sa-mi puna val maxima din coloana pe care o aleg
      let yValue = d => numberToMonth(d.month).substring(0, 3);
      const margin = { top: 50, right: 40, bottom: 77, left: 90 };
      let innerWidth = width - margin.left - margin.right;
      let innerHeight = height - margin.top - margin.bottom;
      console.log(innerWidth);
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


function lineChart(url) {

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

// function myFunction() {
//   var btn = document.createElement("BUTTON");
//   btn.innerHTML = "CLICK ME";
//   document.body.appendChild(btn);
// }