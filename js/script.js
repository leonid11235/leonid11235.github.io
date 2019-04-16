/*************************
/* Author: Leonid Uvarov
/* Company: BuildingLink
/* Project: Cost benefit Analysis for sales team
/*************************/

/***********
NOTES:

Do pop ups really need to be dynamic??
Make check array event listeners into an array
Set up calculations to be smarter
EditState inefficient 
Add level of abstraaction - Classes 
Dont allow checkbox changes or setting changes in edit mode
Disable edit button in editmode
************/

/*************************
/* VARIABLES and CONSTANTS
/*************************/
var checkArray = document.getElementsByClassName("form-check-input");	// Array of checkboxes
var boxArray = document.getElementsByClassName("box");
var checkArrayLength = checkArray.length;
const clearBtn = document.getElementById("clear-btn");
const openBtn = document.getElementById("open-all-btn");
const notesBtn = document.getElementById("notes-btn");
const printBtn = document.getElementById("print-btn");
const editableText = document.getElementsByClassName("editable-text");	// Doesnt exist yet
const editableNum = document.getElementsByClassName("editable-num");
const editBtn = document.getElementById("edit-btn");
const saveBtn = document.getElementById("save-btn");
const printViewBtn = document.getElementById("print-view-btn");
const totalBoxArray = document.getElementsByClassName("totalBoxes");
const totalSummary = document.getElementById("total-summary");
const subFee = document.getElementById("sub-fee");
var subFeeTotal = 0;
const netSumID = document.getElementById("net-sum"); 
const settingsBtn = document.getElementById("settings-btn");
const settingsSaveBtn = document.getElementById("settings-save-btn");
var iterator = 0;
var isEditState = false;
var logoSelect = document.getElementById("logoSelect");
var BLSelected = "default";

var printViewState = 0;

// Array of functions
var addBoxArray = [
	addBox1,
	addBox2,
	addBox3,
	addBox4,
	addBox5,
	addBox6
];

// Array of strings
var boxIDs = [
	"box1",
	"box2",
	"box3",
	"box4",
	"box5",
	"box6",
];

var isOpened = [
	false,
	false,
	false,
	false,
	false,
	false
];

/*************************/
/* Calculation and setting variables 
/*************************/
var unitCost = 2;
var months = 12;
var vs1 = document.getElementById("vs1");
var hoursSavedPT = 375;
var hoursSavedMR = 87;
var hoursSavedTC = 260;
var hoursSavedRC = 87.5;
var hoursSavedTCRD = 104;
var hoursSavedS = 730;
var popUps = true;
var units = 350;
var hourly = 20;
var direct1 = 600;
var direct2 = 250;
var direct3 = 0;
var direct4 = 0;
var direct5 = 2500;
var direct6 = 0; 
var user = "user1";

var packageSavings = hoursSavedPT * hourly;
var packageSummary = packageSavings + direct1;

var repairSavings = hoursSavedMR * hourly;
var repairSummary = repairSavings + direct2;

var timeSavings = hoursSavedTC * hourly;
var timeSummary = timeSavings + direct3;

var residentSavings = hoursSavedRC * hourly;
var residentSummary = residentSavings + direct4;

var reportingSavings = hoursSavedTCRD * hourly;
var reportingSummary = reportingSavings + direct5;

var securitySavings = hoursSavedS * hourly;
var securitySummary = securitySavings + direct6;

// Settings id's
var sett_alert = document.getElementById('setting-pop');
var sett_units = document.getElementById('setting-units');
var sett_hourly = document.getElementById('settings-hourly');
var sett_user = document.getElementById('settings-user');

/*************************
/* EVENTLISTENERS
/*************************/
checkArray[0].addEventListener("click", function(e) {
	if (checkArray[0].checked) {
		addBox1(boxIDs[0]);
		checkFirstCheck();
	}
	else {
		console.log("box 1 removed");
		$("#box1").remove();
		checkFirstCheck();
		calcSummary();
	}
});

