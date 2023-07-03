// cmeDemoFirework.js
// Draw a firework

const myProgramName = "Demo Firework"
const tileDim = 50; // size of the tile, they are square
const canvasW = 1000; // canvas size
const canvasH = 550; // canvas size
const szParticle = 10;
const gravity = 0.25;

var particles;
var gCounter;


// --------------------------------------------------------------------------------
const crayons = ['BurlyWood','CadetBlue','Chartreuse','cornsilk','red', 'orange', 'yellow', 'lime', 'cyan', 'magenta', 'white'];


class Train  {
  constructor (x, y, xVel, yVel, pColor, isRocket) {
    this.xVel = xVel;
    this.yVel = yVel;
    this.points = [];
    this.color = pColor;
    this.len = 10;
    for (var j=0; j< this.len; j++) {
      //this.points.push (new Point(x, y));
      this.points.push (createVector(x, y));
    }
    this.explode = random(20, 50);
    this.alive = true;
    this.rocket = isRocket;
  }

  draw () {
    // draw
    if (this.alive == false) return;

    fill(this.color); 
    for (var j=0; j< this.points.length; j++) {
      rect (this.points[j].x,this.points[j].y, 5, 5);
    }

    // update
    this.explode--;
    if (this.explode < 0) {
      this.alive = false;
      if (this.rocket) {
        this.explodeRocket(random(15, 30));
      }
    }
    for (var j= this.points.length-1; j > 0; j--) {
      this.points[j].x = this.points[j-1].x;
      this.points[j].y = this.points[j-1].y;
    }
    this.points[0].x += this.xVel;
    this.points[0].y += this.yVel;
    this.yVel += gravity;
  }

  explodeRocket (n) {
    for (var j=0; j < n; j++) {
      const speed = random(5, 10);
      const angle = random(TWO_PI);
      const xSpeed = cos(angle) * speed;
      const ySpeed = sin(angle) * speed;
      particles.push (new Train (this.points[0].x, this.points[0].y, xSpeed, ySpeed, this.color, false));
    }
  }

}

function drawGradientBackground(c1, c2, n) {
  var dh = height / n;
  var shade;
  var y, j;

  noStroke();
  for (y=0,j=0; y <= height; y+= dh, j++) {
    shade = lerpColor(c1, c2, j/n);
    fill(shade);
    rect(0, y, width, dh);
  }
}
// --------------------------------------------------------------------------------
function preload() {
}


var b1, b2;
function setup() {
  print (myProgramName + " running @"+hour()+":"+minute());
  createCanvas(canvasW, canvasH);
  particles = [];
  gCounter = 0;
  b1 = random(cme.crayons48);
  b2 = random(cme.crayons48);
}

// --------------------------------------------------------------------------------
function draw() {
  //background('MidnightBlue'); //128); // noFill() stroke(0);
  //drawGradientBackground(color('MidnightBlue'),color('CadetBlue'), 36);
  drawGradientBackground (color(b1),color(b2), 40);

  particles.forEach ((p) => {
    p.draw();
  });
	//particles = particles.filter((p) => p.alive);
	particles = particles.filter(function (p) { return p.alive; });

  gCounter--;
  if (gCounter <= 0) {
    gCounter = random(15, 60);
    particles.push (new Train (random(width), height, random(-3,3), -random(8, 15), random(crayons), true));
  }
}
// --------------------------------------------------------------------------------
function mousePressed() {
  //print ("mouse press at " + mouseX + " " + mouseY);
  particles.push (new Train (mouseX, height, random(-3,3), -random(8, 15), random(crayons), true));
}

function keyReleased() {
  switch (key) {
    case 'c': case 'C':
      print (particles.length);
      break;
    default:
      print ("key pressed value = " + key + "  keyCode = " + keyCode);
      break;
  }
}
