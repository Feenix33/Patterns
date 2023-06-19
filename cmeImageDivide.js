//  imageDivide
//  Move each channel to the closest multiple of n


// --------------------------------------------------------------------------------
// Globals
let clrBack;
let img;
let gImageTog = true;
let gDivide = 12;


// --------------------------------------------------------------------------------

function cmeRandColor(alpha=false) {
  if (alpha) { return color(random(255),random(255),random(255),random(255)); }
  else { return color(random(255),random(255),random(255)); }
}


function processImage() {
  let xy, rj, gj, bj, dist; // temp for each channel and other calcs

  img.loadPixels();
  for (let y=0; y < img.height-1; y++) {
    for (let x=0; x < img.width-1; x++) {
      xy = (y*img.width + x) * 4; // convert to pixels
      img.pixels[xy+0] = int((img.pixels[xy+0] + (gDivide/2)) / gDivide) *gDivide;
      img.pixels[xy+1] = int((img.pixels[xy+1] + (gDivide/2))/ gDivide) *gDivide;
      img.pixels[xy+2] = int((img.pixels[xy+2] + (gDivide/2))/ gDivide) *gDivide;
    }
  }
  img.updatePixels();
}

// --------------------------------------------------------------------------------
function preload() {
  img = loadImage('assets/image.jpg');
  imgOrig = loadImage('assets/image.jpg');
}

function reset() {
  img.copy(imgOrig, 0, 0 ,img.width, img.height, 0, 0 ,img.width, img.height);
  processImage();
}

function changeDivide(amt) {
  gDivide += amt;
  print ('Divide = ' + gDivide);
}


// --------------------------------------------------------------------------------
function setup() {
  print ("imageDivide running @"+hour()+":"+minute());
  regions = [];

  clrBack = cmeRandColor();
  createCanvas(1000, 550);

  //print ("screen wh = ", width, height);
  //print ("image  wh = ", img.width, img.height);

  processImage();
}


// --------------------------------------------------------------------------------

function draw() {
  background(clrBack);

  noFill()
  stroke(0);

  let theimage;

  if (gImageTog) {theimage = img; }
  else { theimage = imgOrig; }

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
      console.log ("toggle image");
      break;
    case "r": reset(); break;
    case "+": changeDivide(2); break;
    case "-": changeDivide(-2); break;

    default:
      print ("key pressed value = " + key + "  keyCode = " + keyCode);
      break;
  }
}