checkArray[1].addEventListener("click", function(e) {
	if (checkArray[1].checked) {
		addBox2(boxIDs[1]);
		checkFirstCheck();
	}
	else {
		console.log("box2 removed");
		$("#box2").remove();
		checkFirstCheck();
		calcSummary();
	}
});

checkArray[2].addEventListener("click", function(e) {
	if (checkArray[2].checked) {
		addBox3(boxIDs[2]);
		checkFirstCheck();
	}
	else {
		console.log("box3 removed");
		$("#box3").remove();
		checkFirstCheck();
		calcSummary();
	}
});

checkArray[3].addEventListener("click", function(e) {
	if (checkArray[3].checked) {
		addBox4(boxIDs[3]);
		checkFirstCheck();
	}
	else {
		console.log("box 4 removed");
		$("#box4").remove();
		checkFirstCheck();
		calcSummary();
	}
});

checkArray[4].addEventListener("click", function(e) {
	if (checkArray[4].checked) {
		addBox5(boxIDs[4]);
		checkFirstCheck();
	}
	else {
		console.log("box 5 removed");
		$("#box5").remove();
		checkFirstCheck();
		calcSummary();
	}
});

checkArray[5].addEventListener("click", function(e) {
	if (checkArray[5].checked) {
		addBox6(boxIDs[5]);
		checkFirstCheck();
	}
	else {
		console.log("box 6 removed");
		$("#box6").remove();
		checkFirstCheck();
		calcSummary();
	}
});

editBtn.addEventListener('click', editState);
clearBtn.addEventListener('click', emptyBoxes);
openBtn.addEventListener('click', openBoxes);
printBtn.addEventListener('click', printPage);
saveBtn.addEventListener('click', saveState);
settingsBtn.addEventListener('click', loadSettings);
settingsSaveBtn.addEventListener('click', saveSettings);
printViewBtn.addEventListener('click', togglePrintView);

// Run this before any work is done
init();

/*************************
/* FUNCTIONS 
/*************************/
function init() {
	emptyBoxes();
	checkFirstCheck();
	subFeeCalc();
	$("#rate").html(hourly);
	$("#package-savings").html(packageSavings);
	$("#name-id").html("User: " + user);
	$("#blg-name").html(BLSelected);
	$("#blg-name2").html(BLSelected);
}

/*************************
/* Edit state function
/* Makes text editable and adds borders
/*************************/
function editState() {
	isEditState = true;
	$("#nav1").removeClass("bg-primary");
	$("#nav1").addClass("edit-color");
	
	for ( var i = 0; i < editableText.length; i++ ) {
		editableText[i].contentEditable = "true";
		editableText[i].classList.add("focus-blue");
	}
	console.log(editableNum.length);
	for ( var j = 0; j < editableNum.length; j++ ) {
		editableNum[j].contentEditable = "true";
		editableNum[j].classList.add("focus-blue");
	}
	// Prevents user from entering letters or pressing "enter" in hours input
	$(".editable-num").keypress(function(e) {
    	if (isNaN(String.fromCharCode(e.which)) || e.which === 13) e.preventDefault();
	});

	// Prevents user from pressing "enter" on text edits
	$(".editable-text").keypress(function(e) {
    	if (e.which === 13) e.preventDefault();
	});

	$("#nav1").removeClass("bg-primary");
	$("#nav1").addClass("edit-color");
}

// Loads the settings from the variables declared above
function loadSettings() {
	sett_alert.checked = popUps;
	sett_units.value = units;
	sett_user.value = user;
	sett_hourly.value = hourly;
}

// Save the settings 
function saveSettings() {
	popUps = sett_alert.checked;
	BLSelected = logoSelect.value;
	units = sett_units.value;
	user = sett_user.value;
	hourly = sett_hourly.value;
	
	// Alert user of action
	var d = new Date();
	alertFunc("Settings Saved", d);
	
	// Apply the saved changes
	applySavedChanges();
}

