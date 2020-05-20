

let getCountyName = ""//valoare default doar ca poate fi si stringul gol, si voi avea 400 pana cand nu-i dau toate criteriile
let getTableName = ""//idem
let getColumn = ""
let getYear = ""


let containerElement = document.querySelector("#container");
containerElement.addEventListener("click", onClick);


let jsonObject
function onClick(e) {

    if (e.target.tagName = "BUTTON") {

        if (e.target.hasAttribute("data-GetCountyName")) {
            getCountyName = e.target.getAttribute("data-getCountyName");
        }


        if (e.target.hasAttribute("data-getTableName")) {
            if (getTableName !== "") {
                getTableName = e.target.getAttribute("data-getTableName");
                getColumn = ""
                getYear = ""
            }
            else getTableName = e.target.getAttribute("data-getTableName");
        }


        if (e.target.hasAttribute("data-getYear")) {

            getYear = e.target.getAttribute("data-getYear");
        }

        if (e.target.hasAttribute("data-getColumn")) {
            getColumn = e.target.getAttribute("data-getColumn");

        }
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
                d.getColumn = +d.getColumn;//irelevant pt ca din string imi face number, asta-i rolul
            });
            render(data);
        });

        d3.selectAll("svg > *").remove(); //ca sa imi stearga chart-ul inainte de alt apel

    }
}
