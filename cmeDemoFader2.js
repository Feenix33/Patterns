// cmeDemoFader.js
// 1 - single color
// 2 - multicolor with reset
// 3 - oscillating

const tileDim = 50; // size of the tile, they are square
const canvasW = 1000; // canvas size
const canvasH = 550; // canvas size
var boxes = [];
var timer_reset;
const timer_value = 60;


// --------------------------------------------------------------------------------
function initializeBoxes() {
  // create the boxes
  boxes = [];
  let x, y;
  y = 0;
  do {
    x = 0;
    do {
      boxes.push ( {r:int(random(255)), g:int(random(255)), b:int(random(255))} );
      x += tileDim;
    }
    while (x < canvasW);
    y += tileDim;
  }
  while (y < canvasH);
}

// --------------------------------------------------------------------------------
function preload() {
}

function setup() {
  print ("Demo Fader running @"+hour()+":"+minute());
  createCanvas(canvasW, canvasH);
  initializeBoxes();
  timer_reset = timer_value; // init the reset timer
}

// --------------------------------------------------------------------------------
function draw() {
  var activate_reset = 0; // reset trigger

  background(128); // noFill() stroke(0);

  // draw the boxes
  let x, y, n;
  n = 0;
  y = 0;
  do {
    x = 0;
    do {
      fill (boxes[n].r, boxes[n].g, boxes[n].b);
      rect (x, y, tileDim, tileDim);
      x += tileDim;

      // fade
      boxes[n].r = constrain (boxes[n].r-1, 0, 255);
      boxes[n].g = constrain (boxes[n].g-1, 0, 255);
      boxes[n].b = constrain (boxes[n].b-1, 0, 255);

      // set reset timeer
      activate_reset += (boxes[n].r + boxes[n].g + boxes[n].b);

      n++;
    }
    while (x < canvasW);
    y += tileDim;
  }
  while (y < canvasH);

  // check if we should trigger the reset timer or activate a reset
  if (activate_reset <= 0) { 
    --timer_reset;
    if (timer_reset <= 0) {
      initializeBoxes();
    }
  }
  else {
    timer_reset = timer_value;
  }
}
// --------------------------------------------------------------------------------
function keyReleased() {
  switch (key) {
    case 'r': case 'R':
      initializeBoxes();
      break;
    default:
      print ("key pressed value = " + key + "  keyCode = " + keyCode);
      break;
  }
}
