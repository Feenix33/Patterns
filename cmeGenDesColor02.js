// cmeGenDesColor02.js
// Recreations of Generative Design, Creative Coding on the Web
// Color Chapter
// Based on P_1_1_1_01 
//
// mouse
//  x,y resolution
'use strict';

var stepX, stepY;

// --------------------------------------------------------------------------------
function preload() {
}

function setup() {
  const canvasW = 1000; // canvas size
  const canvasH = 550; // canvas size
  print ("running @"+hour()+":"+minute());
  console.log(cme.timelog());
  createCanvas(canvasW, canvasH);
  //noCursor();

  colorMode(HSB, width, height, 100);
  noStroke();

  stepX = 100;
  stepY = 100;
}

// --------------------------------------------------------------------------------
function draw() {
  //background(mouseY / 2, 100, 100);
  // stepX = mouseX + 2;
  // stepY = mouseY + 2;
  textSize (32);
  fill(128);
  text('('+mouseX+', '+mouseY+')', width/2, height/2);
  fill(0);
  text('Hello', 50, 50);

  for (var gridY = 0; gridY < height; gridY += stepY) {
    for (var gridX = 0; gridX < width; gridX += stepX) {
      fill (gridX, height-gridY, 100);
      rect(gridX, gridY, stepX, stepY);
    }
  }

}
// --------------------------------------------------------------------------------
//function keyReleased() {
function keyPressed() {
  switch (key) {
    case 'm': console.log(mouseX, mouseY); break;
    case 'S': console.log("saving"); saveCanvas(cme.timestring(), 'png'); break;
    default:
      print ("key pressed value = " + key + "  keyCode = " + keyCode);
      break;
  }
}
function mousePressed() {
  console.log ("mouse pressed");
  stepX = mouseX + 2;
  stepY = mouseY + 2;
}
