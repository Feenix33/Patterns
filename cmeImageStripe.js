//  imageStripe
//  process stipe/line of image and merge next pixel if close to current pixel


// --------------------------------------------------------------------------------
// Globals
let clrBack;
let img;
let gImageTog = true;
let gThresh = 150;


// --------------------------------------------------------------------------------

function cmeRandColor(alpha=false) {
  if (alpha) { return color(random(255),random(255),random(255),random(255)); }
  else { return color(random(255),random(255),random(255)); }
}


function processImage(thresh) {
  //let d = pixelDensity();
  let dr, dg, db; // distances of colors
  let dist;
  let xy;
  let thresh2 = thresh **2;

  img.loadPixels();
  for (let y=0; y < img.height-1; y++) {
    for (let x=0; x < img.width-1; x++) {
      xy = (y*img.width + x) * 4; // convert to pixels
      dr = (img.pixels[xy+0] - img.pixels[xy+4]) ** 2;
      dg = (img.pixels[xy+1] - img.pixels[xy+5]) ** 2;
      db = (img.pixels[xy+2] - img.pixels[xy+6]) ** 2;
      /**
      dist = sqrt(dr+dg+db);
      if (dist <= thresh) {
      **/
      dist = dr + dg + db;
      if (dist <= thresh2) {
        img.pixels[xy+4] = img.pixels[xy+0];
        img.pixels[xy+5] = img.pixels[xy+1];
        img.pixels[xy+6] = img.pixels[xy+2];
      }
    }
  }

  img.updatePixels();
}

// --------------------------------------------------------------------------------
function preload() {
  img = loadImage('assets/image.jpg');
  origimg = loadImage('assets/image.jpg');
}

// --------------------------------------------------------------------------------
function setup() {
  print ("imageStripe running @"+hour()+":"+minute());
  regions = [];

  clrBack = cmeRandColor();
  createCanvas(1000, 550);

  print ("screen wh = ", width, height);
  print ("image  wh = ", img.width, img.height);

  processImage(gThresh);
}


// --------------------------------------------------------------------------------

function draw() {
  background(clrBack);

  noFill()
  stroke(0);

  let theimage;

  if (gImageTog) {theimage = img; }
  else { theimage = origimg; }

  let ch=2;
  switch (ch) {
    case 1:
      image(theimage, 0, 0);
      break;
    case 2:
      var scl = min( (width / img.width) , (height/img.height));
      scale(scl, scl);
      image(theimage, 0, 0);
      break;
    default:
      image(theimage, 0, 0, width, height);
      break;
  }
  //noLoop();
}

function keyReleased() {
  switch (key) {
    case "i":
      gImageTog = !gImageTog;
      break;
    default:
      print ("key pressed value = " + key + "  keyCode = " + keyCode);
      break;
  }
}
