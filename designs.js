// Set default color input
var pickedColor="#000";

// Declare size input
var height, width;
// declare table cell and row indexes
var colIndex = 0;
var rowIndex = 0;

function focusCell(r, c) {
  var curRow = "tr:eq(" + r + ") ";
  var curCol = "td:eq(" + c + ")";
  $(curRow + curCol).toggleClass("cellSelected");
  $(curRow + curCol).focus();
}

function unFocusCell(r, c) {
  var curRow = "tr:eq(" + r + ") ";
  var curCol = "td:eq(" + c + ")";
  $(curRow + curCol).toggleClass("cellSelected");
}

function paintCell(r, c) {
  var curRow = "tr:eq(" + r + ") ";
  var curCol = "td:eq(" + c + ")";
  $(curRow).find(curCol).attr("bgColor", pickedColor);
}

function clearCell(r, c) {
  var curRow = "tr:eq(" + r + ") ";
  var curCol = "td:eq(" + c + ")";
  $(curRow).find(curCol).attr("bgColor", "white");
}

function makeGrid(tHeight, tWidth) {
  $("#pixelCanvas tr").remove();
  $(".tableBox").width("100%");
  colIndex = 0;
  rowIndex = 0;
  var cell=0;
  console.log($(".tableBox").width());
  console.log($(".tableBox").height());
  for (var r = 0; r < tHeight; r++) {
    $('table').append('<tr id=row' + r + '></tr>');
    for (var c = 0; c < tWidth; c++) {
      $('#row'+ r).append('<td tabindex = 0 bgcolor="#ffffff" id="cell' + cell + '"></td>');
      cell++;
    }
  }

  var boxWidth = $("#pixelCanvas").css("width");
  var boxHeight = $("#pixelCanvas").css("height");
  console.log(boxWidth + ", " + boxHeight);
  $(".tableBox").css({
    'background-color': 'white',
    'width' : boxWidth,
    'height'  : boxHeight,
    'padding' : '10px',
    'margin' : '0 auto'
  });
}

// When size is submitted by the user, call makeGrid()
$('#sizePicker').submit(function(evt) {
  height=$('#inputHeight').val();
  width=$('#inputWidth').val();
  makeGrid(height, width);
  focusCell(0,0);
  evt.preventDefault();
});

// Change the color
$('input#colorPicker').change(function(evt) {
  pickedColor = evt.target.value;
  // console.log('color changed to ' + pickedColor);
});

//Table cell is clicked
$("#pixelCanvas").click(function(evt) {
  // focusCell(rowIndex, colIndex);
  evt.target.bgColor = pickedColor;
  // console.log('color changed to ' + evt.target.bgColor);
  colIndex = $(evt.target).index();
  rowIndex = $(evt.target).parent().index();
  // console.log("row index: " + $(evt.target).parent().index());
  // console.log("column index: " + $(evt.target).index());
});

// Keyboard event detected on table
$("#pixelCanvas").keydown(function(evt) {
  if (evt.which == 40 || evt.which == 83) { //arrow down or s, move down
    unFocusCell(rowIndex, colIndex);
    if (rowIndex < height-1) {
      rowIndex++;
    }
    focusCell(rowIndex,colIndex);

  } else if (evt.which == 38 || evt.which == 87) { //arrow up or w, move up
    unFocusCell(rowIndex, colIndex);
    if (rowIndex > 0) {
      rowIndex--;
    }
    focusCell(rowIndex,colIndex);

  } else if (evt.which == 37 || evt.which == 65) { //arrow left or a, move left
    unFocusCell(rowIndex, colIndex);
    if (colIndex > 0) {
      colIndex--;
    }
    focusCell(rowIndex,colIndex);

  } else if (evt.which == 39 || evt.which == 68) { //arrow right or d, move right
    unFocusCell(rowIndex, colIndex);
    if (colIndex < width-1) {
      colIndex++;
    }
    focusCell(rowIndex,colIndex);
  } else if (evt.which == 9) { // if its a tab do nothing
    evt.preventDefault();
  }

  if (evt.which == 69) { // if its a 'e' paint cell
    evt.preventDefault();
    paintCell(rowIndex, colIndex);
  }

  if (evt.which == 81) { // if its a 'q' clear cell
    evt.preventDefault();
    clearCell(rowIndex, colIndex);
  }
  console.log(rowIndex + "," + colIndex);
});
