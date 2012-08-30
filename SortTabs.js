function sortTabs() {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheets = ss.getSheets();

    /* Get all sheet names and sort. */
    var names = new Array(sheets.length);
    for (var key in sheets) {
	names[key] = sheets[key].getName();
    }
    names = names.sort();

    /* Move sheets */
    var sheet = null;
    for (var i = 0; i < names.length; ++i) {
	sheet = ss.getSheetByName(names[i]);
	ss.setActiveSheet(sheet);
	ss.moveActiveSheet(i + 1);
    }
}
