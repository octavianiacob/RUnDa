function exportFile(data, extension, getTableName, getCountyName, getYear) {
    const blob = new Blob([data], { type: `text/${extension}` }) //cu blob pot downloada
    const url = window.URL.createObjectURL(blob); //trimit blob catre browser.imi da posiibilitatea sa fac un url dintr-un object(csv)
    const a = document.createElement('a'); //a tag pt click
    a.setAttribute('hidden', '')
    a.setAttribute('href', url) //unde sa trimit 
    a.setAttribute('download', `${getTableName}_${getCountyName}_${getYear}.${extension}`)
    document.body.appendChild(a) //inainte sa dau click
    a.click();
    document.body.removeChild(a) //dupa ce dau click
}

export function exportCSV(urlForCsv, getTableName, getCountyName, getYear, getColumn) {
    const objectToCsv = function (data) {
        const csvRows = [] //array pt ca o sa am multe randuri tip csv
        const headers = Object.keys(data[0]); //aici iau cheia obiectului(si primul element din data)
        csvRows.push(headers.join(',')) //prima oara pun headers, separate de virgula(ca-i csv)
        for (const row of data) { //parcurg fiecare rand 
            const values = headers.map(header => { //add the data to object
                const escaped = ('' + row[header]).replace(/"/g, '\\"') //din number il fac string
                //pun ghilimele ca sa evit ca un element din csv-ul meu sa aiba el o virgula care nu apartine de csv
                return `"${escaped}"`
            })
            csvRows.push(values.join(',')) // pun virgula intre valorile de pe un rand
        }
        return csvRows.join('\n')
    };

    const getReport = async function () {
        const res = await fetch(urlForCsv) //fetch- metoda browserului de a lua data.  fetch returneaza o promisiune
        const json = await res.json() //cu aceasta linie pot lua si datele, nu doar headers....
        const data = json.map(row => ({ //mapez ca sa imi puna in csv doar ce vreau, nu tot
            month: row.month,
            year: row.year,
            [getColumn]: row[getColumn]
        }));
        const csvData = objectToCsv(data)
        exportFile(csvData, 'csv', getTableName, getCountyName, getYear);
    }
    getReport();
}

export function exportPDF(urlForPdf, getTableName, getCountyName, getYear, getColumn) {
    const getReport = async function () {
        const res = await fetch(urlForPdf)
        const json = await res.json()
        const data = json.map(row => ({
            month: row.month,
            year: row.year,
            [getColumn]: row[getColumn]
        }));
        var doc = new jsPDF();
        data.forEach(function (object, i) {
            doc.text(20, 10 + (i * 10),
                "Month: " + object.month + " " +
                "Year: " + object.year + ": " + [getColumn] + ": " + object[getColumn]);
        });
        doc.save(`${getTableName}_${getCountyName}_${getYear}.pdf`);
    }
    getReport();
}

export function exportXML(urlForXML, getTableName, getCountyName, getYear, getColumn) {
    const getReport = async function () {
        const res = await fetch(urlForXML)
        const json = await res.json()
        const data = json.map(row => ({
            month: row.month,
            year: row.year,
            [getColumn]: row[getColumn]
        }));
        exportFile(json2xml(json), 'xml', getTableName, getCountyName, getYear);
    }
    getReport();
}

export function exportSVG(getTableName, getCountyName, getYear, numarDiagrame) {
    let svg;
    if (numarDiagrame == 1)
        svg = document.querySelector('#diagram svg');
    else
        svg = document.querySelector('#diagram2 svg');
        //transformam svg-ul in baza 64, codificand initial fragmentul html serializat cu codificarea utf8,decodificam
        //stringul codificat si cu btoa converteam din string in baza 64
    const base64doc = btoa(unescape(encodeURIComponent(svg.outerHTML)));
    const a = document.createElement('a');
    const e = new MouseEvent('click');
    a.download = `${getTableName}_${getCountyName}_${getYear}.svg`  //dau numele fisierului care o sa fie descarcat
    a.href = 'data:image/svg+xml;base64,' + base64doc;  //dau calea de unde va fi descarcat svg-ul
    a.dispatchEvent(e);
}