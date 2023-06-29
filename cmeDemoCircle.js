// cmeDemoCircle.js
// Demo of classes

const pgmName = "Demo Circle";
const canvasW = 1000; // canvas size
const canvasH = 550; // canvas size

const numCircles = 500;
let circles = [];

// --------------------------------------------------------------------------------
class Circle {
  constructor (x, y, r, xSpeed, ySpeed) {
    this.x = x;
    this.y = y;
    this.r = r;
    this.xSpeed = xSpeed;
    this.ySpeed = ySpeed;
    while ((this.xSpeed == 0) && (this.ySpeed = 0)) {
      this.xSpeed = random(-1, 1);
      this.ySpeed = random(-1, 1);
    }
    //this.shade = cme.getRandomColor();
    this.shade = cme.getRandomColor();
    this.alpha = 127+ random(128); //255; //random(255);
  }

  move() {
    this.x += this.xSpeed;
    if ((this.x < 0) || (this.x > width)) {
      this.xSpeed *= -1;
    }

    this.y += this.ySpeed;
    if ((this.y < 0) || (this.y > height)) {
      this.ySpeed *= -1;
    }
  }

  display() {
    let c = color(this.shade);
    c.setAlpha (this.alpha);
    fill (c);
    circle(this.x, this.y, this.r);
  }
}

// --------------------------------------------------------------------------------
function preload() {
}

function setup() {
  print (pgmName + " running @"+hour()+":"+minute());
  createCanvas(canvasW, canvasH);

  for (let i=0; i < numCircles; i++) {
    circles[i] = new Circle (random(width), random(height), 
      random(20, 80), random(-3, 3), random(-3, 3));
  }
}

// --------------------------------------------------------------------------------
function draw() {
  background(128); // noFill() stroke(0);

  for (let i=0; i < numCircles; i++) {
    circles[i].move();
    circles[i].display();
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
