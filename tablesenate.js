let senatePeople = [
    {
        firstName: "Lamar",
        middleName: "",
        lastName: "Alexander",
        party: "R",
        state: "TN",
        seniority: "15",
        votePercentage: 96.15
}, {
        firstName: "Tammy",
        middleName: "",
        lastName: "Baldwin",
        party: "D",
        state: "WI",
        seniority: "5",
        votePercentage: 94.46
}, {
        firstName: "John",
        middleName: "",
        lastName: "Barrasso",
        party: "R",
        state: "WY",
        seniority: "11",
        votePercentage: 96.32
}, {
        firstName: "Michael",
        middleName: "",
        lastName: "Bennet",
        party: "D",
        state: "CO",
        seniority: "9",
        votePercentage: 90.74
}, {
        firstName: "Richard",
        middleName: "",
        lastName: "Blumenthal",
        party: "D",
        state: "CT",
        seniority: "7",
        votePercentage: 90.94
},
    {
        firstName: "Roy",
        middleName: "",
        lastName: "Blunt",
        party: "R",
        state: "MO",
        seniority: "7",
        votePercentage: 98.29,
        }
];

function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (let key of data) {
        let th = document.createElement("th");
        let text = document.createTextNode(key);
        th.appendChild(text);
        row.appendChild(th);
    }
}

function generateTable(table, data) {
    for (let element of data) {
        let row = table.insertRow();
        for (key in element) {
            let cell = row.insertCell();
            let text = document.createTextNode(element[key]);
            cell.appendChild(text);
        }
    }
}
let table = document.querySelector("table");
let data = Object.keys(senatePeople[0]);
generateTable(table, senatePeople); // generate the table first
generateTableHead(table, data); // then the head
