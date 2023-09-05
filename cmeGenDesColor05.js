const cmeProgram = "cmeGenDesColor05.js"
// Recreations of Generative Design, Creative Coding on the Web
// Color Chapter
// Based on P_1_2_3
// Hard to tell what this is w/o the textbook, play w/some gradients and alpha channel
//
// original:
// mouse
//  left click  randomize colors
//
// keys
//
// variation
// 01 - Trying pushing a second row


var colorBox;
var Boxes;

function gradient(x,y, w, h, c1, c2) {
  var ctx = drawingContext; // global canvas context
  var grd = ctx.createLinearGradient(x, y, x, y+h); // access html functions
  grd.addColorStop(0, c1.toString());
  grd.addColorStop(1, c2.toString());
  ctx.fillStyle = grd;
  ctx.fillRect(x, y, w, h);
}

function makeColors(){
  colorBox = [];
  for (var j=0; j < 20; j++) {
    colorBox.push(color(cme.getRandomColor()));
  }
}

const maxRows =  10;
const minRows = 2;
function makeBoxes() {
  var rowCount = int(random(minRows, maxRows));
  var rowHeight = height / rowCount / 2;
  const maxBoxWidth = 100;
  const minBoxWidth = 10;

  Boxes = [];
  var x, y;
  var w, c;
  for (var r=0; r < rowCount; r++) {
    y = r * rowHeight * 2;
    x = 0;
    do {
      w = int(random(minBoxWidth, maxBoxWidth));
      c = int(random(0, 20));
      if (random() < 0.80) {
        Boxes.push({x:x, y:y, h:rowHeight, w:w, ci:c});
        subdivideBoxes(x, y+rowHeight, rowHeight, w, 0.1, 0.4, 0.5);
      }


      x += w;
    } while (x < width);
  }
}

const wMin = 2;

function subdivideBoxes(xi, yi, hi, wi, minp, maxp, chance) {
  let x = xi;
  let y = yi;
  let h = hi;
  let xend = xi+wi;
  let w = 5;
  let c;
  
  while (x < xend) {
    w = int((random(maxp-minp) + minp) * wi);
    if (w < wMin) {w = wMin;}
    c = int(random(0, 20));
    if (random() < chance) {
      Boxes.push({x:x, y:y, h:h, w:w, ci:c});
      //subdivideBoxes(x, y+h, hi, w, minp, maxp, chance); // need recursive control
    }
    x += w;
  }
  return;
}

const maxRows00 = 20;
const minRows00 = 5;
function makeBoxes00() {
  var rowCount = int(random(minRows, maxRows));
  var rowHeight = height / rowCount;
  const maxBoxWidth = 100;
  const minBoxWidth = 10;

  Boxes = [];
  var x, y;
  var w, c;
  for (var r=0; r < rowCount; r++) {
    y = r * rowHeight;
    x = 0;
    do {
      w = int(random(minBoxWidth, maxBoxWidth));
      c = int(random(0, 20));
      if (random() < 0.5) {
        Boxes.push({x:x, y:y, h:rowHeight, w:w, ci:c});
      }
      x += w;
    } while (x < width);
  }
}

function testBoxes() {
  Boxes = [];
  Boxes.push({x:100, y:10, h:50, w:50, ci:2});
  Boxes.push({x:200, y:10, h:50, w:50, ci:3});
  Boxes.push({x:300, y:10, h:50, w:50, ci:4});
}


// --------------------------------------------------------------------------------
function preload() {
}

function setup() {
  const canvasW = 1000; // canvas size
  const canvasH = 550; // canvas size
  console.log(cmeProgram + ' @' + cme.timelog());
  createCanvas(canvasW, canvasH);

  //makeColors();
  //makeBoxes();
  //testBoxes();

  noStroke();

}

// --------------------------------------------------------------------------------

function draw() {
  //colorMode(HSB, width, width, height);
  background(0);
  noLoop();

  makeColors();
  makeBoxes();

  /***
  gradient(200, 300, 600, 100, color(0, 0, 0, 75), colorBox[0]);
  gradient(100, 75, 800, 300, color(0, 0, 0, 75), colorBox[1]);
  gradient(450, 0, 100, 200, color(0, 0, 0, 75), colorBox[2]);
  ***/

  for (var j=0; j< Boxes.length; j++) {
    gradient(Boxes[j].x, Boxes[j].y, Boxes[j].w, Boxes[j].h, color(0, 0, 0, 75), colorBox[Boxes[j].ci]);
  }
}


// --------------------------------------------------------------------------------

function keyReleased() {
  switch (key) {

    case 'r': loop(); break;

    case 'm': console.log ("mouse at ["+ mouseX + "," + mouseY + "]");break;
    case 'S': console.log("saving"); saveCanvas(cme.timestring(), 'png'); break;
    default:
      print ("key pressed value = " + key + "  keyCode = " + keyCode);
      break;
  }
}
function mousePressed() {
  //console.log ("mouse pressed ["+ mouseX + "," + mouseY + "]");
  loop();
}

