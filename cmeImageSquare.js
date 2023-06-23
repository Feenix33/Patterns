//  imageSquare
//  convert the whole image to tiles and replace w/avg value



// --------------------------------------------------------------------------------
// Globals
let clrBack;
let img;
let regions = [];
let drawGrid = false;


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
// pixie function that replaces part of the image with avg color
function pixie (xi, yi, s) {
  // compute the avg color
  let mr=0, mg=0, mb=0, ma=255;  // avg value
  let cnt = 0; // count
  let d = pixelDensity();
  let xy;

  img.loadPixels();

  // find the average value
  for (let y=yi; y < yi+s; y++) {
    for (let x=xi; x < xi+s; x++) {
      xy = (y*img.width + x) * 4; // convert to pixels
      mr += img.pixels[xy+0];
      mg += img.pixels[xy+1];
      mb += img.pixels[xy+2];
      cnt++;
    }
  }

  // compute the average
  mr /= cnt;
  mg /= cnt;
  mb /= cnt;

  // set region to avg
  for (let y=yi; y < yi+s; y++) {
    for (let x=xi; x < xi+s; x++) {
      xy = (y*img.width + x) * 4; // convert to pixels
      img.pixels[xy+0] = mr;
      img.pixels[xy+1] = mg;
      img.pixels[xy+2] = mb;
      img.pixels[xy+3] = 255;
    }
  }
  img.updatePixels();
}


function make_grid(ds) {
  // ds is the square size
  for (var y=0; y<img.height; y+=ds) {
    for (var x=0; x<img.width; x+=ds) {
      regions.push({x:x, y:y, s:ds});
    }
  }
}

function draw_regions() {
  fill(0);
  stroke(0);
  for (let i=0; i < regions.length; i++) {
    //pixie (regions[i].x, regions[i].y, regions[i].s);
    circle (regions[i].x, regions[i].y, 2); //regions[i].s);
  }
}

function pixelate() {
  for (let i=0; i < regions.length; i++) {
    pixie (regions[i].x, regions[i].y, regions[i].s);
  }
}

// --------------------------------------------------------------------------------
function preload() {
  img = loadImage('assets/image.jpg');
}

// --------------------------------------------------------------------------------
function setup() {
  print ("imageSquare running @"+hour()+":"+minute());
  regions = [];

  clrBack = cmeRandColor();
  createCanvas(1000, 550);

  print ("screen wh = ", width, height);
  print ("image  wh = ", img.width, img.height);

  make_grid(20);
  //pixie (0, 0, 20);
  //pixie (600, 0, 30);
  pixelate();
}


// --------------------------------------------------------------------------------
function draw() {
  background(clrBack);

  noFill()
  stroke(0);

  let ch=1;
  switch (ch) {
    case 2:
      image(img, 0, 0);
      //draw_regions();
      break;
    case 2:
      var scl = min( (width / img.width) , (height/img.height));
      scale(scl, scl);
      image(img, 0, 0);
      break;
    default:
      image(img, 0, 0, width, height);
      break;
  }
  //noLoop();
}

function keyReleased() {
  print ("key pressed value = ",key, ", ", keyCode);
  drawGrid = !drawGrid;
}
