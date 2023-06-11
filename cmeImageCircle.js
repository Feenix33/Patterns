//  imageCircle
//  load an image and replace regions w/random circles using average pixel color



// --------------------------------------------------------------------------------
// Globals
let clrBack;
let img;
let regions = [];


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
function pixie (cx, cy, r) {
  // cx, cy center of circle
  // r radius from circle

  let d = pixelDensity();
  let mr=0, mg=0, mb=0, ma=255;
  let sample_size = 0;
  let xy, xyr;

  img.loadPixels();
  regions.push({x:cx, y:cy, r:r});

  // find the average value
  for (let y=cy-r; y < cy+r; y++) {
    for (let x=cx-r; x < cx+r; x++) {
      xyr = sqrt((x-cx)*(x-cx)+(y-cy)*(y-cy))
      if (xyr <= r) {
        xy= (y*img.width + x) * 4; // convert to pixels
        mr += img.pixels[xy+0];
        mg += img.pixels[xy+1];
        mb += img.pixels[xy+2];
        sample_size++;
      }
    }
  }

  // compute the average
  mr /= sample_size;
  mg /= sample_size;
  mb /= sample_size;

  // set region to average
  for (let y=cy-r; y < cy+r; y++) {
    for (let x=cx-r; x < cx+r; x++) {
      xyr = sqrt((x-cx)*(x-cx)+(y-cy)*(y-cy))
      if (xyr <= r) {
        xy= (y*img.width + x) * 4; // convert to pixels
        img.pixels[xy+0] = mr;
        img.pixels[xy+1] = mg;
        img.pixels[xy+2] = mb;
        img.pixels[xy+3] = 255;
      }
    }
  }

  /****
  // dot the center
  xy= (cy*img.width + cx) * 4; // convert to pixels
  img.pixels[xy+0] = 0;
  img.pixels[xy+1] = 255;
  img.pixels[xy+2] = 0;
  img.pixels[xy+3] = 255;
  ****/

  img.updatePixels();
}

function add_regions() {
  // create the regions
  let maxr = 10;
  let minr = 3;
  let x,y,r;

  let margin = 10;
  /****
  for (let j=0; j < 100; j++) {
    pixie (cmeRandBetween(margin, img.width-margin), cmeRandBetween(margin, img.height-margin), cmeRandBetween(3, margin-2) );
  }

  ****/
  let painted; // check if painted or not
  let reject = 0;
  let good = true;
  const reject_eject = 800;
  const regions_max = 2000;

  for (let j=0; (j < regions_max) && (reject < reject_eject); j++) {
    painted = false;
    while (!painted) {
      r = cmeRandBetween(minr, maxr);
      x = cmeRandBetween(minr, img.width-minr);
      y = cmeRandBetween(minr, img.height-minr);
      if ((x-r) > 0 && (y-r) > 0 && (x+r)<img.width && (y+r)<img.height) {
        // now check if too close to another circle
        good = true; // flip if a bad one
        for (let i=0; (i < regions.length) && good; i++) {
          let d = (x-regions[i].x)**2 + (y-regions[i].y)**2;
          if (sqrt(d) < (r+regions[i].r)) { good = false; }
        }
        if (good) {
          painted = true;
        }
        //else {reject++; }
      }
      else { 
        //print ("reject");
        reject++;
      }
    }
    pixie(x, y, r);
  }
}

// --------------------------------------------------------------------------------
function preload() {
  img = loadImage('assets/image.jpg');
}

// --------------------------------------------------------------------------------
function setup() {
  print ("running @"+hour()+":"+minute());
  regions = [];

  clrBack = cmeRandColor();
  createCanvas(1000, 550);

  print ("screen wh = ", width, height);
  print ("image  wh = ", img.width, img.height);
  //print ("ratio wh " + (width / img.width) + ", " + (height/img.height));

  add_regions();

  /****
  // print out the regions
  for (let i=0; i < regions.length; i++) {
    print ("region[" +i +"] (x,y)=" +regions[i].x +"," +regions[i].y +"   r=" +regions[i].r);
  }
  ****/
  print ("regions = ", regions.length);
}


// --------------------------------------------------------------------------------
function draw() {
  background(clrBack);

  noFill()
  stroke(0);

  let ch=2;
  switch (ch) {
    case 1:
      image(img, 0, 0);
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

