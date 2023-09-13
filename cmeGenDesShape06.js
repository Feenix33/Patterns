const cmeProgram = "cmeGenDesShape06.js"
// Recreations of Generative Design, Creative Coding on the Web
// Shape Chapter
// Based on P.2.1.2.01
//
// draw concentric circles and mouse moves one set
// mouse
//   pos x: offset x
//   pos y: offset y
//   left click: new layout
//
// keys
//   0: default color
//   1-<>: color set
//
//
// variation
//


// --------------------------------------------------------------------------------
// Globals
var gSeed;
var circAlpha = 130;
var circColor;
var circRad;
var dotColor;
var dotRad;
var gridSize = 30;
var gBackground;

// --------------------------------------------------------------------------------
function preload() {
}

function setup() {
  const canvasW = 600; // canvas size
  const canvasH = 600; // canvas size
  console.log(cmeProgram + ' @' + cme.timelog());
  createCanvas(canvasW, canvasH);

  gSeed = random(1000000);
  gBackground = color('white');
  circColor = color(0, 0, 128);
  circRad = gridSize;
  dotColor = color(200);
  dotRad = gridSize/2;
}

// --------------------------------------------------------------------------------

function draw() {
  background(gBackground);
  // noFill();
  // strokeWeight(4);
  //
  randomSeed(gSeed);
  noStroke();

  randomSeed(gSeed);
  for (var y=0; y<height; y+=gridSize) {
    for (var x=0; x<width; x+=gridSize) {
      let xOff = random(-1,1) * (mouseX/width) * gridSize;
      let yOff = random(-1,1) * (mouseY/height) * gridSize;
      fill(circColor);
      circle(x+xOff, y+yOff, circRad);
      fill(dotColor);
      circle(x, y, dotRad);
    }
  }
}


// --------------------------------------------------------------------------------

function keyReleased() {
  if (keyCode == DELETE || keyCode == BACKSPACE) background(0, 0, 255);
  switch (key) {

    case '1':
      circColor = color(0, 0, 128);
      dotColor = color(200);
      break;
    case '2':
      circColor = color(128, 0, 0, 128);
      dotColor = color(200, 200, 0);
      break;
    case 'b': gBackground = cme.getRandomColor();

    case 'm': console.log ("mouse at ["+ mouseX + "," + mouseY + "]");break;
    case 'S': console.log("saving"); saveCanvas(cme.timestring(), 'png'); break;
    default:
      print ("key pressed value = " + key + "  keyCode = " + keyCode);
      break;
  }
}
function mousePressed() {
  // console.log ("mouse pressed ["+ mouseX + "," + mouseY + "]");
  // loop();
  gSeed = random(1000000);
}