// Update info in the view calculation info
function updateCalcInfo() {
	
}

// Incase error occurs, a user can reset all settings and changes
function resetToDefault() {
	
}

// Apply saved changes to settings
function applySavedChanges() {
	$("#blg-name").html(BLSelected);
	$("#blg-name2").html(BLSelected);
	$("#name-id").html("User: " + user);
	subFeeCalc();
}

function saveState() {
	isEditState = false;
	
	for ( var i = 0; i < editableText.length; i++ ) {
		editableText[i].contentEditable = "false";
		editableText[i].classList.remove("focus-blue");
	}
	for ( var j = 0; j < editableNum.length; j++ ) {
		editableNum[j].contentEditable = "false";
		editableNum[j].classList.remove("focus-blue");
	}
	
	var d = new Date();
	alertFunc("Changes Saved!", d);
	console.log("Changes saved on: " + d);
	
	$("#nav1").removeClass("edit-color");
	$("#nav1").addClass("bg-primary");
	
	// Save cofiguration only if the box was checked
	if (checkArray[0].checked) {
		// Save variables for boxes
		hoursSavedPT = document.getElementById("timeSave1").innerHTML; 
		direct1 = document.getElementById("direct1").innerHTML; 
		// Redo calculations after variable changed
		boxCalculations1();
		// Fill Values for box
		fillValues1();
	}
	if (checkArray[1].checked) {
		hoursSavedMR = document.getElementById("timeSave2").innerHTML; 
		direct2 = document.getElementById("direct2").innerHTML; 
		boxCalculations2();
		fillValues2();
	}
	if (checkArray[2].checked) {
		hoursSavedTC = document.getElementById("timeSave3").innerHTML; 
		direct3 = document.getElementById("direct3").innerHTML; 
		boxCalculations2();
		fillValues2();
	}
	if (checkArray[3].checked) {
		hoursSavedRC = document.getElementById("timeSave4").innerHTML; 
		direct4 = document.getElementById("direct4").innerHTML; 
		boxCalculations4();
		fillValues4();
	}
	if (checkArray[4].checked) {
		hoursSavedTCRD = document.getElementById("timeSave5").innerHTML; 
		direct5 = document.getElementById("direct5").innerHTML; 
		boxCalculations5();
		fillValues5();
	}
	if (checkArray[5].checked) {
		hoursSavedS = document.getElementById("timeSave6").innerHTML; 
		direct6 = document.getElementById("direct6").innerHTML; 
		boxCalculations6();
		fillValues6();
	}
	
	calcSummary();
}

// If no checkbox is checked, 
function checkFirstCheck() {
	if($('.form-check-input:checked').length === 0) {
		$(".emptyInd").show();
	} else{
		$(".emptyInd").hide();
	}	
}

// Clear all the boxes
function emptyBoxes() {
	$('.box-container').empty();
	
	for (var i = 0; i < checkArray.length; i++)
		checkArray[i].checked = false;
	console.log("Unchecked all boxes");
	checkFirstCheck();
	calcSummary();
}

// Open all the boxes
function openBoxes() {
	// Empty boxes before adding them
	emptyBoxes()
	
	for (var i = 0; i < checkArrayLength; i++) {
		addBoxArray[i](boxIDs[i]);
	}
	
	for (var i = 0; i < checkArray.length; i++)
		checkArray[i].checked = true;
	checkFirstCheck();
}

// Function to print contents of the page
function printPage() {
	window.print();
}

// Function to set the page state to "Print view"
function togglePrintView() {
	var elementsToRemove = document.getElementsByClassName("remove-on-print-view");
	if (!printViewState) {
		document.getElementById("print-container").style.display = "block";
		elementsToRemove[0].style.display = "none";
		elementsToRemove[1].style.display = "none";
		printViewState = 1;
	} else {
		// Maybe load both at the same time??
		elementsToRemove[0].style.display = "block";
		elementsToRemove[1].style.display = "block";
		document.getElementById("print-container").style.display = "none";
		printViewState = 0;
	}
	// When hidden content appears, insert BLName into HTML spans
	displayBLName();
}

