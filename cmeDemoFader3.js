// cmeDemoFader.js
// 1 - single color
// 2 - multicolor with reset
// 3 - oscillating

const tileDim = 50; // size of the tile, they are square
const canvasW = 1000; // canvas size
const canvasH = 550; // canvas size
var boxes = [];


// --------------------------------------------------------------------------------
function initializeBoxes() {
  // create the boxes
  boxes = [];
  let x, y;
  let dd;
  y = 0;
  do {
    x = 0;
    do {
      if (random() > 0.5) {dd = 1;} else {dd = -1;}
      boxes.push ( {r:int(random(255)), g:int(random(255)), b:int(random(255)),
        d:dd} );  // d = direction of the fade
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
}

// --------------------------------------------------------------------------------
function draw() {
  var activate_reset = 0; // reset trigger
  const flip_value = 0.01; // change direction 

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
      let dd = boxes[n].d;
      boxes[n].r = constrain (boxes[n].r+dd, 0, 255);
      boxes[n].g = constrain (boxes[n].g+dd, 0, 255);
      boxes[n].b = constrain (boxes[n].b+dd, 0, 255);
      if (random() < flip_value) { boxes[n].d = boxes[n].d * (-1);}
      activate_reset = (boxes[n].r + boxes[n].g + boxes[n].b);
      if ((activate_reset == 0) || (activate_reset == (3*255))) {
        boxes[n].r = int(random(255));
        boxes[n].g = int(random(255));
        boxes[n].b = int(random(255));
      }


      n++;
    }
    while (x < canvasW);
    y += tileDim;
  }
  while (y < canvasH);
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
