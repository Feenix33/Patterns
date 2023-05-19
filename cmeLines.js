//  lines
//  simulate a hand drawn line
//  next switch from circles to lines
//  draw the lines with random lenghts to hit the overall length
//  randomness on the endpts


let crayBack = null;
let crayFore = null;
let crayStroke = null;

// --------------------------------------------------------------------------------

class cmeLine {
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


let aline;

// --------------------------------------------------------------------------------
function setup() {
  print ("running @"+hour()+":"+minute());

  crayBack = cmeRandColor();
  createCanvas(1000, 500);

  crayFore = cmeRandColor(false);
  crayStroke = cmeRandColor(true);

  //aline = new cmeLine (107.5, 125.5, 585.5, 390.5, 100, 3);
  aline = new cmeLine (100, 125, 550, 300, 100, 3);
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

  fcmeLine (100,50, 400, 250, 100);
  aline.draw();

}

function fcmeLine(x1, y1, x2, y2, num){
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

