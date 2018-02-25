
// Simple javaScript program that handles an input of two pictures
// and combindes them using a green screen algorithm.

var fgImg = null; //intialize to null to check if loaded
var bgImg = null;
var fgCanvas;
var bgCanvas;
var match = false; // boolean to ensure pictures dimensions match 

function loadForegroundFile() {
  
  fgCanvas = document.getElementById("fgCan");
  fgImg = new SimpleImage(document.getElementById("fgFile"));
  
  fgImg.drawTo(fgCanvas);
}

function loadBackgroundFile() {
  bgCanvas = document.getElementById("bgCan");
  bgImg = new SimpleImage(document.getElementById("bgFile"));
  
  bgImg.drawTo(bgCanvas);
}

function doGreenScreen() {
  //Error checks
  if (fgImg == null  || ! fgImg.complete()) {
    alert("Foreground image not loaded");
  }
  if (bgImg == null || ! bgImg.complete()) {
    alert("Background image not loaded");
  }
  
  if(fgImg.getWidth() != bgImg.getWidth() || fgImg.getHeight() != bgImg.getHeight() ) {
    alert("Error: Dimensions of pictures don't match!");
    return; //returns from function
  } 
  
  var output = new SimpleImage(fgImg.getWidth(), fgImg.getHeight());
  
  //Renders green screen
  for(var pixel of fgImg.values()) {
    var x = pixel.getX();
    var y = pixel.getY();
    
    if(pixel.getGreen() > 240) {
      var bgPixel = bgImg.getPixel(x, y); 
      output.setPixel(x, y, bgPixel);
    } else {
      output.setPixel(x, y, pixel);
    }
  }
  clearCanvas(); //Clears canvas to be redrawn
  output.drawTo(fgCanvas);
  bgImg.drawTo(document.getElementById("testCan"));
}

function clearCanvas() {
  doClear(fgCanvas);
  doClear(bgCanvas);
}

function doClear(canvas) {
  var context = canvas.getContext("2d");
  context.clearRect(0,0,canvas.width,canvas.height);
}
