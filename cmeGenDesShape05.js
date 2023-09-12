const cmeProgram = "cmeGenDesShape05.js"
// Recreations of Generative Design, Creative Coding on the Web
// Shape Chapter
// Based on P.2.1.2.01
//
// draw circles on a grid then move position randomly
// mouse
//   pos x circle position
//   pos y circle size
//   left click - new layout
//
// keys
//
// variation
//


// --------------------------------------------------------------------------------
// Globals
var gSeed;
var circAlpha = 130;
var circColor;
var gridSize = 20;
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
  circColor = color(0, 0, 128, circAlpha);
}

// --------------------------------------------------------------------------------

function draw() {
  background(gBackground);
  noFill();
  strokeWeight(4);
  stroke(circColor);

  randomSeed(gSeed);
  for (var y=0; y<height; y+=gridSize) {
    for (var x=0; x<width; x+=gridSize) {
      circle(x + int(random(gridSize*(mouseX/width))), y + int(random(gridSize*(mouseX/width))), mouseY/gridSize);
    }
  }
}


// --------------------------------------------------------------------------------

function keyReleased() {
  if (keyCode == DELETE || keyCode == BACKSPACE) background(0, 0, 255);
  switch (key) {

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

