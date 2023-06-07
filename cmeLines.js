//  lines
//  simulate a hand drawn line
//  crappy but demostrates it works


let crayBack = null;
let crayFore = null;
let crayStroke = null;

// --------------------------------------------------------------------------------

class cmeLine {
  // this version is segments with varying line stroke widths
  constructor(x1, y1, x2, y2, n) {
    this.x1 = x1; this.y1 = y1; // endpt
    this.x2 = x2; this.y2 = y2; // endpt
    this.n = n; // number of segements
    this.m =  (1.0*this.y2-this.y1)/(1.0*this.x2-this.x1); // slope
    this.b = y1 - this.m * x1 // intercept
    this.pts = []; // pts to draw


    let len = Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
    let delta = len / this.n; // size of each segment
    let x, y, j, wr;
    let dx, dy;

    x = x1; // start at one point and compute the next point via delta
    wr = cmeRandBetween(2, 5); // width or radius
    for (j=0; j < n; j++) {
      y = this.m * x + this.b;
      wr = wr + cmeRandBetween(-1, 1); // width or radius
      dx = cmeRandBetween(-10, 10);
      dy = cmeRandBetween(-10, 10);
      if (wr <= 0) {wr = 2;}
      this.pts.push({x:x+dx, y:y+dy, wr:wr});
      print (j, x, y, wr);
      x += delta;
    }
  }

  draw() {
    let x = this.x1;
    let y, n, w;

    for (n=0; n < this.n; n++) {
      circle (this.pts[n].x, this.pts[n].y, this.pts[n].wr);
      // old one circle (this.pts[n].x, this.pts[n].y, this.pts[n].r);
      // xxxyyy convert to line segments
    }
    for (n=0; n < this.n-1; n++) {
      strokeWeight(this.pts[n].wr*2);
      line(this.pts[n].x, this.pts[n].y, this.pts[n+1].x, this.pts[n+1].y);
    }
  }
}

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


let aline, bline;

// --------------------------------------------------------------------------------
function setup() {
  print ("running @"+hour()+":"+minute());

  crayBack = cmeRandColor();
  createCanvas(1000, 500);

  crayFore = cmeRandColor(false);
  crayStroke = cmeRandColor(false);

  aline = new cmeLine1 (107.5, 125.5, 585.5, 390.5, 100, 3);
  bline = new cmeLine (107.5, 145.5, 585.5, 420.5, 10);
}


// --------------------------------------------------------------------------------

let fire=true;

function draw() {
  //background('#f0f0f0');
  background(crayBack);

  noFill()
  stroke(crayStroke);
  fill (crayFore);
  rect (10, 15, 10, 5);

  let m = 0.5;
  let x, y;
  let b = 50;
  let r;

  fill (crayFore);
  /**
  for (x = 100; x < 400; x++) {
    y = m * x + b;
    r = Math.floor(Math.random()*10);
    circle (x, y, r);
  }
  **/

  cmeLine0 (100,50, 400, 250, 100);
  aline.draw();
  bline.draw();
}

function cmeLine0(x1, y1, x2, y2, num){
  // need to add special case handling for m = oo and 0
  // num = number of points on the line
  let m = (y2 - y1 * 1.0) / (x2 - x1 * 1.0);
  let b = y1 - m * x1
  let len = Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
  let delta = len / num;
  let x,y;
  let n;
  let r = 3;

  x = x1;
  for (n=0; n < num; n++) {
    y = m * x + b;
    circle (x, y, r);
    x += delta;
  }
  if (fire) {
    fire = false;
    //print (x1, x2, y1, y2);
    //print (m, b, len, delta);
  }
}

// --------------------------------------------------------------------------------
class cmeLine1 {
  constructor(x1, y1, x2, y2, n, r) {
    this.x1 = x1;
    this.x2 = x2;
    this.y1 = y1;
    this.y2 = y2;
    //this.m = (parseFloat(this.y2) -  parseFloat(this.y2)) / parseFloat((this.x2 - this.x1));
    this.m =  (1.0*this.y2-this.y1)/(1.0*this.x2-this.x1);
    this.b = y1 - this.m * x1
    this.n = n;
    //this.r = r;
    this.pts = [];

    //print ("cme line ", (this.y2-this.y1)/(this.x2-this.x1));
    //print ("cme line (" + x1 + "," + y1 + ") - (" + x2 + "," + y2 + ")");
    //print ("cme line m=" + this.m + "  b=" + this.b);

    let len = Math.sqrt((x1-x2)*(x1-x2)+(y1-y2)*(y1-y2));
    let delta = len / this.n;
    let x, y, j, r2;

    x = x1;
    for (j=0; j < n; j++) {
      y = this.m * x + this.b;
      r2 = cmeRandBetween(2, 5);
      this.pts.push({x:x, y:y, r:r2});
      x += delta;
    }
  }

  draw() {
    let x = this.x1;
    let y, n;

    for (n=0; n < this.n; n++) {
      circle (this.pts[n].x, this.pts[n].y, this.pts[n].r);
    }
  }

}
