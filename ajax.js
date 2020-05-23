
let getCountyName = ""//valoare default doar ca poate fi si stringul gol, si voi avea 400 pana cand nu-i dau toate criteriile
let getTableName = ""//idem
let getColumn = ""
let getYear = ""
let containerElement = document.querySelector("#container");
containerElement.addEventListener("click", onClick);
function onClick(e) {


    d3.selectAll("svg > *").remove();

        if (e.target.hasAttribute("data-GetCountyName")) {
            getCountyName = e.target.getAttribute("data-getCountyName");
        }


        if (e.target.hasAttribute("data-getTableName")) {
            
           
            if (getTableName !== "") {
                
                getTableName = e.target.getAttribute("data-getTableName");
                getColumn = ""
                
                //getYear = ""
            }
            else getTableName = e.target.getAttribute("data-getTableName");
            switch(getTableName)
            {
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
        let url = `/RunDa/api/counties/${getCountyName}?filtered_by=${getTableName}&year=${getYear}`

        fetch(url)
            .then(function (resp) {
                return resp.json()

            })
            .then(function (jsonResp) {

                let jsonObject = jsonResp
                console.log(jsonObject)

            })
            .catch(error => {
                console.error(error);
            })

      //barChart(url);
        lineChart(url)
        //pieChart(url);

    }
  
}
function barChart(url)
{
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



    const titleText = `${getTableName} ${getCountyName}`;
    const xAxisLabelText = getColumn;

    const svg = select('svg');

    const width = +svg.attr('width');
    const height = +svg.attr('height');

    const render = data => {//functie care face  un chenar de ala pt fiecare rand

        const xValue = d => d[getColumn]//pun coloana, iar pe orizonatl o sa-mi puna val maxima din coloana pe care o aleg
        const yValue = d => d.month
        const margin = { top: 50, right: 40, bottom: 77, left: 180 };
        const innerWidth = width - margin.left - margin.right;
        const innerHeight = height - margin.top - margin.bottom;
        //one rectangle for each row
        const xScale = scaleLinear()
            .domain([0, max(data, xValue)])//0 si max  element populatie
            .range([0, innerWidth]);

        const yScale = scaleBand()
            .domain(data.map(yValue))//d inseamna 1 row
            .range([0, innerHeight])
            .padding(0.1);

        const g = svg.append('g')
            .attr('transform', `translate(${margin.left},${margin.top})`);

        const xAxisTickFormat = number =>
            format('.3s')(number)
                .replace('G', 'B');

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
            .text(xAxisLabelText);

        g.selectAll('rect').data(data)
            .enter().append('rect')
            .attr('y', d => yScale(yValue(d)))
            .attr('width', d => xScale(xValue(d)))
            .attr('height', yScale.bandwidth());

        g.append('text')
            .attr('class', 'title')
            .attr('y', -10)
            .text(titleText);
    };

    json(url).then(data => {
        data.forEach(d => {
            d[getColumn] = +d[getColumn];//irelevant pt ca din string imi face number, asta-i rolul
        });
        render(data);
    });

    d3.selectAll("svg > *").remove(); //ca sa imi stearga chart-ul inainte de alt apel
}


function lineChart(url){
    const {
        select,
        scaleLinear,
        extent,
        axisLeft,
        axisBottom,
        line,
        curveBasis,
        json,
        scaleBand
      } =d3;
      
      const svg = select('svg');
      
      const width = +svg.attr('width');
      const height = +svg.attr('height');
      
      const render = data => {
        const title = `${getTableName} ${getCountyName}`;
        
        const xValue = d => d.month;
        const xAxisLabel = getColumn;
        
        const yValue = d => d[getColumn]
        const circleRadius = 6;
        const yAxisLabel = '';
        
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
          .tickPadding(15);
        
        const yAxis = axisLeft(yScale)
          .tickSize(-innerWidth)
          .tickPadding(10);
        
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
            .text(xAxisLabel);
        
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
      };
      
      json(url)
        .then(data => {
            console.log(url)
          data.forEach(d => {
              
            d[getColumn]= +d[getColumn]
            
          });
          render(data);
        });

        d3.selectAll("svg > *").remove(); //ca sa imi stearga chart-ul inainte de alt apel
}

function pieChart(url)
{    const {
    json,
  } =d3; 
    const render = data => {
    
    var pie = d3.pie()
  .value(function(d) { return d[getColumn] })

var slices = pie(data);

var arc = d3.arc()
  .innerRadius(0)
  .outerRadius(140);

// helper that returns a color based on an ID
var color = d3.scaleOrdinal(d3.schemeCategory10);

var svg = d3.select('svg')
.attr("class","pie");
var g = svg.append('g')
  .attr('transform', 'translate(300, 180)');

var arcGraph =g.selectAll('path.slice')
  .data(slices)
    .enter();
arcGraph.append('path')
        .attr('class', 'slice')
        .attr('d', arc)
        .attr('fill', function(d) {
          return color(d.data.month);
        });

arcGraph.append("text")
.attr("transform", function(d) { return "translate(" + arc.centroid(d) + ")"; })

    .attr("dy", "0.35em")
    .text(function(d){return d.data[getColumn]});
// building a legend is as simple as binding
// more elements to the same data. in this case,
// <text> tags
svg.append('g')
  .attr('class', 'legend')
    .selectAll('text')
    .data(slices)
      .enter()
        .append('text')
          .text(function(d) { return '• ' + d.data.month; })
          .attr('fill', function(d) { return color(d.data.month); })
          .attr('y', function(d, i) { return 20 * (i + 1); })
    };
        
    json(url)
        .then(data => {
            console.log(url)
          data.forEach(d => {
              
            d[getColumn]= +d[getColumn]
            
          });
          render(data);
        });

        d3.selectAll("svg > *").remove(); 
}
