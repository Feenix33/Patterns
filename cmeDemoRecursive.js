// cmeDemoRecursive.js
// based on happyCoding.io Recursive Lines demo
// Prompt is
//   function f(x) { 
//     DRAW(x);
//     f(1 * x/4);
//     f(2 * x/4);
//     f(3 * x/4);
//   }
//
// To Do
// x lines draw as animation
// x color changes dark or light for each branch
// x randomness in the drawing

const canvasW = 1000; // canvas size
const canvasH = 550; // canvas size

var gLines = [];
const gMinLen = 50;

// --------------------------------------------------------------------------------
class LineDraw {
  static offsetAngle = 3.14159/6;
  static changeOffset(a) { LineDraw.offsetAngle = a; }

  constructor (x, y, heading, length, clr, sw=6) { 
    this.x = x;
    this.y = y;
    this.h = heading
    this.l = length;
    this.cl = 0; // current length;
    this.f1 = false; // child created when true
    this.f2 = false; // child created when true
    this.f3 = false; // child created when true
    this.c = clr; // color
    if (sw < 2) { this.sw = 1; } // strokewidth
    else {this.sw = sw;} // strokewidth
  }

  nextColor() {
    var ch=2;

    switch (ch) {
    case 1:
        return color(red(this.c)-8,green(this.c)-8,blue(this.c)-8);
    case 2:
        return color(red(this.c)+8,green(this.c)+8,blue(this.c)+8);
    default:
      return this.c;
    }
  }

  randomAngle() {
    const del = 0.7;
    return random(LineDraw.offsetAngle*(1-del),LineDraw.offsetAngle*(1+del));
  }

  draw(){
    // also includes update
    var xe, ye;
    if (this.cl < this.l) { this.cl += 2; }
    xe = this.x + this.cl * sin(this.h);
    ye = this.y + this.cl * cos(this.h);
    

    var l1, l2, l3;
    var del = 0.20;
    l1 = this.l * del;
    l2 = this.l * del*2;
    l3 = this.l * del*3;

    stroke(this.c);
    strokeWeight(this.sw);
    line(this.x, this.y, xe, ye);

    // this is the update part
    if (this.cl < 10) { return; } // if we don't have this bad stuff happens

    if ((this.f1 == false) && (this.cl >= l1)) {
      this.f1 = true;
      gLines.push (new LineDraw (xe, ye, this.h+this.randomAngle(), l1, this.nextColor(), this.sw-1));
      //gLines.push (new LineDraw (xe, ye, this.h+LineDraw.offsetAngle, l1, this.nextColor(), this.sw-1));
    }

    if (!this.f2 && this.cl >= l2) {
      this.f2 = true;
      gLines.push (new LineDraw (xe, ye, this.h+this.randomAngle(), l2, this.nextColor(), this.sw-1));
    }

    if (!this.f3 && this.cl >= l3) {
      this.f3 = true;
      gLines.push (new LineDraw (xe, ye, this.h+this.randomAngle(), l3, this.nextColor(), this.sw-1));
    }
  }
}


// --------------------------------------------------------------------------------
function preload() {
}

function setup() {
  print ("running @"+hour()+":"+minute());
  createCanvas(canvasW, canvasH);

  LineDraw.changeOffset(PI/6);
  var dex = int(random(cme.crayons24.length));
  gLines.push( new LineDraw (50, height-50, PI/2, 2*width/3, color(cme.crayons24[dex]), 5) );
  strokeWeight(4);
}

// --------------------------------------------------------------------------------
function draw() {
  background(128); // noFill() stroke(0);
  for (const l of gLines) {
    l.draw();
  }
}
// --------------------------------------------------------------------------------
function keyReleased() {
  switch (key) {
    default:
      print ("key pressed value = " + key + "  keyCode = " + keyCode);
      break;
  }
}
