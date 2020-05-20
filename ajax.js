

let getCountyName = "cluj"//valoare default doar ca poate fi si stringul gol, si voi avea 400 pana cand nu-i dau toate criteriile
let getTableName = "educatie"//idem
let getColumn=""


let containerElement = document.querySelector("#container");


containerElement.addEventListener("click", onClick);

let jsonObject
function onClick(e) {

    if (e.target.tagName = "BUTTON") {

        if (e.target.hasAttribute("data-GetCountyName")) {
            getCountyName = e.target.getAttribute("data-getCountyName");
        }

        if (e.target.hasAttribute("data-getTableName")) {
            getTableName = e.target.getAttribute("data-getTableName");
        }

        if (e.target.hasAttribute("data-getColumn")) {
            getColumn = e.target.getAttribute("data-getColumn");
        }
    }
   
   // console.log({ getCountyName, getTableName, getColumn });

    //cand dau click pe search sa-mi faca fetch-ul complet
    let url = `/RunDa/api/counties/${getCountyName}?filtered_by=${getTableName}`

    let educatieArray = ['total_someri', 'fara_studii', 'primar', 'gimnazial', 'liceal', 'postliceal',
        'profesional_arte_meserii', 'universitar'];

    //    console.log(educatieArray[3])

    fetch(url)
        .then(function (resp) {
            //console.log(resp.json)
            return resp.json()

        })
        .then(function (jsonResp) {

            let jsonObject = jsonResp
            console.log(jsonObject)

        })
        .catch(error => {
            console.error(error);
        })


    console.log(jsonObject);

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



    const titleText = `Educatie ${getCountyName}`;
    const xAxisLabelText = 'Total Someri';

    const svg = select('svg');

    const width = +svg.attr('width');
    const height = +svg.attr('height');


    const render = data => {
        
        const xValue = d => d.getColumn
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

    let url1 = `/RunDa/api/counties/${getCountyName}?filtered_by=${getTableName}`;
    
    console.log('prostule'+getColumn)
    json(url1).then(data => {
        data.forEach(d => {
            d.getColumn = +d.getColumn;
        });
        render(data);
    });


}





















// function appendRandomFact(jsonResp) {
//     let randomIndex = Math.floor(Math.random() * jsonResp.length)//math.random si math.floor functioneaza, deci ma gandesc ca nu poate 
//     //sa-mi ia din jsonResp                                                     
//     let randomFact = jsonResp[randomIndex].liceal //liceal e o coloana din tabelul meu

//     let newParagraph = document.createElement("p");
//     newParagraph.textContent = randomFact;

//     document.body.appendChild(newParagraph)
// }



// if (document.getElementById(clicked_id).textContent === "educatie") {
//     console.log('esti un educatie')

// } else if (document.getElementById(clicked_id).textContent === "varste") {
//     console.log('esti un varste')
// }

// //if-ul a fost doar pt test



//-first attempt for get table name, county name etc
  // getCountyName = document.getElementById(clicked_id).textContent
    // fetchBtn = document.getElementById(clicked_id)


    // getTableName = document.getElementById(clicked_id).textContent
    // fetchBtn = document.getElementById(clicked_id)
