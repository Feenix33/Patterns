// cmeGenDesColor03.js
// Recreations of Generative Design, Creative Coding on the Web
// Color Chapter
// Based on P_1_1_2_01
//
// original:
// mouse
//  x saturation
//  y brightness
//
// keys 1-5 number of segments


const radius = 200;
var segmentCount = 6;

// --------------------------------------------------------------------------------
function preload() {
}

function setup() {
  const canvasW = 1000; // canvas size
  const canvasH = 550; // canvas size
  console.log('run at ' + cme.timelog());
  createCanvas(canvasW, canvasH);

  noStroke();

}

// --------------------------------------------------------------------------------

function draw() {
  //colorMode(HSB, width, width, height);
  background(255);

  var step = width*0.8 / segmentCount;
  var vy1 = height * 0.1;
  var vy2 = height * 0.9;

  beginShape (QUAD_STRIP);
  for (var vx=width *0.1; vx <= width * 0.9; vx+=step) {
    vertex(vx, vy1);
    vertex(vx, vy2);
    fill(vx/(width*0.9)*255, mouseX/width*255, mouseY/height*255);
  }
  endShape();
}


// --------------------------------------------------------------------------------

function keyReleased() {
  switch (key) {
    case '1': segmentCount = 360; break;
    case '2': segmentCount =  45; break;
    case '3': segmentCount =  24; break;
    case '4': segmentCount =  12; break;
    case '5': segmentCount =   6; break;
    case '6': segmentCount =  60; break;
    case '8': segmentCount =   8; break;
    case '9': segmentCount =  90; break;


    case 'm': console.log ("mouse at ["+ mouseX + "," + mouseY + "]");break;
    case 'S': console.log("saving"); saveCanvas(cme.timestring(), 'png'); break;
    default:
      print ("key pressed value = " + key + "  keyCode = " + keyCode);
      break;
  }
}
function mousePressed() {
  console.log ("mouse pressed ["+ mouseX + "," + mouseY + "]");
}

// --------------------------------------------------------------------------------
// --------------------------------------------------------------------------------

function draw00() {
  colorMode(HSB, 360, width, height);
  background(360, 0, height);

  var angleStep = 360 / segmentCount;

  beginShape (TRIANGLE_FAN);

  vertex(width/2, height/2);

  for (var angle=0; angle <= 360; angle+=angleStep) {
    var vx = width/2 + cos(radians(angle)) * radius;
    var vy = height/2 + sin(radians(angle)) * radius;
    vertex(vx, vy);
    fill(angle, mouseX, mouseY);
  }
  endShape();
}
function draw01() {
  background(128);

  var angleStep = 360 / segmentCount;

  beginShape (TRIANGLE_FAN);

  vertex(width/2, height/2);

  for (var angle=0; angle <= 360; angle+=angleStep) {
    var vx = width/2 + cos(radians(angle)) * radius;
    var vy = height/2 + sin(radians(angle)) * radius;
    vertex(vx, vy);
    fill(angle/366*255, mouseX/width*255, mouseY/height*255);
  }
  endShape();
}
function draw02() {
  colorMode(HSB, width, width, height);
  background(360, 0, height);

  var step = width*0.8 / segmentCount;
  var vy1 = height * 0.1;
  var vy2 = height * 0.9;

  beginShape (QUAD_STRIP);
  for (var vx=width *0.1; vx <= width * 0.9; vx+=step) {
    vertex(vx, vy1);
    vertex(vx, vy2);
    fill(vx, mouseX, mouseY);
  }
  endShape();
}


