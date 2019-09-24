//JS for Attendance + Loyalty

const members = data.results[0].members

//var newData = [{
//
//        partyName: "Republican",
//        partyRep: 0,
//        votesWithParty: 0,
//   },
//    {
//        partyName: "Democrate",
//        partyRep: 0,
//        votesWithParty: 0
//   },
//    {
//        partyName: "Independent",
//        partyRep: 0,
//        votesWithParty: 0,
//   }
//];
let statistics = [{
        "Party": "Democrat",
        Number: 0,
        Voted: 0,
        Average: 0,
   },
    {
        Party: "Republican",
        Number: 0,
        Voted: 0,
        Average: 0
   },
    {
        Party: "Independent",
        Number: 0,
        Voted: 0,
        Average: 0
   },
    {
        Party: "Total",
        Number: 0,
        Voted: 0,
        Average: 0
  }
];

let leastMemberVotes = []

calcStats()

function calcStats() {
    for (var i = 0; i < members.length; i++) {
        var allParty = members[i].party
        var pctVotes = members[i].votes_with_party_pct
        missedVotes = members[i].missedVotes
        if (allParty.includes("D")) {
            statistics[0].Number++;
            statistics[0].Voted = Math.round(statistics[0].Voted + pctVotes);
            statistics[0].Average = Math.round(statistics[0].Voted / statistics[0].Number);
            leastMemberVotes.push(members[i])
        } else if (allParty.includes("R")) {
            statistics[1].Number++;
            statistics[1].Voted = Math.round(statistics[1].Voted + pctVotes);
            statistics[1].Average = Math.round(statistics[1].Voted / statistics[1].Number);
            leastMemberVotes.push(members[i])
        } else if (allParty.includes("I")) {
            statistics[2].Number++;
            statistics[2].Voted = Math.round(statistics[2].Voted + pctVotes);
            statistics[2].Average = Math.round(statistics[2].Voted / statistics[2].Number);
            leastMemberVotes.push(members[i])
        }
    }
    //calc total number of members
    statistics[3].Number = members.length;
    //votes w/party total
    statistics[3].Average = Math.round((statistics[0].Average + statistics[1].Average + statistics[2].Average) / 3)
}



//build an populate atGlanceTable
var atGlanceTableHeaders = ["Party", "No. of Reps", "Votes w/ Party"];

build_atGlanceTable("ataglance", atGlanceTableHeaders, statistics);

function build_atGlanceTable(tableId, headersArray, data) { //arguments are table ID, the array for the headers, and the data provided
    var table = document.getElementById(tableId) // id for table is ataglance
    if (table) {
        var tb = document.createElement("tbody")
        table.appendChild(tb) //variable tb is tablebody, and the tablebody is appended into the table
        var th = document.createElement("th"); // the table header had element th
        for (var i = 0; i < headersArray.length; i++)
        // variable i loops through the headersArray for anything bigger than i
        {
            var th = document.createElement("th"); // no idea why the variable is repeated here
            th.append(headersArray[i]); // headersarray loop is appended into the table headers
            tb.appendChild(th); // table headers are appended into the table body
        }
        for (let k = 0; k < 4; k++) // in the variable tr, only have 5 options
        {
            var tr = document.createElement("tr");
            // insert a table row cell into the inner html with variable name
            tr.insertCell().innerHTML = data[k].Party;
            tr.insertCell().innerHTML = Math.round(data[k].Number);
            tr.insertCell().innerHTML = Math.round(statistics[k].Average) + "%"

            tb.appendChild(tr); // tr appended into the tb
        }
    }
}

//calculate nr of missed votes and bottom 10%
var leastAttendanceArray = [];
var mostAttendanceArray = [];

var sortedMembers = [];
var reverseSorted = [];

sortMembers();

function sortMembers() {
    sortedMembers = members.sort(function (a, b) {
        return parseFloat(b.missed_votes) - parseFloat(a.missed_votes);
    });
}

//reverseSort ();
//
//function reverseSort() {
//    reverseSorted = sortedMembers.reverse();
//}

//sortMembersReverse();
//
//function sortMembersReverse() {
//    sortMembersReverse = members.sort(function (b, a){
//        return parseFloat(a.missed_votes) - parseFloat(b.missed_votes);
//    });
//}


//top 10

//find_percentileHighestTen();
//
//function find_percentileHighestTen() {
//    var tenthPercentile = Math.round(reverseSort.length * 0.10);
//    
//    var highestAttendance = reverseSorted[tenthPercentile].missed_votes;
//    
//    for (var h = 0; h < reverseSort.length; h++) {
//        if (reverseSort[h].missed_votes >= highestAttendance) {
//            mostAttendanceArray.push(reverseSort[h])
//        }
//    }
//    console.log(mostAttendanceArray)
//}

//bottom 10 percentile

find_percentileLowestTen();

function find_percentileLowestTen() {

    var tenthPercentile = Math.round(sortedMembers.length * 0.10);

    var lowestAttendance = sortedMembers[tenthPercentile].missed_votes;

    for (var p = 0; p < sortedMembers.length; p++) {
        if (sortedMembers[p].missed_votes >= lowestAttendance) {
            leastAttendanceArray.push(sortedMembers[p])
        }
        //            leastAttendanceArray.push(members[tenthPercentile].missed_votes);

    }
    console.log(leastAttendanceArray)

}

