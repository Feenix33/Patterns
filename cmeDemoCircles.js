// cmeDemoCircles.js
// based on happyCoding.io Packing circles demo
//
// To Do
// x limited pallets
// do w/other shapes

const canvasW = 1000; // canvas size
const canvasH = 550; // canvas size
const gDotPop = 40; // number of dots

let gDots = []; // circles

// --------------------------------------------------------------------------------
class Dots {
  constructor (x,y) {
    this.x = x;
    this.y = y;
    this.r = 1;
    this.grow = true;
    this.life = 20 + random(20);
    this.clr = this.getColor();
  }
  draw() {
    fill (this.clr);
    //circle(this.x, this.y, this.r*2);
    square(this.x-this.r, this.y-this.r, this.r*2);
    if (this.grow){
      this.r += 1;
    }
    this.life -= 1;
    //if (this.life <= 0) { this.grow = false; }
  }
  overlap(otherDot) {
    return dist(this.x, this.y, otherDot.x, otherDot.y) < (this.r + otherDot.r)*1.41;
    //return dist(this.x, this.y, otherDot.x, otherDot.y) < (this.r + otherDot.r + 2); // circle
  }
  getColor () { 
    //return color(random(255),random(255),random(255)); // multi
    return color(128+random(127),128+random(127),128+random(127)); // bright
    //return color(0,0,random(255)); // blue
    return color(random(255)); // grey
    let y = random(255); return color(y, y, 0); // yellow
  }
}


// --------------------------------------------------------------------------------
function preload() {
}

function setup() {
  print ("running @"+hour()+":"+minute());
  createCanvas(canvasW, canvasH);

  addDot (gDotPop);
  strokeWeight(0);
}

function addDot (amt) {
  for (var j=0; j < amt; j++) {
    let nDot = new Dots(random(width), random(height));
    if (!checkForOverlaps(nDot)) {
      gDots.push (nDot);
    }
  }
}

function addAt(x, y) {
  let nDot = new Dots(x,y);
  if (!checkForOverlaps(nDot)) {
    gDots.push (nDot);
  }
}

function checkForOverlaps(newDot) {
  for (let otherDot of gDots) {
    if (newDot.overlap(otherDot)) { return true; }
  }
  return false;
}

function stopGrowth() {
  for (let i=0; i < gDots.length - 1; i++) {
    let aDot = gDots[i];
    for (let j=i+1; j < gDots.length; j++) {
      let bDot = gDots[j];

      if (aDot.overlap(bDot)) {
        aDot.grow = false;
        bDot.grow = false;
      }
    }
  }
}

// --------------------------------------------------------------------------------
function draw() {
  background(128); // noFill() stroke(0);
  for (let dot of gDots) {
    dot.draw();
  }
  stopGrowth();
  addDot (2);
}

function reset() {
  gDots = [];
}

// --------------------------------------------------------------------------------
function keyReleased() {
  switch (key) {
    case 'l': console.log (gDots.length); break;
    case 'r': reset(); break;
    default:
      print ("key pressed value = " + key + "  keyCode = " + keyCode);
      break;
  }
}
function mousePressed() {
  //print ("mouse press at " + mouseX + " " + mouseY);
  addAt(mouseX, mouseY);
}