// Function to check if an array of checkboxes
// has at least one checked box
function ifOneChecked(checkboxArray) {
	var answer = false;
	for(var i = 0; i < checkboxArray.length; i++)
    {
        if(checkboxArray[i].checked)
        {
            answer = true;
            break;
        }
    }
	return answer;
}

// Function to pop up alerts when event occurs
// Takes the text to display and the time it happened
function alertFunc(text, d) {
	if (popUps) {
		var alertObj = '<div class="alert alert-success alert-dismissible fade show in" role="alert">' + text + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
		$("body").append(alertObj);
		console.log("Changes saved on: " + d);
		setTimeout(function(){
		  $(".alert").hide('slow');
		}, 3000);
	}
}

/* FUNCTIONS TO ADD CARDS */

function addBox1(id) {
	console.log("Box 1 added");
	var obj = 
		'<div class="card inline-block box" id="'+ id +'">'+
			'<div class="card-header">' +
					'<h5 class="card-title editable-text">Package Tracking</h5>'+
				'</div>'+
				'<ul class="list-group list-group-flush">'+
					'<li class="list-group-item"><span class="editable-text">'+
						'Time saving'+
						'</span>: <span class="float-right">'+
							'<span id="timeSave1" class="editable-num" >0</span><span> hours</span>'+
						'</span>'+
					'</li>'+
					'<li class="list-group-item">'+
						'Value of time saved: '+
						'<span class="float-right">'+
							'$<span id="vs1" class="valueSaved">0</span>'+
						'</span>'+
					'</li>'+
					'<li class="list-group-item">'+
						'Direct cost savings: '+
						'<span class="float-right">'+
							'$<span id="direct1" class="editable-num">0</span>'+
						'</span>'+
					'</li>'+
					'<li class="list-group-item">'+
						'Total monetary savings: '+
						'<span class="float-right">'+
							'$<span id="packageSummary" class="totalBoxes">0</span>'+
						'</span>'+
					'</li>'+
				'</ul>'+
			'<div class="card-footer"></div>'+
		'</div>';
	$(".box-container").append(obj);
	boxCalculations1();
	fillValues1();
	calcSummary();
	if (isEditState)
		editState();
}

function addBox2(id) {
	console.log("Box 2 added");
	var obj = 
		'<div class="card inline-block box" id="'+ id +'">'+
			'<div class="card-header">' +
					'<h5 class="card-title editable-text">Maintanance & Repair</h5>'+
				'</div>'+
				'<ul class="list-group list-group-flush">'+
					'<li class="list-group-item"><span class="editable-text">'+
						'Time saving'+
						'</span>: <span class="float-right">'+
							'<span id="timeSave2" class="editable-num" >0</span><span> hours</span>'+
						'</span>'+
					'</li>'+
					'<li class="list-group-item">'+
						'Value of time saved: '+
						'<span class="float-right">'+
							'$<span id="vs2" class="valueSaved">0</span>'+
						'</span>'+
					'</li>'+
					'<li class="list-group-item">'+
						'Direct cost savings: '+
						'<span class="float-right">'+
							'$<span id="direct2" class="editable-num">0</span>'+
						'</span>'+
					'</li>'+
					'<li class="list-group-item">'+
						'Total monetary savings: '+
						'<span class="float-right">'+
							'$<span id="repairSummary" class="totalBoxes">0</span>'+
						'</span>'+
					'</li>'+
				'</ul>'+
			'<div class="card-footer"></div>'+
			//'<div class="card-body">Id: ' + id + '</div>'+
		'</div>';
	$(".box-container").append(obj);
	boxCalculations2();
	fillValues2();
	calcSummary();
	if (isEditState)
		editState();
}

