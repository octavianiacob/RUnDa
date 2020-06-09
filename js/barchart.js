import { numberToMonth } from './util.js'
export function barChart(url, getTableName, getColumn, getCountyName, tipDIV) {
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
      if (tipDIV == 1)
        d3.select("#diagram svg").remove()
      else
        d3.select("#diagram2 svg").remove();

      let { width, height } = props
      if (width < 500)//scroll pe diagrama cand e mai mica ca 500
        width = 700

      let svg = container.selectAll('svg').data([null])//selectez svg-ul
      svg = svg.enter().append('svg')//il formatez in functie de width si height la care a ajuns
        .merge(svg)
        .attr('width', width)
        .attr('height', height)
        .attr('version', "1.1")
        .attr('xmlns', "http://www.w3.org/2000/svg")// pt export SVG


      let xValue = d => d[getColumn]//pun coloana, iar pe orizontal o sa-mi puna val maxima din coloana pe care o aleg
      let yValue = d => numberToMonth(d.month).substring(0, 3);//d inseamna 1 row

      const margin = { top: 50, right: 40, bottom: 77, left: 90 };

      let innerWidth = width - margin.left - margin.right;//dimensiunea ecranului pe orizontala la fiecare resize
      let innerHeight = height - margin.top - margin.bottom;//pe verticala

      

      //one rectangle for each row

      let xScale = scaleLinear()
        .domain([0, max(data, xValue)])//0 si max  element coloana(liceal, gimnaizal etc)
        .range([0, innerWidth])//cat sa afisez pe ecran in functie de valorile de mai sus

      //.nice()// imi seteaza mai bine intervalul, dar am o bara in plus la final




 
      let yScale = scaleBand()//scalez cu scaleBand ca sa scalez in functie de o anumita categorie, in cazul meu luna
        .domain(data.map(yValue))//mapez fiecare element 
        .range([0, innerHeight])
        .padding(0.5);

      let g = svg.append('g')
        .attr('transform', `translate(${margin.left},${margin.top})`);//ca sa pun axa verticala in partea stanga


      let xAxisTickFormat = number =>
        format('.2s')(number)//formatarea numerelor

      let xAxis = axisBottom(xScale)
        .tickFormat(xAxisTickFormat)
        .tickSize(-innerHeight);

      g.append('g')//g.append('g) este selectia(append un nou grup de elemente)
        .call(axisLeft(yScale))//pun axa verticala
        .selectAll('.domain, .tick line')   
        .remove();

      let xAxisG = g.append('g').call(xAxis)
        .attr('transform', `translate(0,${innerHeight})`);//ca sa pun axa orizontala jos

      xAxisG.select('.domain').remove();//sterg liniile care marcheaza locul de unde pleaca valoarea

      xAxisG.append('text')
        .attr('class', 'axis-label')
        .attr('y', 65) //pozitionare
        .attr('x', innerWidth / 2)//pozitionare
        .attr('fill', 'black')
        .text(xAxisLabelText.replace('_', ' ').replace('_', ' '))



      g.selectAll('rect').data(data)
        .enter().append('rect')//pentru fiecare valoare din coloana selectata, atribui cate un dreptunghi care formeaza bara
        .attr('y', d => yScale(yValue(d)))// imi face cate o bara pentru fiecare
        .attr('width', d => xScale(xValue(d)))//d one row si returneaza xScale din valoare
        .attr('height', yScale.bandwidth())//in functie de numarul din baza de date, imi face bara mai lunga sau mai scurta
        .style('fill', '#137B80')


      g.append('text')//cum sa fie titlu
        .style("fill", "grey")
        .attr('class', 'title')
        .attr('y', -10)
        .text(titleText)


    }


    function render1() {
      if (tipDIV == 1)
        myResponsiveComponent(d3
          .select('#diagram'), {
          width: document.body.clientWidth / 1.1,
          height: document.body.clientHeight / 2

        });
      else
        myResponsiveComponent(d3
          .select('#diagram2'), {
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