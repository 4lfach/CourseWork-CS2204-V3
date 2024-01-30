//This class helps managing table
class RankOfChoice {
  constructor(college, major, rank = null) {
    this.college = college;
    this.major = major;
    this.rank = rank;
  }
}

//map is used to assign to buttons a specific class, const is used to make sure it's not changed 
const mapButtonIds = new Map([
  ["btn_cs", new RankOfChoice("College of Engineering", "BSc in Computer Science and Technology")],
  ["btn_ei", new RankOfChoice("College of Engineering", "BEng in Electronic Information")],
  ["btn_mse", new RankOfChoice("College of Engineering", "BEng in Materials Science and Engineering")],
  ["btn_mc", new RankOfChoice("College of Engineering", "BEng in Materials and Chemicals")],
  ["btn_est", new RankOfChoice("College of Engineering", "BSc in Electronic Science and Technology")],
  ["btn_chem", new RankOfChoice("College of Science", "BSc in Chemistry")],
  ["btn_bio", new RankOfChoice("College of Science", "BSc in Biology")],
  ["btn_phy", new RankOfChoice("College of Science", "BSc in Physics")],
  ["btn_cogs", new RankOfChoice("College of Interdisciplinary Studies", "BSc in Cognitive Science")],
  ["btn_be", new RankOfChoice("College of Interdisciplinary Studies", "BEng in Biomedical Engineering")],
  ["btn_bm", new RankOfChoice("College of Interdisciplinary Studies", "BEng in Biology and Medicine")]
]);

//map is used to assign to numer keys a specific rank name, const is used to amke it's not changed
const numberMap = new Map([
  [1, "1st"],
  [2, "2nd"],
  [3, "3rd"],
  [4, "4th"],
  [5, "5th"],
  [6, "6th"],
  [7, "7th"],
  [8, "8th"],
  [9, "9th"],
  [10, "10th"]
]);

//Manages tabs
function OpenContent(event, tabId) {
  var i, tabContent, tabLinks;

  tabContent = document.getElementsByClassName("tab-content");

  for (i = 0; i < tabContent.length; i++) {
    tabContent[i].style.display = "none";
  }

  tabLinks = document.getElementsByClassName("tab");
  for (i = 0; i < tabLinks.length; i++) {
    tabLinks[i].classList.remove("tab-active");
  }
  var id = event.target.id;

  var tabFocus = document.getElementById(id);
  tabFocus.classList.toggle("tab-active");

  var contentFocus = document.getElementById(tabId);
  contentFocus.style.display = "grid";
}


function RankOfChoiceButton() {
  var buttons = document.querySelectorAll('input[type="button"]');

  buttons.forEach(button => {
    button.addEventListener('click', () => {
      //Let is used because it's anonymous function to avoid accessing let outside of scope
      let textbox = button.previousElementSibling;

      let res = ConvertStringToRank(textbox.value);

      if (typeof (res) === 'string') {
        alert(res);
      } else {
        rankOfChoice = mapButtonIds.get(button.id);
        rankOfChoice.rank = res;

        AddRecordToTable(rankOfChoice);

        UpdateMajorCounter();
      }
    });
  });
}

function AddRecordToTable(rankOfChoice) {
  var table = document.querySelector("table");
  var rank = rankOfChoice.rank;

  if (!ValidateRankOfChoice(rankOfChoice)) {
    alert("You have already chosen this major");
    return;
  }

  table.deleteRow(rank);

  var row = table.insertRow(rank);
  var cellCollege = row.insertCell(0);
  var cellMajor = row.insertCell(1);
  var cellRank = row.insertCell(2);

  cellCollege.innerHTML = rankOfChoice.college;
  cellMajor.innerHTML = rankOfChoice.major;
  cellRank.innerHTML = rankOfChoice.rank;

  var rankText = numberMap.get(rank);
  alert(`You have chosen ${rankOfChoice.major} as your ${rankText} chosen major in ${rankOfChoice.college} successfully`);
}