function addBox3(id) {
	console.log("Box 3 added");
	var obj = 
		'<div class="card inline-block box" id="'+ id +'">'+
			'<div class="card-header">' +
					'<h5 class="card-title editable-text">Employee Time Clock</h5>'+
				'</div>'+
				'<ul class="list-group list-group-flush">'+
					'<li class="list-group-item"><span class="editable-text">'+
						'Time saving'+
						'</span>: <span class="float-right">'+
							'<span id="timeSave3" class="editable-num" >0</span><span> hours</span>'+
						'</span>'+
					'</li>'+
					'<li class="list-group-item">'+
						'Value of time saved: '+
						'<span class="float-right">'+
							'$<span id="vs3" class="valueSaved">0</span>'+
						'</span>'+
					'</li>'+
					'<li class="list-group-item">'+
						'Direct cost savings: '+
						'<span class="float-right">'+
							'$<span id="direct3" class="editable-num">0</span>'+
						'</span>'+
					'</li>'+
					'<li class="list-group-item">'+
						'Total monetary savings: '+
						'<span class="float-right">'+
							'$<span id="timeSummary" class="totalBoxes">0</span>'+
						'</span>'+
					'</li>'+
				'</ul>'+
			'<div class="card-footer"></div>'+
		'</div>';
	$(".box-container").append(obj);
	boxCalculations3();
	fillValues3();
	calcSummary();
	if (isEditState)
		editState();
}

function addBox4(id) {
	console.log("Box 4 added");
	var obj = 
		'<div class="card inline-block box" id="'+ id +'">'+
				'<div class="card-header">' +
						'<h5 class="card-title editable-text">Resident Communication</h5>'+
					'</div>'+
					'<ul class="list-group list-group-flush">'+
						'<li class="list-group-item"><span class="editable-text">'+
							'Time saving'+
							'</span>: <span class="float-right">'+
								'<span id="timeSave4" class="editable-num" >0</span><span> hours</span>'+
							'</span>'+
						'</li>'+
						'<li class="list-group-item">'+
							'Value of time saved: '+
							'<span class="float-right">'+
								'$<span id="vs4" class="valueSaved">0</span>'+
							'</span>'+
						'</li>'+
						'<li class="list-group-item">'+
							'Direct cost savings: '+
							'<span class="float-right">'+
								'$<span id="direct4" class="editable-num">0</span>'+
							'</span>'+
						'</li>'+
						'<li class="list-group-item">'+
							'Total monetary savings: '+
							'<span class="float-right">'+
								'$<span id="residentSummary" class="totalBoxes">0</span>'+
							'</span>'+
						'</li>'+
					'</ul>'+
				'<div class="card-footer"></div>'+
			'</div>';
	$(".box-container").append(obj);
	boxCalculations4();
	fillValues4();
	calcSummary();
	if (isEditState)
		editState();
}

function addBox5(id) {
	console.log("Box 5 added");
	var obj = 
		'<div class="card inline-block box" id="'+ id +'">'+
			'<div class="card-header">' +
					'<h5 class="card-title editable-text">Time Clock Reporting</h5>'+
				'</div>'+
				'<ul class="list-group list-group-flush">'+
					'<li class="list-group-item"><span class="editable-text">'+
						'Time saving'+
						'</span>: <span class="float-right">'+
							'<span id="timeSave5" class="editable-num" >0</span><span> hours</span>'+
						'</span>'+
					'</li>'+
					'<li class="list-group-item">'+
						'Value of time saved: '+
						'<span class="float-right">'+
							'$<span id="vs5" class="valueSaved">0</span>'+
						'</span>'+
					'</li>'+
					'<li class="list-group-item">'+
						'Direct cost savings: '+
						'<span class="float-right">'+
								'$<span id="direct5" class="editable-num">0</span>'+
						'</span>'+
					'</li>'+
					'<li class="list-group-item">'+
						'Total monetary savings: '+
						'<span class="float-right">'+
							'$<span id="reportingSummary" class="totalBoxes">0</span>'+
						'</span>'+
					'</li>'+
				'</ul>'+
			'<div class="card-footer"></div>'+
		'</div>';
	$(".box-container").append(obj);
	boxCalculations5();
	fillValues5();
	calcSummary();
	if (isEditState)
		editState();
}

