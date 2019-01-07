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
Add level of abstraction - Program is getting to big and confusing
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
//const editIndicator = document.getElementById("edit-mode");
const totalBoxArray = document.getElementsByClassName("totalBoxes");
const totalSummary = document.getElementById("total-summary");
const subFee = document.getElementById("sub-fee");
var subFeeTotal = 0;
const netSumID = document.getElementById("net-sum"); 
const settingsBtn = document.getElementById("settings-btn");
const settingsSaveBtn = document.getElementById("settings-save-btn");
var iterator = 0;
var isEditState = false;

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
/*************************/
/* Calculation and setting variables 
/*************************/
var unitCost = 2;
var months = 12;
var vs1 = document.getElementById("vs1");
var hoursSavedPT = 375;
var hoursSavedPMR = 87;
var blgName = "default";
var popUps = true;
var units = 350;
var hourly = 20;
var direct1 = 600;
var user = "user1";

var packageSavings = hoursSavedPT * hourly;
var packageSummary = packageSavings + direct1;

// Settings id's
var sett_alert = document.getElementById('setting-pop');
var sett_blg_name = document.getElementById('setting-blg-name');
var sett_units = document.getElementById('setting-units');
var sett_hourly = document.getElementById('setting-hourly');
var sett_user = document.getElementById('setting-user');

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

// Run this before any work is done
init();

/*************************
/* FUNCTIONS 
/*************************/
function init() {
	emptyBoxes();
	checkFirstCheck();
	subFeeCalc();
	$("#blg-name").html(blgName);
	$("#hours-saved").html(hoursSavedPT);
	$("#rate").html(hourly);
	$("#package-savings").html(packageSavings);
}

/*************************
/* Edit state function
/* Makes text editable and adds borders
/*************************/
function editState() {
	isEditState = true;
	$("#nav1").removeClass("bg-primary");
	$("#nav1").addClass("bg-success");
	
	for ( var i = 0; i < editableText.length; i++ ) {
		editableText[i].contentEditable = "true";
		editableText[i].classList.add("focus-blue");
	}
	console.log(editableNum.length);
	for ( var j = 0; j < editableNum.length; j++ ) {
		editableNum[j].contentEditable = "true";
		editableNum[j].classList.add("focus-blue");
	}
	// Prevents user from entering letters in hours input
	$(".editable-num").keypress(function(e) {
    	if (isNaN(String.fromCharCode(e.which))) e.preventDefault();
	});
	console.log("editState function: " + editableText[0].contentEditable);
	//editIndicator.style.display = "block";
	$("#nav1").removeClass("bg-primary");
	$("#nav1").addClass("bg-success");
	
	// Buiding name logic
}

// Loads the settings from the variables declared above
function loadSettings() {
	sett_alert.checked = popUps;
	sett_blg_name.value = blgName;
	sett_units.value = units;
	//sett_hourly.value = hourly;
}

