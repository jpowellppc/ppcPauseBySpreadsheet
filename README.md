# ppcPauseBySpreadsheet

Change all **bold** snippets as directed

Line 7 - Change to form's key
> var spreadSheetKey = "**INSERT_SPREADSHEET_KEY_HERE**";

Line 19 - Can alter number for how much you want to be under the actual budget (since the script can only run hourly).
> safeBudget = spreadsheetBudget - **20**;

Line 35 - Change example email(s)

> MailApp.sendEmail('**changeMe@example.com**', AdWordsApp.currentAccount().getName() + ' monthly budget met, all campaigns paused.', 'See subject line.');

Line 55 - Add sheet name (the one in the bottom left, not name of the spreadsheet)

> var s = ss.getSheetByName("**SHEET_NAME_IN_BOTTOM_LEFT**");  // Change name to sheet being read

Line 66 - Add the target budget column number (3 for personal KPI, 14 for HT KPI)

> getSpreadsheetBudget = s.getRange(i, **3**); // INSERT BUDGET COLUMN IN 2ND PARAMETER

Line 77 - Change example email(s)

> MailApp.sendEmail('**changeMe@example.com**', AdWordsApp.currentAccount().getName() + ' not found in Spreadsheet.', 'See subject line.');

