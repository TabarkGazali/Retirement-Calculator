

"use strict";

var startingAge = 0;
var retirementAge = 0;
var startingSalary = 0;
var annualSavingsPercent = 0;
var annualRaisePercent = 0;
var InterestRate = 0;


var totalResultsTable;


function initialize() {
	// alert("In initialize(): Web App Loaded!");
	totalResultsTable = document.getElementById('totalResultsTableId');


	console.log(totalResultsTable);
}

function clearInputs(form) {
	// alert("function clearInputs() is running");
	var formElements = form.elements;
	for (var i = 0; i < formElements.length; i++)
		formElements[i].value = "";
}

function loadDefaults(form) {
	// alert("function loadDefaults() is running");
	form.reset();
}

function getNumValue(id) {
	return Number(document.getElementById(id).value);
}



function runComparison(form) {
	if (!form.checkValidity()) {
		alert("See highlighted input boxes, there are input errors");
	} else {
		startingAge = getNumValue('StartingAgeId');
		retirementAge = getNumValue('retirementAgeId');
		startingSalary = getNumValue('startingSalaryId');
		annualSavingsPercent = getNumValue('annualSavingsPercentId');
		annualRaisePercent = getNumValue('annualRaisePercentId');
		InterestRate = getNumValue('InterestRateId');

		console.log("*** TABLE OUTPUT ***")
		console.log("startingAge   :", startingAge);
		console.log("retirementAge    :", retirementAge);
		console.log("startingSalary:", startingSalary);
		console.log("annualSavingsPercent       :", annualSavingsPercent);
		console.log("annualRaisePercent        :", annualRaisePercent);
		console.log("InterestRate        :", InterestRate);

		console.log("");

		//detail table variables
		var savings = 0;
		var interestEarned = 0;
		var retirement = 0;
		var tableRowNumber = 1; // start after the heading, row 0

		//summary table variables
		var totalRetirementFund = 0;
		var totalLifetimeSalary = 0;
		var totalSaved = 0;
		var totalEarnedInterest = 0;
		var yearsToInvest = retirementAge - startingAge;

		//clear results table
		clearResultsTable(totalResultsTableId);

		for (var i = startingAge; i <= retirementAge; i++) {
			var savings = startingSalary * annualSavingsPercent / 100;
			var interestEarned = interestEarned + ((savings + interestEarned) * InterestRate / 100);
			var retirement = retirement + (savings + interestEarned);

			//update summary table variables
			totalRetirementFund = Math.round(retirement);
			totalLifetimeSalary += startingSalary;
			totalSaved += savings;
			totalEarnedInterest += interestEarned;

			console.log(i, Math.round(startingSalary), Math.round(savings), Math.round(interestEarned), Math.round(retirement));

			// modify the DOM and add rows to Results table
			var row = totalResultsTableId.insertRow(tableRowNumber);
			var cell0 = row.insertCell(0);
			var cell1 = row.insertCell(1);
			var cell2 = row.insertCell(2);
			var cell3 = row.insertCell(3);
			var cell4 = row.insertCell(4);

			cell0.innerHTML = formatNumberWithCommas(i);
			cell1.innerHTML = formatNumberWithCommas(startingSalary);
			cell2.innerHTML = formatNumberWithCommas(savings);
			cell3.innerHTML = formatNumberWithCommas(interestEarned);
			cell4.innerHTML = formatNumberWithCommas(retirement);

			tableRowNumber++;

			//update starting salary for next year
			startingSalary = startingSalary + (startingSalary * annualRaisePercent / 100);
		}

		//TODO: Put this into the summary table
		console.log(yearsToInvest, Math.round(totalRetirementFund), Math.round(totalLifetimeSalary), Math.round(totalSaved), Math.round(totalEarnedInterest));

		document.getElementById('totalYearsToInvest').innerText = formatNumberWithCommas(yearsToInvest) ;
		document.getElementById('totalRetirementfund').innerText = formatNumberWithCommas(Math.round(totalRetirementFund)) ;
		document.getElementById('LifeTimeSalary').innerText = formatNumberWithCommas(Math.round(totalLifetimeSalary)) ;
		document.getElementById('totalSaved').innerText = formatNumberWithCommas(Math.round(totalSaved));
		document.getElementById('totalEarnedInterest').innerText = formatNumberWithCommas(Math.round(totalEarnedInterest)) ;

	} // end of else
} // end of runComparison()


/*  function clearResultsTable(table)
 *  given a table, remove all rows except the heading
 *  table.rows returns a list of the rows.
 *  table.rows.length returns the number of rows
 *  If a table has 9 rows, row(0) is the header, row(8) is last
 *  deleteRow(index) from the last to all but the (0)
 */
function clearResultsTable(table) {

	for (var i = table.rows.length; i > 1; i--) {
		table.deleteRow(i - 1);
	}
}