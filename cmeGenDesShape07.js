const cmeProgram = "cmeGenDesShape07.js"
// Recreations of Generative Design, Creative Coding on the Web
// Shape Chapter
// Based on P.2.1.2.01
//
// change size of circles in a grid based on mouse pos
// mouse
//   pos x: offset x
//   pos y: offset y
//   left click: new layout
//
// keys
//
// variation
//


// --------------------------------------------------------------------------------
// Globals
var gBackground;
var gridSize = 30;
var drawRect = true;
var gDiamFactor = 40;

// --------------------------------------------------------------------------------
function preload() {
}

function setup() {
  const canvasW = 600; // canvas size
  const canvasH = 600; // canvas size
  console.log(cmeProgram + ' @' + cme.timelog());
  createCanvas(canvasW, canvasH);

  gBackground = color('white');
}

// --------------------------------------------------------------------------------

function draw() {
  background(gBackground);

  stroke('red');
  noFill();

  for (var y=0; y<height; y+=gridSize) {
    for (var x=0; x<width; x+=gridSize) {
      var diam = dist(mouseX, mouseY, x, y);
      diam = diam / width * gDiamFactor;
      push();
      translate(x, y, diam *5);
      if (drawRect) rect (0, 0, diam, diam);
      else circle (0, 0, diam);
      pop();
    }
  }
}


// --------------------------------------------------------------------------------

function keyReleased() {
  if (keyCode == DELETE || keyCode == BACKSPACE) background(0, 0, 255);
  switch (key) {

    case '+': gridSize += 5; break;
    case '-': if (gridSize > 10) gridSize -= 5; break;
    case '[': if (gDiamFactor > 4) gDiamFactor-=2; break;
    case ']': gDiamFactor += 2; break;

    case '1': drawRect = !drawRect; break;
    case 'b': gBackground = cme.getRandomColor(); break;

    case 'm': console.log ("mouse at ["+ mouseX + "," + mouseY + "]");break;
    case 'S': console.log("saving"); saveCanvas(cme.timestring(), 'png'); break;
    default:
      print ("key pressed value = " + key + "  keyCode = " + keyCode);
      break;
  }
}
function mousePressed() {
  console.log ("mouse pressed ["+ mouseX + "," + mouseY + "]");
  // loop();
}

