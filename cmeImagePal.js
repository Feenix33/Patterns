// cmeImagePal[lete].js
// Read pallete from file and process image to use only the pallete

let gTable;
let gCrayons = [];
let gImageTog = true;
let img;
let imgOrig;

// --------------------------------------------------------------------------------
function processImage() {
  // loop through all the pixels and find the one that is closest to a color in the pallete
  let xy, i;
  let dmin, dclr, nmin; // dist calc and index to smallest
  let fire25 = false;
  let fire50 = false;
  let fire75 = false;

  img.loadPixels();
  for (let y=0; y < img.height; y++) {
    for (let x=0; x < img.width; x++) {
      xy = (y*img.width + x) * 4; // convert to pixels

      dmin = 1000000000;
      nmin = -1;
      for (let j=0; j < gCrayons.length; j++) {
        dclr = dist( img.pixels[xy+0], img.pixels[xy+1], img.pixels[xy+2],
          red(gCrayons[j]), green(gCrayons[j]), blue(gCrayons[j]));
        if (dclr < dmin) {
          dmin = dclr;
          nmin = j;
          //img.pixels[xy+0] = red(gCrayons[j]); 
          //img.pixels[xy+1] = green(gCrayons[j]); 
          //img.pixels[xy+2] = blue(gCrayons[j]);
        }
      }
      /****/
      img.pixels[xy+0] = red(gCrayons[nmin]); 
      img.pixels[xy+1] = green(gCrayons[nmin]); 
      img.pixels[xy+2] = blue(gCrayons[nmin]);
      /****/
    }
    if (!fire25 && ((y/img.height) > 0.25)) { fire25 = true; print ("processing 25%"); }
    if (!fire50 && ((y/img.height) > 0.50)) { fire50 = true; print ("processing 50%"); }
    if (!fire75 && ((y/img.height) > 0.75)) { fire75 = true; print ("processing 75%"); }
  }
  img.updatePixels();
}

// --------------------------------------------------------------------------------
function preload() {
  gTable = loadTable('assets/Crayons.csv', 'csv', 'header');
  img = loadImage('assets/image.jpg');
  imgOrig = loadImage('assets/image.jpg');
}

function setup() {
  print ("ImagePal running @"+hour()+":"+minute());
  createCanvas(1000, 550);
  print ("image size = (" + img.width + "," + img.height);

  // load the crayons
  for (let i=0; i < gTable.getRowCount(); i++) {
    gCrayons.push (gTable.get(i, 'Hex'));
  }
  processImage();
}

// --------------------------------------------------------------------------------
function draw() {
  background(128);

  noFill()
  stroke(0);

  let theimage;



  if (gImageTog) {theimage = img; }
  else { theimage = imgOrig; }

  let ch=2;
  switch (ch) {
    case 1:
      let x = 0;
      let y = 0;
      let d = 100;
      for (var i=0; i < gCrayons.length; i++) {
        fill(gCrayons[i]);
        rect (x, y, d, d);
        x += d;
        if (x >= 600) { x = 0; y += d; }
      }
      break;
    case 2:
      var scl = min( (width / img.width) , (height/img.height));
      scale(scl, scl);
      image(theimage, 0, 0);
      break;
    default:
      //image(theimage, 0, 0, width, height);
      break;
  }
  //noLoop();
}
// --------------------------------------------------------------------------------
function keyReleased() {
  switch (key) {
    case "i":
      gImageTog = !gImageTog;
      console.log ("toggle image");
      break;

    default:
      print ("key pressed value = " + key + "  keyCode = " + keyCode);
      break;
  }
}