// Save the settings 
function saveSettings() {
	popUps = sett_alert.checked;
	blgName = sett_blg_name.value;
	units = sett_units.value;
	//hourly = sett_hourly.value;
	
	// Alert user of action
	var d = new Date();
	alertFunc("Settings saved", d);
	
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
	$("#blg-name").html(blgName);
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
	console.log("saveState function: " + editableText[0].contentEditable);
	//editIndicator.style.display = "none";
	
	var d = new Date();
	alertFunc("Changes Saved!", d);
	console.log("Changes saved on: " + d);
	
	$("#nav1").removeClass("bg-success");
	$("#nav1").addClass("bg-primary");
	
	// Save variables for box1
	hoursSavedPT = document.getElementById("timeSave1").innerHTML; 
	// Redo calculations after variable changed
	boxCalculations1();
	// Fill Values for box1
	fillValues1();
	
	// Save variables for box2
	// Save variables for box2
	// Save variables for box4
	// Save variables for box5
	// Save variables for box6
	
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

// Function to pop up alerts when event occurs
// Takes the text to display and the time it happened
function alertFunc(text, d) {
	if (popUps) {
		var alertObj = '<div class="alert alert-success alert-dismissible fade show in" role="alert">' + text + ' ' + d + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">&times;</span></button></div>';
		$("body").append(alertObj);
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
							'$<span id="direct1" class="">0</span>'+
						'</span>'+
					'</li>'+
					'<li class="list-group-item">'+
						'Total monetary savings: '+
						'<span class="float-right">'+
							'$<span id="packageSummary" class="totalBoxes">500</span>'+
						'</span>'+
					'</li>'+
				'</ul>'+
			'<div class="card-body">Id: ' + id + '</div>'+
		'</div>';
	$(".box-container").append(obj);
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
					'</li>'+
					'<li class="list-group-item">'+
						'Direct cost savings: '+
					'</li>'+
					'<li class="list-group-item">'+
						'Total monetary savings: '+
						'<span class="float-right">'+
							'$<span id="repairSummary" class="totalBoxes">3000</span>'+
						'</span>'+
					'</li>'+
				'</ul>'+
			'<div class="card-body">Id: ' + id + '</div>'+
		'</div>';
	$(".box-container").append(obj);	
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
					'</li>'+
					'<li class="list-group-item">'+
						'Direct cost savings: '+
					'</li>'+
					'<li class="list-group-item">'+
						'Total monetary savings: '+
						'<span class="float-right">'+
							'$<span id="clockSummary" class="totalBoxes">3000</span>'+
						'</span>'+
					'</li>'+
				'</ul>'+
			'<div class="card-body">Id: ' + id + '</div>'+
		'</div>';
	$(".box-container").append(obj);
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
						'</li>'+
						'<li class="list-group-item">'+
							'Direct cost savings: '+
						'</li>'+
						'<li class="list-group-item">'+
							'Total monetary savings: '+
							'<span class="float-right">'+
								'$<span id="residentSummary" class="totalBoxes">3000</span>'+
							'</span>'+
						'</li>'+
					'</ul>'+
				'<div class="card-body">Id: ' + id + '</div>'+
			'</div>';
	$(".box-container").append(obj);
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
					'</li>'+
					'<li class="list-group-item">'+
						'Direct cost savings: '+
					'</li>'+
					'<li class="list-group-item">'+
						'Total monetary savings: '+
						'<span class="float-right">'+
							'$<span id="reportingSummary" class="totalBoxes">3000</span>'+
						'</span>'+
					'</li>'+
				'</ul>'+
			'<div class="card-body">Id: ' + id + '</div>'+
		'</div>';
	$(".box-container").append(obj);
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
					'</li>'+
					'<li class="list-group-item">'+
						'Direct cost savings: '+
					'</li>'+
					'<li class="list-group-item">'+
						'Total monetary savings: '+
						'<span class="float-right">'+
							'$<span id="securitySummary" class="totalBoxes">3000</span>'+
						'</span>'+
					'</li>'+
				'</ul>'+
			'<div class="card-body">Id: ' + id + '</div>'+
		'</div>';	
	$(".box-container").append(obj);
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
	$("#packageSummary").html(packageSummary);
	$("#direct1").html(direct1);
}

function fillValues2() {
	
}

function fillValues3() {
	
}

// Update the dropdown 
function updateDropdown() {
	
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
	totalSummary.innerHTML = "$" + summaryTotal;
	var netAnnual = summaryTotal - subFeeTotal;
	netSumID.innerHTML = "$" + netAnnual;
	
	var d = new Date();
	$("#date-update").html(d);
}

// Do the calculations for box 1
// Example: when edits are made and saved
function boxCalculations1() {
	packageSavings = hoursSavedPT * hourly;
    packageSummary = packageSavings + direct1;
}

// Calculates yearly subscrription fee
function subFeeCalc() {
	subFeeTotal = unitCost * units * months;
	subFee.innerHTML = "$" + subFeeTotal;
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

/*************************
/* Tutorial 
/*************************/