function addBox6(id) {
	console.log("Box 6 added");
	var obj = 
		'<div class="card inline-block box" id="'+ id +'">'+
			'<div class="card-header">' +
					'<h5 class="card-title editable-text">Security</h5>'+
				'</div>'+
				'<ul class="list-group list-group-flush">'+
					'<li class="list-group-item"><span class="editable-text">'+
						'Time saving'+
						'</span>: <span class="float-right">'+
							'<span id="timeSave6" class="editable-num" >0</span><span> hours</span>'+
						'</span>'+
					'</li>'+
					'<li class="list-group-item">'+
						'Value of time saved: '+
						'<span class="float-right">'+
							'$<span id="vs6" class="valueSaved">0</span>'+
						'</span>'+
					'</li>'+
					'<li class="list-group-item">'+
						'Direct cost savings: '+
						'<span class="float-right">'+
								'$<span id="direct6" class="editable-num">0</span>'+
						'</span>'+
					'</li>'+
					'<li class="list-group-item">'+
						'Total monetary savings: '+
						'<span class="float-right">'+
							'$<span id="securitySummary" class="totalBoxes">0</span>'+
						'</span>'+
					'</li>'+
				'</ul>'+
			'<div class="card-footer"></div>'+
		'</div>';	
	$(".box-container").append(obj);
	boxCalculations6();
	fillValues6();
	calcSummary();
	if (isEditState)
		editState();
}

/*************************
/* FILL VALUE FUNCTIONS
/* Runs when box added
/*************************/

// Fill values for Package tracking when box is created
function fillValues1() {
	$("#timeSave1").html(hoursSavedPT);
	$("#vs1").html(packageSavings);
	$("#direct1").html(direct1);
	$("#packageSummary").html(packageSummary);
}

function fillValues2() {
	$("#timeSave2").html(hoursSavedMR);
	$("#direct2").html(direct2);
	$("#vs2").html(repairSavings);
	$("#repairSummary").html(repairSummary);
}

function fillValues3() {
	$("#timeSave3").html(hoursSavedTC);
	$("#vs3").html(timeSavings);
	$("#direct3").html(direct3);
	$("#timeSummary").html(timeSummary);
}

function fillValues4() {
	$("#timeSave4").html(hoursSavedRC);
	$("#vs4").html(residentSavings);
	$("#direct4").html(direct4);
	$("#residentSummary").html(residentSummary);	
}

function fillValues5() {
	$("#timeSave5").html(hoursSavedTCRD);
	$("#vs5").html(reportingSavings);
	$("#direct5").html(direct5);
	$("#reportingSummary").html(reportingSummary);	
}

function fillValues6() {
	$("#timeSave6").html(hoursSavedS);
	$("#vs6").html(securitySavings);
	$("#direct6").html(direct6);
	$("#securitySummary").html(securitySummary);	
}

/*************************
/* CALCULATIONS
/*************************/

function calcSummary() {
	var summaryTotal = 0;
	for(var i = 0; i < totalBoxArray.length; i++) {
		var totalNum = Number(totalBoxArray[i].innerHTML);
		summaryTotal += totalNum;
		console.log(summaryTotal);
	}
	totalSummary.innerHTML = "$" + addCommas(summaryTotal);
	var netAnnual = summaryTotal - subFeeTotal;
	netSumID.innerHTML = "$" + addCommas(netAnnual);
	
	var d = new Date();
	$("#date-update").html(d);
}

// Do the calculations for box 1
// Example: when edits are made and saved
function boxCalculations1() {
	packageSavings = hoursSavedPT * hourly;
    packageSummary = packageSavings + parseInt(direct1);
}

function boxCalculations2() {
	repairSavings = hoursSavedMR * hourly;
	repairSummary = repairSavings + parseInt(direct2);
}

