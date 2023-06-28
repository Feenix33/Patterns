// cmeImageSort.js
// Sort the pixels randomly where the "brighter" pixels are on the top of the column

let gImageOrig = false;
let imgProc;
let imgOrig;

function cmeRandColor(alpha=false) {
  if (alpha) { return color(random(255),random(255),random(255),random(255)); }
  else { return color(random(255),random(255),random(255)); }
}

// --------------------------------------------------------------------------------
function processImage(ntimes=1)
{
  for (let n=0; n<ntimes; n++) {
  let x = random(imgProc.width);
  let y = random(imgProc.height-1);

  // check two cells and move the brighter to the top higher row
  let pixel1 = imgProc.get(x,y);
  let pixel2 = imgProc.get(x,y+1);
  let valpixel1 = red(pixel1) + green(pixel1); + blue(pixel1);
  let valpixel2 = red(pixel2) + green(pixel2); + blue(pixel2);
  if (valpixel2 > valpixel1) {
    imgProc.set(x, y, pixel2);
    imgProc.set(x, y+1, pixel1);
    imgProc.updatePixels();
  }
  }
}

// --------------------------------------------------------------------------------
function preload() {
  imgProc = loadImage('assets/image.jpg');
  imgOrig = loadImage('assets/image.jpg');
}

function setup() {
  print ("ImageSort running @"+hour()+":"+minute());
  createCanvas(1000, 550);
  print ("image size = (" + imgOrig.width + "," + imgOrig.height +')');
  //imgProc.resize(imgOrig.width*0.5, imgOrig.height*0.5);
  imgProc.resize(200, 200);
  print ("image size = (" + imgProc.width + "," + imgProc.height +')');
}

// --------------------------------------------------------------------------------
function draw() {
  background(128); // noFill() stroke(0);

  processImage(50);

  let theImage;

  if (gImageOrig) {theImage = imgOrig; }
  else { theImage = imgProc; }

  let ch=2;
  switch (ch) {
    case 1:
      image(theImage, 0, 0);
      break;
    case 2:
      //var scl = min( (width / imgProc.width) , (height/imgProc.height));
      var scl = min( (width / theImage.width) , (height/theImage.height));
      scale(scl, scl);
      image(theImage, 0, 0);
      break;
    default:
      //image(theImage, 0, 0, width, height);
      break;
  }
  //noLoop();
}
// --------------------------------------------------------------------------------
function keyReleased() {
  switch (key) {
    case "i":
      gImageOrig = !gImageOrig;
      let outStr = "Toggle image to ";
      if (gImageOrig) { outStr += 'original'; }
      else { outStr += 'processed'; }
      console.log (outStr);
      break;

    default:
      print ("key pressed value = " + key + "  keyCode = " + keyCode);
      break;
  }
}