var RanksOfChoiceList = [];
function ValidateRankOfChoice(rankOfChoice) {
  var rank = rankOfChoice.rank;

  for (let i = 0; i < RanksOfChoiceList.length; i++) {
    //check if element is undefined to avoid nullpointer exception
    if (typeof (RanksOfChoiceList[i]) !== 'undefined') {
      //check if rank is already used
      if (RanksOfChoiceList[i].rank == rank) {
        return false;
      }
      //check if major is already used
      if (RanksOfChoiceList[i].major == rankOfChoice.major) {
        alert("You have already chosen this major");
        return false;
      }
    }
  }

  RanksOfChoiceList[rank - 1] = rankOfChoice;
  return true;
}

function UpdateMajorCounter(){
  var header = document.getElementById("header-choices-num");

  var res = 0;
  //let is always used in for loops to avoid problems with scope
  for (let i = 0; i < RanksOfChoiceList.length; i++) {
    if (typeof (RanksOfChoiceList[i]) !== 'undefined') {
      res++;
    }
  }

  header.innerHTML = `Total number of majors applied: ${res}`;
}

function ConvertStringToRank(value) {
  var isnum = /^\d+$/.test(value);
  var res;
  if (isnum) {
    value = parseInt(value);

    if (value > 0 && value <= 10) {
      res = value;
    } else {
      res = "Please enter the rank of chosen major between 1 and 10";
    }
  } else {
    res = "Please enter the rank of chosen major";
  }
  return res;
}

function OnSubmitTable() {
  if (RanksOfChoiceList.length == 0) {
    DisplayErrorHandler("You have not chosen any chosen.");
  }

  //finding gaps in RanksOfChoiceList
  var gaps = [];
  for (let i = 0; i < RanksOfChoiceList.length; i++) {
    if (typeof (RanksOfChoiceList[i]) == 'undefined') {
      gaps.push(i + 1);
    }
  }

  console.log(gaps);
  if (gaps.length > 0) {
    DisplayErrorHandler("", gaps);
    return false;
  }

  DisplayErrorHandler("");
  DisplayResults();
  return false;
}

//Manages displaying error on screen
function DisplayErrorHandler(error, gaps = null) {
  var errorHandler = document.getElementById("error-handler");
  if (gaps !== null) {
    var text = "";
    gaps.forEach(gap => {
      rankText = numberMap.get(gap);
      text += rankText + " chosen major, and ";
    });
    text = text.slice(0, -6);
    error = `You have not chosen your ${text}; you can not leave any gaps between your majors`;
  }
  if (error == "") {
    errorHandler.style.display = "none";
  } else {
    errorHandler.innerHTML = error;
    errorHandler.style.color = "red";
    errorHandler.style.display = "block";
  }

  if (error == "" && gaps == null) {
    errorHandler.innerHTML = "You have successfully submitted your application at time " + getStringDateTime();
    errorHandler.style.display = "block";
    errorHandler.style.color = "green";
  }
}

function DisplayResults() {
  var header = document.getElementById("header-last-edited");
  header.innerHTML = `Last change time: ${getStringDateTime()}`;
}

function ClearTable() {
  var table = document.querySelector("table");
  var header = document.getElementById("header-choices-num");
  header.innerHTML = "Total number of majors applied: 0";
  RanksOfChoiceList = [];
  for (let i = 1; i < 11; i++) {
    table.deleteRow(i);

    let row = table.insertRow(i);
    let cellCollege = row.insertCell(0);
    let cellMajor = row.insertCell(1);
    let cellRank = row.insertCell(2);

    cellCollege.innerHTML = "";
    cellMajor.innerHTML = "";
    cellRank.innerHTML = i;
  }

  return false;
}

function getStringDateTime() {
  var currentdate = new Date();
  var datetime = currentdate.getDate() + "/"
    + (currentdate.getMonth() + 1) + "/"
    + currentdate.getFullYear() + " "
    + currentdate.getHours() + ":"
    + currentdate.getMinutes() + ":"
    + currentdate.getSeconds();
  
    return datetime;
}