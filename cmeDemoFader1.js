// cmeDemoFader.js

const tileDim = 50; // size of the tile, they are square
const canvasW = 1000; // canvas size
const canvasH = 550; // canvas size
var boxes = [];

// --------------------------------------------------------------------------------
function preload() {
}

function setup() {
  print ("Demo Fader running @"+hour()+":"+minute());
  createCanvas(canvasW, canvasH);

  // create the boxes
  let x, y;
  y = 0;
  do {
    x = 0;
    do {
      boxes.push ( int(random(255)) );
      x += tileDim;
    }
    while (x < canvasW);
    y += tileDim;
  }
  while (y < canvasH);
}

// --------------------------------------------------------------------------------
function draw() {
  background(128); // noFill() stroke(0);

  // draw the boxes
  let x, y, n;
  n = 0;
  y = 0;
  do {
    x = 0;
    do {
      fill (boxes[n], 0, 0);
      rect (x, y, tileDim, tileDim);
      x += tileDim;

      // fade
      boxes[n] = constrain (boxes[n]-1, 0, 255);

      n++;
    }
    while (x < canvasW);
    y += tileDim;
  }
  while (y < canvasH);
  /****
  ****/
}
// --------------------------------------------------------------------------------
function keyReleased() {
  switch (key) {
    default:
      print ("key pressed value = " + key + "  keyCode = " + keyCode);
      break;
  }
}
