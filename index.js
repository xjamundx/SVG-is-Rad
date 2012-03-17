// mostly copied from @rem's examples
// http://html5demos.com/file-api#view-source

var $input = $("#input");
var $output = $("#output");
var $example = $("#example");
var $height = $("#heightPx");
var $width = $("#widthPx");
var $dropzone = $("#dropzone");
var $encode = $("#encode");
var $update = $("#update");

$("input[type=range]").change(function() {
  $(this).next(".output").val($(this).val() + "px");
  updateExample();
})

$(".output").change(function() {
  $(this).prev("input[type=range]").val(parseInt($(this).val(), 10));
  updateExample();
})

$encode.click(function() {
    var encoded = encodeInput($input.val());
    setOutput("data:image/svg+xml;base64," + encoded);
})

$update.click(updateExample);

$dropzone.bind("dragenter", function(e) {
  e.preventDefault();
  // console.log("dragenter");
  $(this).toggleClass("hover", true);
})

$dropzone.bind("dragover", function(e) {
  e.preventDefault();
  // console.log("dragover");
  $(this).toggleClass("hover", true);
})

$dropzone.bind("dragleave", function(e) {
  e.preventDefault();
  // console.log("dragleave");
  $(this).toggleClass("hover", false);
})

$dropzone.bind("drop", function(e) {
  e.preventDefault();
  // console.log("drop");
  $(this).toggleClass("hover", false);
  var evt = e.originalEvent;
  var file = evt.dataTransfer.files[0];
  var reader = new FileReader();
  reader.onload = function (event) {
    // console.log(event.target);
    $input.val(event.target.result);
    $encode.trigger("click");
  }
  reader.onerror = function(err) {
    console.warn(err)
  }
  // console.log(file);
  reader.readAsText(file);
  // reader.readAsDataURL(file);
})

$dropzone.bind("dragend", function(e) {
  e.preventDefault();
  // console.log("dragend");
  $(this).toggleClass("hover", false);
})

function updateExample() {
    var width = $width.val();
    var height = $height.val();
    $example.css({width: width, height : height});
}

function encodeInput(text) {
  var input = text.replace(/\n/g, "");
  return window.btoa(input); 
}

function setOutput(encoded) {
  var data = "url(" + encoded + ")";
  console.log(data)
  $output.val(data);
  $example.css({backgroundImage: data});
}