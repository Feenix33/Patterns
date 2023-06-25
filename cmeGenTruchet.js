// cmeGenTruchet.js
// Generate a truchet pattern

const tileDim = 50; // size of the tile, they are square
const canvasW = 1000; // canvas size
const canvasH = 550; // canvas size
let tilesW, tilesH, tilesN;
let tiles;
let gInterval = 0;
let gType = 0; // truchet tile type
let imgTruchet;
let clrFore, clrBack;
let palFunction;

function cmeRandColor(alpha=false) {
  if (alpha) { return color(random(255),random(255),random(255),random(255)); }
  else { return color(random(255),random(255),random(255)); }
}
function cmestr(nm, val) { return (nm + "="+ val + " "); }

function cmePalEGA(ni) {
  var n = int(ni);
  var pal = ['#000000', '#0000aa', '#00aa00', '#00aaaa', '#aa0000', '#aa00aa', '#aa5500', '#aaaaaa',
    '#555555', '#5555ff', '#55ff55', '#55ffff', '#ff5555', '#ff55ff', '#ffff55', '#ffffff'];
  if (n == null) { n = int(random(0, pal.length)); }
  if ((n < 0) || (n > pal.length)) { n=0; }
  return color(pal[n]);
}

function cmePalPico(ni) {
  var n = int(ni);
  var pal = ['#000000','#1D2B53','#7E2553','#008751', '#AB5236','#5F574F','#c2c3c7','#fff1e8',
    '#ff004d','#ffa300','#ffec27','#00e436', '#29adff','#83769c','#ff77a8','#ffccaa'];
  if (n == null) { n = int(random(0, pal.length)); }
  if ((n < 0) || (n > pal.length)) { n=0; }
  return color(pal[n]);
}

function cmePalC64(ni) {
  var n = int(ni);
  var pal = ['#000000', '#626262', '#898989', '#adadad', '#ffffff', '#9f4e44', '#cb7e75', '#6d5412',
    '#a1683c', '#c9d487', '#9ae29b', '#5cab5e', '#6abfc6', '#887ecb', '#50459b', '#a057a3'];

  if (n == null) { n = int(random(0, pal.length)); }
  if ((n < 0) || (n > pal.length)) { n=0; }
  return color(pal[n]);
}

function cmePalSLSO8(ni) {
  var n = int(ni);
  var pal = ['#0d2b45', '#203c56', '#544e68', '#8d697a', '#d08159', '#ffaa5e', '#ffd4a3', '#ffecd6'];

  if (n == null) { n = int(random(0, pal.length)); }
  if ((n < 0) || (n > pal.length)) { n=0; }
  return color(pal[n]);
}

// --------------------------------------------------------------------------------
function make_tiles() {
  tiles = [];
  for (var y=0; y < tilesH; y++) {
    for (var x=0; x < tilesW; x++) {
      tiles.push ({x:x*tileDim, y:y*tileDim, r:int(random(0,4))*90}); // rotation r * 90 degrees
    }
  }
}

function make_test() {
  tiles = [];
  tilesN = 0;
  tiles.push ({x:200, y:100, r:  0}); tilesN++;
  tiles.push ({x:200+1*tileDim, y:100, r: 90}); tilesN++;
  tiles.push ({x:200+2*tileDim, y:100, r:180}); tilesN++;
  tiles.push ({x:200+3*tileDim, y:100, r:-90}); tilesN++;
}

function draw_traditional(d) {
  fill(clrBack);
  rect(0, 0, d, d);
  fill(clrFore);
  triangle(0, 0, d, d, 0, d);
}
function draw_rounded(d) {
  fill(clrBack);
  rect(0, 0, d, d);
  fill(clrFore);
  arc(0, 0, d, d, 0, 90);
}
function draw_smith(d) {
  fill(clrBack);
  rect(0, 0, d, d);
  stroke(clrFore);
  //strokeWeight(d*0.10);
  strokeWeight(int(d/10));
  noFill();
  arc(0, 0, d, d, 0, 90);
  arc(d, d, d, d, 180, 270);
}
function draw_sqcurve(d) {
  fill(clrBack);
  rect(0, 0, d, d);
  stroke(clrFore);
  //strokeWeight(d*0.10);
  strokeWeight(int(d/10));
  noFill();
  arc(0, 0, d, d, 0, 90);
  line(d/2, d, d/2, d/2);
  line(d, d/2, d/2, d/2);
}

