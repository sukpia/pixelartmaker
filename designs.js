// Select color input
var pickedColor="#000";
// Select size input
var height, width;


function makeGrid(height, width) {
  $("#pixelCanvas tr").remove();
  for (var r = 0; r < height; r++) {
    $('table').append('<tr id=row' + r + '></tr>');
    for (var c = 0; c < width; c++) {
      $('#row'+ r).append('<td></td>');
    }
  }
}

// When size is submitted by the user, call makeGrid()
$('#sizePicker').submit(function(evt) {
  height=$('#inputHeight').val();
  width=$('#inputWidth').val();
  makeGrid(height, width);
  evt.preventDefault();
});

$('input#colorPicker').change(function(evt) {
  pickedColor=evt.target.value;
  console.log('color changed');
});

$("table").click(function(evt) {
  evt.target.bgColor = pickedColor;
  console.log("Trigger by a " + evt.target.nodeName);
});
