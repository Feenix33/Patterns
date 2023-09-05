const cmeProgram = "cmeGenDesColor04.js"
// Recreations of Generative Design, Creative Coding on the Web
// Color Chapter
// Based on P_1_2_1
// lerpColor(c1, c2, amt)
//  c1 from this color
//  c2 to this color
//  amt number between 0 and 1
//
// original:
// mouse
//  x interpolation resolution
//  y row count
//  left click  randomize colors
//
// keys
//  1,2 change interpolation
//  c   save color palette


var segmentCount = 6;
var colorLeft;
var colorRight;
const maxRows = 10;
var oneShot = false;

function setColors() {
  colorLeft = [];
  colorRight = [];
  for (var j=0; j < maxRows; j++) {
    colorLeft.push(color(cme.getRandomColor()));
    colorRight.push(color(cme.getRandomColor()));
  }
}

// --------------------------------------------------------------------------------
function preload() {
}

function setup() {
  const canvasW = 1000; // canvas size
  const canvasH = 550; // canvas size
  console.log(cmeProgram + ' @' + cme.timelog());
  createCanvas(canvasW, canvasH);

  //colorLeft = color('red');
  //colorRight = color('yellow');
  setColors();

  noStroke();

}

// --------------------------------------------------------------------------------

function draw() {
  //colorMode(HSB, width, width, height);
  background(255);

  segmentCount = int(map(mouseX,0,width,5, 100));
  var stepX = width / segmentCount;

  var rowCount = int(map(mouseY,0,height,1,10));
  var stepY = height/rowCount;
  var n;

  if (oneShot) {
    oneShot = false;
    console.log('rowCount = ', rowCount, stepY);
  }
  for (var x=0; x < width; x+= stepX ) {
    n=0;
    for (var y=0; y < height; y+= stepY) {
      fill(lerpColor(colorLeft[n], colorRight[n], x/width));
      rect (x, y, x+stepX, y+stepY);
      n++;
    }
  }
}


// --------------------------------------------------------------------------------

function keyReleased() {
  switch (key) {
    case '1': segmentCount = 100; break;
    case '2': segmentCount =  50; break;
    case '3': segmentCount =  25; break;
    case '4': segmentCount =  10; break;


    case 'f': oneShot = true; break;
    case 'm': console.log ("mouse at ["+ mouseX + "," + mouseY + "]");break;
    case 'S': console.log("saving"); saveCanvas(cme.timestring(), 'png'); break;
    default:
      print ("key pressed value = " + key + "  keyCode = " + keyCode);
      break;
  }
}
function mousePressed() {
  //console.log ("mouse pressed ["+ mouseX + "," + mouseY + "]");
  setColors();
}

