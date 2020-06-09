import { barChart } from './barchart.js'
import { lineChart } from './linechart.js'
import { pieChart } from './piechart.js'
import { exportCSV, exportSVG, exportPDF, exportXML } from './exports.js'

let countyList = location.search.slice(7).split('&');
let getCountyName = countyList[0];
let getSecondCounty = countyList[1];
let getTableName = "";
let getColumn = "";
let getYear = "";
let url = "";
let url2 = "";
let exportURL1 = "";
let exportURL2 = "";
let containerElement = document.querySelector("#filters-container");
let tipChart = 0;

if (containerElement)
    containerElement.addEventListener("click", onClick);

function onClick(e) {
    if (e.target.tagName == 'INPUT') {
        d3.selectAll("svg > *").remove();
        if (e.target.hasAttribute("data-getTableName")) {
            if (getTableName !== "") {
                getTableName = e.target.getAttribute("data-getTableName");
                getColumn = "";
            } else
                getTableName = e.target.getAttribute("data-getTableName");

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
            url = `/RunDa/api/counties/${getCountyName}?filtered_by=${getTableName}&year=${getYear}&sorted_by=month`;
            if (getSecondCounty != undefined) {
                url2 = `/RunDa/api/counties/${getSecondCounty}?filtered_by=${getTableName}&year=${getYear}&sorted_by=month`;
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
            document.getElementById('exportCSV').onclick = function exportareCSV() {
                if (tipChart != 0) {
                    exportURL1 = `/RunDa/api/counties/${getCountyName}?filtered_by=${getTableName}&year=${getYear}&sorted_by=month`;
                    if (getCountyName != undefined && getSecondCounty != undefined) {
                        exportURL2 = `/RunDa/api/counties/${getSecondCounty}?filtered_by=${getTableName}&year=${getYear}&sorted_by=month`
                        exportCSV(exportURL1, getTableName, getCountyName, getYear, getColumn);
                        exportCSV(exportURL2, getTableName, getSecondCounty, getYear, getColumn);
                    } else {
                        exportCSV(exportURL1, getTableName, getCountyName, getYear, getColumn);
                    }
                }
            }
            document.getElementById('exportPDF').onclick = function exportarePDF() {
                if (tipChart != 0) {
                    exportURL1 = `/RunDa/api/counties/${getCountyName}?filtered_by=${getTableName}&year=${getYear}&sorted_by=month`;
                    if (getCountyName != undefined && getSecondCounty != undefined) {
                        exportURL2 = `/RunDa/api/counties/${getSecondCounty}?filtered_by=${getTableName}&year=${getYear}&sorted_by=month`
                        exportPDF(exportURL1, getTableName, getCountyName, getYear, getColumn);
                        exportPDF(exportURL2, getTableName, getSecondCounty, getYear, getColumn);
                    } else {
                        exportPDF(exportURL1, getTableName, getCountyName, getYear, getColumn);
                    }
                }
            }
            document.getElementById('exportXML').onclick = function exportareXML() {
                if (tipChart != 0) {
                    exportURL1 = `/RunDa/api/counties/${getCountyName}?filtered_by=${getTableName}&year=${getYear}&sorted_by=month`;
                    if (getCountyName != undefined && getSecondCounty != undefined) {
                        exportURL2 = `/RunDa/api/counties/${getSecondCounty}?filtered_by=${getTableName}&year=${getYear}&sorted_by=month`
                        exportXML(exportURL1, getTableName, getCountyName, getYear, getColumn);
                        exportXML(exportURL2, getTableName, getSecondCounty, getYear, getColumn);
                    } else {
                        exportXML(exportURL1, getTableName, getCountyName, getYear, getColumn);
                    }
                }
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
        }
    }
}