function draw_tile(x, y, d, r) {
  // r = rotation
  // assumes rotation is in degrees
  // and mode is CENTER
  push();
  rectMode(CORNER);
  angleMode(DEGREES);

  translate(x,y)

  rectMode(CENTER);
  translate(d/2,d/2);
  rotate (r);
  translate(-d/2,-d/2);
  rectMode(CORNER);

  noStroke();

  switch(gType) {
    case 1: draw_rounded(d); break;
    case 2: draw_smith(d); break;
    case 3: draw_sqcurve(d); break;
    default: draw_traditional (d); break;
  }
  pop();
}

function spin_tiles() {
  for (var j=0; j < tiles.length; j++) {
    tiles[j].r = int(random(0, 4)) * 90;
  }
}
function spin_random_tile(ni) {
  let n = ni;
  if (n == null) { n = int(random(0, tiles.length)); }
  tiles[n].r = int(random(0, 4)) * 90;
}

// --------------------------------------------------------------------------------
function preload() {
}

function setup() {
  print ("Gen Truchet running @"+hour()+":"+minute());
  createCanvas(canvasW, canvasH);

  tilesW = int(canvasW / tileDim); // number of tiles on the canvas w
  tilesH = int(canvasH / tileDim); // number of tiles on the canvas h
  tilesN = tilesW * tilesH;
  print (cmestr('tilesW',tilesW) + cmestr('H',tilesH));
  make_tiles();
  //make_test();
  //for (var j=0; j < tilesN; j++)  { print (j + ' ' + tiles[j].x + ' ' + tiles[j].y + ' ' + tiles[j].r); }

  rectMode(CENTER);
  let ostr = "random test  ";
  //for (var j=0; j < 10; j++) { ostr += int(random(0,3)) + ' '; } print (ostr);

  //clrFore = color(255, 255,   0);
  //clrBack = color(  0,   0, 190);
  palFunction = cmePalC64;
  palFunction = cmePalSLSO8;
  clrFore = palFunction ();
  clrBack = palFunction ();
}

// --------------------------------------------------------------------------------
function draw() {
  background(128); // noFill() stroke(0);

  stroke(255,128,128);
  for (var y=0; y < tilesH; y++) {
    line(0, y*tileDim, canvasW, y*tileDim);
  }
  for (var x=0; x < tilesW; x++) {
    line(x*tileDim, 0, x*tileDim, canvasH);
  }

  /***
  ***/
  for (var j=0; j < tilesN; j++)  {
    draw_tile(tiles[j].x, tiles[j].y, tileDim, tiles[j].r);
  }

  if (gInterval > 0) {
    if ((frameCount % gInterval) == 0) {
      spin_random_tile();
    }
  }
}
// --------------------------------------------------------------------------------
function keyReleased() {
  switch (key) {
    case '1': gType = 1; break;
    case '2': gType = 2; break;
    case '3': gType = 3; break;
    case '0': gType = 0; break;
    case 'b': clrBack = palFunction (); break;
    case 'f': clrFore = palFunction (); break;
    case 'a':
      print ("auto mode cancel with 'c'");
      gInterval = 1 * 30;
      break;
    case 'c':
      print ("cancel auto mode enable with 'a'");
      gInterval = 0;
      break;
    case 'r':
    case 'R':
      spin_tiles();
      break;
    case 's':
    case 'S':
      spin_random_tile();
      break;
    default:
      print ("key pressed value = " + key + "  keyCode = " + keyCode);
      break;
  }
}
