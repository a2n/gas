var Spreadsheet = function() {
  // Private
  function nextMate (cell, row, col) {
    var nextCell = ss.getRange(row + 1, col).getValue().substr(0, 8);
    if (nextCell == cell) {
      nextMate(cell, ++row, col);
    }  
    return row;
  }
  
  // eof, private
  
  // Public
  return {
//@function nextMate(cell, row, col)
//@brief Mark the same color with the identical prefix cell.
    alterBackgroundColor : function() {
      ss = SpreadsheetApp.getActiveSheet();
      var BEGIN_ROW = 2;
      var COLUMN = 2;
      
      var row = BEGIN_ROW;  
      var oddArray = new Array(0);
      var evenArray = new Array(0);
      var oddDispatch = false;
      var cell = null;
  
      do {
        cell = ss.getRange(row, COLUMN).getValue().substr(0, 8);
        var stickyRow = row;    
        row = nextMate(cell, row, COLUMN);
        
        var rowCount = 0;
        if (row == stickyRow) {
          rowCount = 1;
        } else {
          rowCount = 2;
        }
        
        var beginMarkCol = 6;
        var colCount = ss.getLastColumn() - beginMarkCol + 1;
        var rangeNotation = ss.getRange(stickyRow, beginMarkCol, rowCount, colCount).getA1Notation();    
        oddDispatch ? oddArray.push(rangeNotation) : evenArray.push(rangeNotation);
        oddDispatch = !oddDispatch;
      } while (++row <= ss.getLastRow());
  
      _.each(evenArray, function(e) {
        ss.getRange(e).setBackgroundColor("white");
      });

      _.each(oddArray, function(e) {
        ss.getRange(e).setBackgroundColor("#f3f3f3");
    });
    } // eof, alterBackgroundColor
  }; // eof, public
};