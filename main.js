const members = data.results[0].members;
console.log(data.results[0].members);

let stateList = [];
let uniqueStateList = [];


generateTable(members);
generateStateList();

fillDropDownSelector();

document.getElementById("dem").addEventListener("click", filterMembers);
document.getElementById("rep").addEventListener("click", filterMembers);
document.getElementById("ind").addEventListener("click", filterMembers);
document.getElementById("selectstate").addEventListener("change", filterMembers);

function generateTable(members) {

    var tbl = document.getElementById('table')
    tbl.innerHTML = "";
    var header = document.createElement("thead");
    var hRow = document.createElement("tr");

    var hCell1 = document.createElement("td");
    var hText1 = document.createTextNode("Name");
    hCell1.appendChild(hText1);
    hRow.appendChild(hCell1);

    var hCell2 = document.createElement("td");
    var hText2 = document.createTextNode("Party");
    hCell2.appendChild(hText2);
    hRow.appendChild(hCell2);

    var hCell3 = document.createElement("td");
    var hText3 = document.createTextNode("States");
    hCell3.appendChild(hText3);
    hRow.appendChild(hCell3);

    var hCell4 = document.createElement("td");
    var hText4 = document.createTextNode("Years in Office");
    hCell4.appendChild(hText4);
    hRow.appendChild(hCell4);

    var hCell5 = document.createElement("td");
    var hText5 = document.createTextNode("%Votes w/Party");
    hCell5.appendChild(hText5);
    hRow.appendChild(hCell5);

    header.appendChild(hRow);
    tbl.appendChild(header);
    var tblBody = document.createElement("tbody");
    tbl.appendChild(tblBody)

    for (i = 0; i < members.length; i++) {
        var row = document.createElement("tr");
        if (members[i].middle_name == null) {
            members[i].middle_name = ""
        }

        row.insertCell().innerHTML = (members[i].first_name + " " + members[i].middle_name + " " + members[i].last_name).link(members[i].url);
        row.insertCell().innerHTML = members[i].party;
        row.insertCell().innerHTML = members[i].state;
        row.insertCell().innerHTML = members[i].seniority;
        row.insertCell().innerHTML = members[i].votes_with_party_pct;

        tblBody.appendChild(row);

    }

}

function filterMembers() {

    // let selectedValues = [...document.querySelectorAll('input:checked')].map(checkbox => checkbox.value);
    // console.log(selectedValues)

    let selected = [];
    var boxes = document.getElementsByTagName("INPUT");
    let select = document.getElementById("selectstate");
    console.log(select)
    for (var i = 0; i < boxes.length; i++) {
        var box = boxes[i];
        if (box.checked) {
            selected.push(box.value)
        }
    }

    //  let filteredMembers = members.filer(member => selected.includes(member.party))


    let filtered = [];
    for (let i = 0; i < members.length; i++) {
        if (selected.includes(members[i].party) && (select.value == members[i].state || select.value == "all")) {
            filtered.push(members[i])
        }

    }
    if (filtered.length > 0) {
        generateTable(filtered)
    } else {
        //Show alert
        console.log("No memebers by this criteria")
    }
}


function fillDropDownSelector() {
    //Remove duplicates && Sort aka order it

    var select = document.getElementById("selectstate");
    for (var i = 0; i < uniqueStateList.length; i++) {
        var opt = uniqueStateList[i];
        var el = document.createElement("option");
        el.innerHTML = opt;
        el.value = opt;
        select.appendChild(el);
    }
}


function generateStateList (){
    for (let i = 0; i < members.length; i++){
        stateList.push(members[i].state)
    }
    console.log(stateList);
    uniqueStateList = [...new Set(stateList)]
    console.log(uniqueStateList.sort())
}
