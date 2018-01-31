// Select color input

// Select size input
var height, width;

function makeGrid() {

// Your code goes here!
  height=$('#inputHeight').val();
  width=$('inputWidth').val();
  $('span').text($("#inputHeight").val());
}

// When size is submitted by the user, call makeGrid()
$('#sizePicker').submit(makeGrid);
makeGrid();

// $('h2').text(height);
