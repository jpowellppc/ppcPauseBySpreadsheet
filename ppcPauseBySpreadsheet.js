/* 
*	Spreadsheet Budget Finder
*	Author: Joseph Powell
*	Purpose: Pull budget values from an accesible Google spreadsheet
*/

var spreadSheetKey = "INSERT_SPREADSHEET_KEY_HERE";

function main() {
  var MTDCost;
  var spreadsheetBudget;
  var safeBudget;
  var campaignIterator;
  var campaignsPaused = false;
  
  // Get actual & target budgets
  MTDCost = getMTDCost();
  spreadsheetBudget = getSpreadsheetBudget();
  safeBudget = spreadsheetBudget - 20;
  
  // Pause if budget exceeds target budget - $20
  
  if(MTDCost >= safeBudget) {
    campaignIterator = AdWordsApp.campaigns().get();
    
    while(campaignIterator.hasNext()) {
      var currentCampaign = campaignIterator.next();
      if(!currentCampaign.isPaused()) {
        currentCampaign.pause();
        campaignsPaused = true;
      }
    } 
  } // end if
  if(campaignsPaused == true) {
    MailApp.sendEmail('changeMe@example.com', AdWordsApp.currentAccount().getName() + ' monthly budget met, all campaigns paused.', 'See subject line.');
  }
}

// -----------------------------------------------------------
function getSpreadsheetBudget () {
  var getBudgetRange;
  var getSpreadsheetBudget;
  var sheetAccountName;
  var thisAccount;
  var value;
  var normalValue;
  var accountFoundSuccess = false; // Will be used for an else statement in case account is NOT found
  
  // Get current account's name
  var currentAccount = AdWordsApp.currentAccount();
  var adwordsAccountName = currentAccount.getName();
  
  // Access spreadsheet
  var ss = SpreadsheetApp.openById(spreadSheetKey);
  var s = ss.getSheetByName("SHEET_NAME_IN_BOTTOM_LEFT");  // Change name to sheet being read
  s.activate();
  
  // Budget in column 14 for HT KPI, 3 for normal KPI
  
  for(var i = 1; i <= s.getLastRow(); i++) {
    getBudgetRange = s.getRange(i, 1);
  	sheetAccountName = getBudgetRange.getDisplayValue();
    
    // If account is found in spreadsheet
    if(sheetAccountName.equals(adwordsAccountName)) {
      getSpreadsheetBudget = s.getRange(i, 3); // INSERT BUDGET COLUMN IN 2ND PARAMETER
      value = getSpreadsheetBudget.getDisplayValue();
      normalValue = normalizeNumber(value); // Remove '$' and ','
      accountFoundSuccess = true;
      break;
    }
  } // end for
  
  // Email if account not found in spreadsheet
  if(accountFoundSuccess == false) {
    // Email account manager
    MailApp.sendEmail('changeMe@example.com', AdWordsApp.currentAccount().getName() + ' not found in Spreadsheet.', 'See subject line.');
  }
  
  return normalValue;
} // end getSpreadsheetBudget
  
// -----------------------------------------------------------
// Function to prepare budget value for input into spreadsheet
function normalizeNumber (oldNum) {
  var newNum = "";
  
  for(var i = 0; i < oldNum.length; i++) {
    if(oldNum.charAt(i) == '$' || oldNum.charAt(i) == ',') {
      continue;
    }
    newNum += oldNum.charAt(i);
  }
  return newNum;
} // end normalizeNumber
// -------------------------------------------------------------
function getMTDCost () {
  var campaignIterator = AdWordsApp.campaigns().get();
  var MTDCost = 0;
  
  while(campaignIterator.hasNext()) {
    MTDCost += campaignIterator.next().getStatsFor("THIS_MONTH").getCost();
  }
  return MTDCost;
} // end getMTDCost