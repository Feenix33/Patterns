//  Lego Show
//  Draw a block to display the lego pallete


// --------------------------------------------------------------------------------
// Globals
let clrBack;
let img;
let gImageTog = true;
let gDivide = 12;

//ID,gLEGO name",Hex
//let palLego = [ 0xF4F4F4, 0x8A928D, 0xFFD67F, 0xB0A06F ];
let palLego = [ 
  /****/
  '#F4F4F4',  // 1, White
  '#8A928D',  // 2, Grey
  '#FFD67F',  // 3, Light Yellow
  '#B0A06F',  // 5, Brick Yellow
  '#F6A9BB',  // 9, Light Reddish Violet
  '#ABD9FF',  // 11, Pastel Blue
  '#B40000',  // 21, Bright Red
  '#D05098',  // 22, Medium Reddish Violet
  '#1E5AA8',  // 23, Bright Blue
  '#FAC80A',  // 24, Bright Yellow
  '#543324',  // 25, Earth Orange
  '#1B2A34',  // 26, Black
  '#545955',  // 27, Dark Grey
  '#00852B',  // 28, Dark Green
  '#58AB41',  // 37, Bright Green
  '#91501C',  // 38, Dark Orange
  '#7396C8',  // 102, Medium Blue
  '#671FA1',  // 104, Bright Violet
  '#F58624',  // 105, Bright Yellowish Orange
  '#D67923',  // 106, Bright Orange
  '#069D9F'   // 107, Bright Bluish Green
];
  /***/

// --------------------------------------------------------------------------------

function cmeRandColor(alpha=false) {
  if (alpha) { return color(random(255),random(255),random(255),random(255)); }
  else { return color(random(255),random(255),random(255)); }
}


function processImage() {
  let xy, rj, gj, bj, dist; // temp for each channel and other calcs

  /***
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
  ***/
}

// --------------------------------------------------------------------------------
function preload() {
  img = loadImage('assets/image.jpg');
  imgOrig = loadImage('assets/image.jpg');
}

function resetMe() {
  img.copy(imgOrig, 0, 0 ,img.width, img.height, 0, 0 ,img.width, img.height);
  processImage();
}



// --------------------------------------------------------------------------------
function setup() {
  print ("Lego Show running @"+hour()+":"+minute());
  regions = [];

  clrBack = cmeRandColor();
  createCanvas(1000, 550);

  //print ("screen wh = ", width, height);
  //print ("image  wh = ", img.width, img.height);

  processImage();
  for (var i=0; i < palLego.length; i++) {
    let c = color (palLego[i]);
    print (palLego[i] + " = " + c + " = " + red(c) + " " + green(c) + " " + blue(c));
  }

}


// --------------------------------------------------------------------------------

function draw() {
  background(clrBack);

  noFill()
  stroke(0);

  let theimage;

  let x = 0;
  let y = 0;
  let d = 100;
  for (var i=0; i < palLego.length; i++) {
    fill(palLego[i]);
    rect (x, y, d, d);
    x += d;
    if (x >= 600) { x = 0; y += d; }
  }
  /****
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
  ****/
  //noLoop();
}

function keyReleased() {
  switch (key) {
    case "i":
      gImageTog = !gImageTog;
      console.log ("toggle image");
      break;
    case "r": resetMe(); break;

    default:
      print ("key pressed value = " + key + "  keyCode = " + keyCode);
      break;
  }
}
