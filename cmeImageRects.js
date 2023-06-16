//  imageRects
//  convert the whole image to rectangular tiles and replace w/avg value
//  rectangles are created randomly by subdividing



// --------------------------------------------------------------------------------
// Globals
let clrBack;
let img;
let regions = [];
let gDrawRegions = false;


// --------------------------------------------------------------------------------

function cmeRandColor(alpha=false) {
  if (alpha) {
    return color(Math.floor(Math.random()*255),Math.floor(Math.random()*255), Math.floor(Math.random()*255),Math.floor(Math.random()*255));
  }
  else {
    //return color(Math.floor(Math.random()*255),Math.floor(Math.random()*255), Math.floor(Math.random()*255));
    //return color(floor(random(255))+1,floor(random(255))+1,floor(random(255))+1);
    return color(random(255),random(255),random(255));
  }
}


// --------------------------------------------------------------------------------
// pixie function that replaces part of the image with avg color
function pixie (x1, y1, x2, y2) {
  // compute the avg color
  let mr=0, mg=0, mb=0, ma=255;  // avg value
  let cnt = 0; // count
  let d = pixelDensity();
  let xy;

  //console.log ("Pixie ", x1, y1, x2, y2);
  img.loadPixels();

  if ((x2<x1) || (y2<y1)) { console.log ("problem in pixie()"); }
  // find the average value
  for (let y=y1; y < y2; y++) {
    for (let x=x1; x < x2; x++) {
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
  for (let y=y1; y < y2; y++) {
    for (let x=x1; x < x2; x++) {
      xy = (y*img.width + x) * 4; // convert to pixels
      img.pixels[xy+0] = mr;
      img.pixels[xy+1] = mg;
      img.pixels[xy+2] = mb;
      img.pixels[xy+3] = 255;
    }
  }
  img.updatePixels();
}


function make_regions (n_max) {
  // n number of times to make_regions
  
  if (n_max == 0) return;

  for (let n=0; n < n_max; n++) { // how many times to subdivide the entire body
    let n_reg = regions.length;
    for (let i=0; i < n_reg; i++) { // loop through all the regions

      // check if we need to force
      let xforce = false;
      let xlen = regions[i].x2 - regions[i].x1;
      let ylen = regions[i].y2 - regions[i].y1;

      if (xlen > 2*ylen) { xforce = true; }

      if (xforce || (random() < 0.50)) {
        if (xlen > 4) {
          let xm = floor(regions[i].x1 + (xlen/2));
          regions.push({x1:regions[i].x1, x2:xm, y1:regions[i].y1, y2:regions[i].y2});
          regions[i].x1=xm;
        }
      }
      else {
        if (ylen > 4) {
          let ym = floor(regions[i].y1 + (ylen/2));
          regions.push({x1:regions[i].x1, x2:regions[i].x2, y1:regions[i].y1, y2:ym});
          regions[i].y1=ym;
        }
      }
    }
  }
}

function pixelate() {
  //console.log ("pixelate ", regions.length); 
  for (let i=0; i < regions.length; i++) {
    pixie (regions[i].x1, regions[i].y1,  regions[i].x2, regions[i].y2);
  }
}

// --------------------------------------------------------------------------------
function preload() {
  img = loadImage('assets/image.jpg');
}

// --------------------------------------------------------------------------------
function setup() {
  print ("imageRects running @"+hour()+":"+minute());
  regions = [];

  clrBack = cmeRandColor();
  createCanvas(1000, 550);

  print ("screen wh = ", width, height);
  print ("image  wh = ", img.width, img.height);

  regions.push ({x1:0, y1:0, x2:img.width, y2:img.height});
  let lvl_regs = 5;
  make_regions (lvl_regs);

  pixelate();
  // xxyy
  //pixie (200, 100, 400, 200);
  /***
  for (var i=0; i < regions.length; i++) {
    console.log ("("+regions[i].x1 + "," + regions[i].y1 + ") - (" + regions[i].x2 + "," + regions[i].y2+")");
  }
  ***/
}


// --------------------------------------------------------------------------------
function draw_regions() {
  //rectMode(CORNER);
  strokeWeight(4);
  for (let i=0; i < regions.length; i++) {
    stroke(255, 0, 0);
    let w = regions[i].x2 - regions[i].x1;
    let h = regions[i].y2 - regions[i].y1;
    rect (regions[i].x1, regions[i].y1, w, h);
    stroke(0, 0, 255);
    line (regions[i].x1,regions[i].y1, regions[i].x2,regions[i].y2);
  }
}

function draw() {
  background(clrBack);

  noFill()
  stroke(0);

  let ch=1;
  switch (ch) {
    case 1:
      image(img, 0, 0);
      if (gDrawRegions) draw_regions();
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

/****
****/
function keyReleased() {
  switch (key) {
    case "g":
      gDrawRegions = !gDrawRegions;
      break;
    default:
      print ("key pressed value = " + key + "  keyCode = " + keyCode);
      break;
  }
}