function boxCalculations3() {
	timeSavings = hoursSavedTC * hourly;
	timeSummary = timeSavings + parseInt(direct3);
}

function boxCalculations4() {
	residentSavings = hoursSavedRC * hourly;
	residentSummary = residentSavings + parseInt(direct4);
}

function boxCalculations5() {
	reportingSavings = hoursSavedTCRD * hourly;
	reportingSummary = reportingSavings + parseInt(direct5);
}

function boxCalculations6() {
	securitySavings = hoursSavedS * hourly;
	securitySummary = securitySavings + parseInt(direct6);
}

// Calculates yearly subscrription fee
function subFeeCalc() {
	subFeeTotal = unitCost * units * months;
	subFee.innerHTML = "$" + addCommas(subFeeTotal);
}

// Add commas when outputting calculations
function addCommas(number) {
	return (number).toLocaleString('en');
}

/*************************
/* BUILDINGS
/*************************/
var buildings = [{
	BLLogo: "CooperAndCooper.jpg",
	BLName: "Cooper And Cooper"
}, {
	BLLogo: "Extell.png",
	BLName: "Extell"
}]

// Call function to append building names 
appendBuildingToList(buildings);

// Function to append building names to a list
function appendBuildingToList(buildings) {
	var logoSelectItem;
	for (var i = 0; i < buildings.length; i++) {
		logoSelectItem = document.createElement("option");
		logoSelectItem.innerHTML = buildings[i].BLName;
		logoSelect.appendChild(logoSelectItem);
	}
}

// Logic for when user changes building name
logoSelect.addEventListener("change", function () {
	// Change the logo
	if (logoSelect.value == "Extell") {
		displayLogo(buildings[1].BLLogo);
	}
	if (logoSelect.value == "Cooper And Cooper") {
		displayLogo(buildings[0].BLLogo);
	}
	// Change the string name whereever necessary
});

function displayLogo(logoSRC) {
	var path = "img/cba/building-logos/";
	var logoHolder = document.getElementById("BLLogoId");
	logoHolder.src = path + logoSRC;
}

function displayBLName() {
	$("#blg-name").html(BLSelected);
	$("#blg-name2").html(BLSelected);
	$("#name-id2").html(user);
}

/*************************
/* STICKY NOTES
/*************************/
var maxNotes = 1;

var zIndex = 10;
$(notesBtn).click(function(){
    $('#notes')
        .append('\
            <div class="sticky-note-pre ui-widget-content" style="position: absolute; min-height: 300px; min-width:300px; top: 100px; left: 100px; z-index: 18;">\
                <div class="handle">&nbsp;<div class="close">&times;</div></div>\
                <div contenteditable class="contents">awesome</div>\
            </div>\
         ')
        .find('.sticky-note-pre')
            //.position where we want it
        .end()
        //.do something else to $('#notes')
    ;
    $('.sticky-note-pre').draggable({
            handle: '.handle'    
        })
        .resizable({
            resize: function(){
                var n = $(this);
                n.find('.contents').css({
                    width: n.width() - 40,
                    height: n.height() - 60
                });
            }
        })
        .bind('click hover focus mousedown', function(){
            $(this)
                .css('zIndex', zIndex++)
                .find('.ui-icon')
                    .css('zIndex', zIndex++)
                .end()
            ;
        })
        .find('.close')
            .click(function(){
                $(this).parents('.sticky-note').remove();
            })
        .end()
        .dblclick(function(){
            $(this).remove();
        })
        .addClass('sticky-note')
        .removeClass('sticky-note-pre')
    ;
});

// What to do when we save the note
$('#save').click(function(){
    var notes = [], i, note;
    $('.sticky-note').each(function(){
        notes.push($(this).find('.contents').html());
    });
    //do something with notes
    console.log("Notes: " + notes);
});

// Tooltips
$(function () {
	$('[data-toggle="tooltip"]').tooltip()
})

/*************************
/* Tutorial 
/*************************/
