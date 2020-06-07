import { barChart } from './barchart.js'
import { lineChart } from './linechart.js'
import { pieChart } from './piechart.js'
import { exportCSV, exportSVG, exportPDF } from './exports.js'

let countyList = location.search.slice(7).split('&');
console.log("Location 1 = " + countyList[0] + " Location 2 = " + countyList[1]);

let getCountyName = countyList[0]
let getSecondCounty = countyList[1];
let getTableName = "" //idem
let getColumn = ""
let getYear = ""
let getCsv = ""
let url = ""
let url2 = ""
let urlForCsv = ""
let urlForPDF = ""
let urlForPDF2 = ""
let getPdf = ""

let containerElement = document.querySelector("#filters-container");

let buttonElement = document.querySelector("#exportCSV")

let tipChart = 0;

if (containerElement) //ca sa scap de eroarea cu addEventList null
    containerElement.addEventListener("click", onClick);

if (buttonElement)
    buttonElement.addEventListener("click", onClickExport)



//-------------------------------------------------------SELECTARE FILTRE+GENERARE DIAGRAMA----------------------------------------------------------

function onClick(e) {

    if (e.target.tagName == 'INPUT') {
        d3.selectAll("svg > *").remove();
        if (e.target.hasAttribute("data-getTableName")) {


            if (getTableName !== "") {

                getTableName = e.target.getAttribute("data-getTableName");

                getColumn = ""

                //getYear = ""
            } else
                getTableName = e.target.getAttribute("data-getTableName");
            console.log("ai apasat pe " + getTableName)

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
        if (getColumn == "") {
            document.querySelector("#diagram").style.display = "none";
            document.querySelector("#diagram2").style.display = "none";
        } else {
            document.querySelector("#diagram").style.display = "block";
            document.querySelector("#diagram2").style.display = "block";
        }
        if (!(getCountyName === "" || getTableName === "" || getColumn === "" || getYear === "")) {
            url = `/RunDa/api/counties/${getCountyName}?filtered_by=${getTableName}&year=${getYear}&sorted_by=month`

            if (getSecondCounty != undefined) {
                url2 = `/RunDa/api/counties/${getSecondCounty}?filtered_by=${getTableName}&year=${getYear}&sorted_by=month`
                console.log(url2);
            }

            document.getElementById('lineChartBtn').onclick = function alegereLineChart() {
                tipChart = 1;
                if (url != "" && url2 != "") {
                    lineChart(url, getTableName, getColumn, getCountyName, 1);
                    lineChart(url2, getTableName, getColumn, getSecondCounty, 2);
                } else
                    lineChart(url, getTableName, getColumn, getCountyName, 1);

            }
            document.getElementById('pieChartBtn').onclick = function alegerePieChart() {
                tipChart = 2;
                if (url != "" && url2 != "") {
                    pieChart(url,getTableName, getColumn, tipChart, getCountyName, 1);
                    pieChart(url2,getTableName, getColumn, tipChart, getSecondCounty, 2);
                } else
                    pieChart(url,getTableName, getColumn, tipChart, getCountyName, 1);
            }
            document.getElementById('barChartBtn').onclick = function alegerePieChart() {
                tipChart = 3;
                if (url != "" && url2 != "") {
                    barChart(url, getTableName, getColumn, getCountyName, 1);
                    barChart(url2, getTableName, getColumn, getSecondCounty, 2);
                } else
                    barChart(url, getTableName, getColumn, getCountyName, 1);
                // if(getColumn=="")
                // document.querySelector("#diagram").style.display = "none";


            }

            if (getColumn != "")
                switch (tipChart) {
                    case 1:
                        if (url != "" && url2 != "") {
                            lineChart(url, getTableName, getColumn, getCountyName, 1);
                            lineChart(url2, getTableName, getColumn, getSecondCounty, 2);
                        } else
                            lineChart(url, getTableName, getColumn, getCountyName, 1);
                        break;
                    case 2:
                        if (url != "" && url2 != "") {
                            pieChart(url,getTableName, getColumn, tipChart, getCountyName, 1);
                            pieChart(url2,getTableName, getColumn, tipChart, getSecondCounty, 2);
                        } else
                            pieChart(url,getTableName, getColumn, tipChart, getCountyName, 1);
                        break;
                    case 3:
                        if (url != "" && url2 != "") {
                            barChart(url, getTableName, getColumn, getCountyName, 1);
                            barChart(url2, getTableName, getColumn, getSecondCounty, 2);
                        } else
                            barChart(url, getTableName, getColumn, getCountyName, 1);
                        break;
                }

            document.getElementById('exportSVG').onclick = function exportareSVG() {
                if (tipChart != 0) {
                    if (getCountyName != undefined && getSecondCounty != undefined) {
                        exportSVG(getTableName, getCountyName, getYear, 1);
                        exportSVG(getTableName, getSecondCounty, getYear, 2);
                    } else
                        exportSVG(getTableName, getCountyName, getYear, 1);
                }
            }

            document.getElementById('exportPDF').onclick = function exportarePDF() {
                if (tipChart != 0) {
                    urlForPDF = `/RunDa/api/counties/${getCountyName}?filtered_by=${getTableName}&year=${getYear}&sorted_by=month`;
                    if (getCountyName != undefined && getSecondCounty != undefined) {
                        urlForPDF2 = `/RunDa/api/counties/${getSecondCounty}?filtered_by=${getTableName}&year=${getYear}&sorted_by=month`
                        exportPDF(urlForPDF, getTableName, getCountyName, getYear, getColumn);
                        exportPDF(urlForPDF2, getTableName, getSecondCounty, getYear, getColumn);
                    } else {
                        console.log("A intrat pe exportPDF()");
                        exportPDF(urlForPDF, getTableName, getCountyName, getYear, getColumn);
                    }
                }
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
            getPdf = e.target.getAttribute("data-getPdf");
            console.log("ai dat clickss");
        }


        if (!(getCountyName === "" || getTableName === "" || getColumn === "" || getCsv === "" || getYear === "")) {
            urlForCsv = `/RunDa/api/counties/${getCountyName}?filtered_by=${getTableName}&year=${getYear}&sorted_by=month`
            if (getCountyName != undefined && getSecondCounty != undefined) {
                let url2ForCsv = `/RunDa/api/counties/${getSecondCounty}?filtered_by=${getTableName}&year=${getYear}&sorted_by=month`
                exportCSV(urlForCsv, getTableName, getCountyName, getYear, getColumn); //apelez functia care face export CSV
                exportCSV(url2ForCsv, getTableName, getSecondCounty, getYear, getColumn); //apelez functia care face export CSV
            } else {
                exportCSV(urlForCsv, getTableName, getCountyName, getYear, getColumn);
                exportPDF(urlForCsv, getTableName, getCountyName, getYear, getColumn);
                console.log("ai dat clicksss");
            }
        }


    }
}