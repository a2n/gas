/*
TODOs:

1. Analys and tune performance.

find_mate: 399.0
changeBackgroundColor: 107.0
find_mate: 206.0
changeBackgroundColor: 106.0
find_mate: 290.0
changeBackgroundColor: 127.0
find_mate: 265.0
changeBackgroundColor: 151.0
find_mate: 214.0
changeBackgroundColor: 161.0
find_mate: 260.0
changeBackgroundColor: 238.0
*/
var ss = null;
var sheet = null;

function begin() {
  ss = SpreadsheetApp.getActiveSpreadsheet();
  var sheets = ss.getSheets();
  for (var key in sheets) {
    sheet = sheets[key];
    checkSheet(sheet);
  }
}

function checkSheet(sheet) {
  var col = 4;  
  var row = 2;
  while (row < sheet.getLastRow()) {
    var value = sheet.getRange(row, col).getValue().substr(0, 8);
    var obj = find_mate(value, row, col);    
    changeBackgroundColor(row, obj.row);

    // Update loop info.
    value = obj.next;
    row = obj.row;
  }
}

function find_mate(me, row, col) {  
  var next = null;
  while (next = sheet.getRange(++row, col).getValue().substr(0, 8)) {
    if (me != next) {
      break;
    }
  }

  return {
    'row': row,
    'next': next
  };
}

var color = Boolean(false);
function changeBackgroundColor(beginRow, endRow) {
  // Color whole row
  // Grey:  #f3f3f3
  // White: #ffffff
  var colorName = color ? "#ffffff" : "#c3c3c3";
  var cols = sheet.getLastColumn() - 1;
  var rows = endRow - beginRow;
  sheet.getRange(beginRow, 4, rows, cols).setBackgroundColor(colorName);  
  color = !color;  
//  Logger.log("beginRow: %s\tRows: %s\tcolor: %s", beginRow, rows, color);
}