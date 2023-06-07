//  image
//  load an image and do minimal processing on it



// --------------------------------------------------------------------------------
// Globals
let clrBack;
let img;


// --------------------------------------------------------------------------------

function cmeRandColor(alpha=false) {
  if (alpha) {
    return color(Math.floor(Math.random()*255),Math.floor(Math.random()*255), Math.floor(Math.random()*255),Math.floor(Math.random()*255));
  }
  else {
    return color(Math.floor(Math.random()*255),Math.floor(Math.random()*255), Math.floor(Math.random()*255));
  }
}

function cmeRandBetween(min, max) { // returns random int in [min, max]
  return Math.floor(Math.random() * (max - min + 1) + min);
}


// --------------------------------------------------------------------------------
function preload() {
  img = loadImage('assets/image.jpg');
}

// --------------------------------------------------------------------------------
function setup() {
  print ("running @"+hour()+":"+minute());

  clrBack = cmeRandColor();
  createCanvas(1000, 550);
  print ("img " + img.width + ", " + img.height);
  img.resize(img.width*2, img.height*2);

}


// --------------------------------------------------------------------------------
function draw() {
  background(clrBack);

  noFill()
  stroke(0);
  //rect (10, 15, 10, 5);
  image(img, 10, 10);

}