find_percentileHighest();

function find_percentileHighest() {

    var highestTenthPercentile = Math.round(sortedMembers.length * 0.90);

    var mostAttendance = sortedMembers[highestTenthPercentile].missed_votes;

    for (var h = sortedMembers.length - 1; h > 0; h--) {
        if (sortedMembers[h].missed_votes <= mostAttendance) {
            mostAttendanceArray.push(sortedMembers[h])
        }
    }
    console.log(mostAttendanceArray)
}

//table least attendance
generateTableLow();

function generateTableLow() {
    var tbl = document.getElementById("LeastAttendance")
    tbl.innerHTML = "";
    var header = document.createElement("thead");
    var hRow = document.createElement("tr");

    var hCell1 = document.createElement("td");
    var hText1 = document.createTextNode("Name");
    hCell1.appendChild(hText1);
    hRow.appendChild(hCell1);

    var hCell2 = document.createElement("td");
    var hText2 = document.createTextNode("Missed Votes");
    hCell2.appendChild(hText2);
    hRow.appendChild(hCell2);

    var hCell3 = document.createElement("td");
    var hText3 = document.createTextNode("% of Missed Votes");
    hCell3.appendChild(hText3);
    hRow.appendChild(hCell3);

    header.appendChild(hRow);
    tbl.appendChild(header);
    var tblBody = document.createElement("tbody");
    tbl.appendChild(tblBody)

    for (a = 0; a < leastAttendanceArray.length; a++) {
        var row = document.createElement("tr");
        if (leastAttendanceArray[a].middle_name == null) {
            leastAttendanceArray[a].middle_name = ""
        }

        row.insertCell().innerHTML = (leastAttendanceArray[a].first_name + " " + leastAttendanceArray[a].middle_name + leastAttendanceArray[a].last_name).link(leastAttendanceArray[a].url);
        row.insertCell().innerHTML = leastAttendanceArray[a].missed_votes;
        row.insertCell().innerHTML = leastAttendanceArray[a].missed_votes_pct + "%";

        tblBody.appendChild(row);
    }
}

//table most attendance

generateTableHigh();

function generateTableHigh() {
    var tbl = document.getElementById("MostAttendance")
    tbl.innerHTML = "";
    var header = document.createElement("thead");
    var hRow = document.createElement("tr");

    var hCell1 = document.createElement("td");
    var hText1 = document.createTextNode("Name");
    hCell1.appendChild(hText1);
    hRow.appendChild(hCell1);

    var hCell2 = document.createElement("td");
    var hText2 = document.createTextNode("Missed Votes");
    hCell2.appendChild(hText2);
    hRow.appendChild(hCell2);

    var hCell3 = document.createElement("td");
    var hText3 = document.createTextNode("% of Missed Votes");
    hCell3.appendChild(hText3);
    hRow.appendChild(hCell3);

    header.appendChild(hRow);
    tbl.appendChild(header);
    var tblBody = document.createElement("tbody");
    tbl.appendChild(tblBody);
    
    
    for (t = 0; t < mostAttendanceArray.length; t++) {
        var row = document.createElement("tr");
        if (mostAttendanceArray[t].middle_name == null) {
            mostAttendanceArray[t].middle_name = ""
        }
                row.insertCell().innerHTML = (mostAttendanceArray[t].first_name + " " + mostAttendanceArray[t].middle_name + mostAttendanceArray[t].last_name).link(mostAttendanceArray[t].url);
        row.insertCell().innerHTML = mostAttendanceArray[t].missed_votes;
        row.insertCell().innerHTML = mostAttendanceArray[t].missed_votes_pct + "%";

        tblBody.appendChild(row);
    }
}
//numbers used =  a  h  i  k  p  t

//SENATE LOYALTY






function build_loyaltyGlanceTable(tableId, headersArray, data) { //arguments are table ID, the array for the headers, and the data provided
    var table = document.getElementById(tableId) // id for table is ataglance
    if (table) {
        var tb = document.createElement("tbody")
        table.appendChild(tb) //variable tb is tablebody, and the tablebody is appended into the table
        var th = document.createElement("th"); // the table header had element th
        for (var i = 0; i < headersArray.length; i++)
        // variable i loops through the headersArray for anything bigger than i
        {
            var th = document.createElement("th"); // no idea why the variable is repeated here
            th.append(headersArray[i]); // headersarray loop is appended into the table headers
            tb.appendChild(th); // table headers are appended into the table body
        }
        for (let k = 0; k < 4; k++) // in the variable tr, only have 5 options
        {
            var tr = document.createElement("tr");
            // insert a table row cell into the inner html with variable name
            tr.insertCell().innerHTML = data[k].Party;
            tr.insertCell().innerHTML = Math.round(data[k].Number);
            tr.insertCell().innerHTML = Math.round(statistics[k].Average) + "%"

            tb.appendChild(tr); // tr appended into the tb
        }
    }
}
