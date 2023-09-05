// cmeGenDesColor01.js
// Recreations of Generative Design, Creative Coding on the Web
// Color Chapter
// Based on P_1_0_01 


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

  colorMode(HSB, 360, 100, 100);
  rectMode(CENTER);
  noStroke();
}

// --------------------------------------------------------------------------------
function draw() {
  background(mouseY / 2, 100, 100);

  fill ((height - mouseY)/height*360, 100, 100);
  rect ((width/2), (height/2), mouseX+1, height*((mouseX+1)/width));
}
// --------------------------------------------------------------------------------
function keyReleased() {
  switch (key) {
    case 'm': console.log(mouseX, mouseY); break;
    case 's': saveCanvas(cme.timestring(), 'png'); break;
    default:
      print ("key pressed value = " + key + "  keyCode = " + keyCode);
      break;
  }
}
