// Looper - Draw looping lines
// Derivative from tutorial at happycoding.io 
//
// x change color to be slowly changing -- not that great
// x +/1 change total num of loops
// x use p5 h w instead of constants
// x loops stert on other sides
// x alternative color

let gLoops;
let gBackground = false;

const canvasW = 1000; // canvas size
const canvasH = 550; // canvas size
var gLoopPop = 5; // starting loop count
const turnChance = 0.005;
var gDot;

// --------------------------------------------------------------------------------
class Looper {

  constructor(x, y){
    let star = random();
    if (star < 0.25) {
      this.x = random(width);
      this.y = height-1;
      this.heading = 3*PI/2;
    }
    else if (star < 0.50) {
      this.x = random(width);
      this.y = 0;
      this.heading = PI/2;
    }
    else if (star < 0.75) {
      this.x = 0;
      this.y = random(height);
      this.heading = 0;
    }
    else {
      this.x = width-1;
      this.y = random(height);
      this.heading = PI;
    }

    this.xPrev = this.x;
    this.yPrev= this.y;
    this.speed = random(0.5, 3.5); //random(1, 5);
    this.c = color('red');
    this.c = color(cme.getRandomColor()); //color('red');
    this.turning = 0; // if non-zero then turn; turn countdown timer
    this.turnVel = 0.025 * (random(1) < .5 ? 1 : -1);; // turn left or right
    this.isAlive = true;

    this.sinOffset = random(100);
  }
  update () {
    //var headOffset = randomGaussian() * .1 + sin(this.sinOffset + frameCount * .1) * 0.25;
    var headOffset = sin(this.sinOffset + frameCount * .1) * .025;
    
    if (this.turning > 0) {
      //headOffset = 0;
      this.heading += this.turnVel;
      this.turning -= 1;
    }
    else {
      if (random() < turnChance) {
        this.forceTurn();
      }
    }
    this.heading += headOffset;
    this.constrainHeading();
    this.xPrev = this.x;
    this.yPrev= this.y;
    this.speed = random(0.5, 3.5); //random(1, 5);
    this.c = color('red');
    this.c = color(cme.getRandomColor()); //color('red');
    this.turning = 0; // if non-zero then turn; turn countdown timer
    this.turnVel = 0.025 * (random(1) < .5 ? 1 : -1);; // turn left or right
    this.isAlive = true;

    this.sinOffset = random(100);
  }
  update () {
    //var headOffset = randomGaussian() * .1 + sin(this.sinOffset + frameCount * .1) * 0.25;
    var headOffset = sin(this.sinOffset + frameCount * .1) * .025;
    
    if (this.turning > 0) {
      //headOffset = 0;
      this.heading += this.turnVel;
      this.turning -= 1;
    }
    else {
      if (random() < turnChance) {
        this.forceTurn();
      }
    }
    this.heading += headOffset;
    this.constrainHeading();
    this.xPrev = this.x;
    this.yPrev = this.y;
    this.x += cos(this.heading) * this.speed;
    this.y += sin(this.heading) * this.speed;
    //this.shiftColor();
    this.c = darkenColor(this.c, 1);
  }
  draw () {
    //noStroke();
    //fill(this.c);
    //circle(this.x, this.y, 3);
    strokeWeight(5);
    stroke(this.c);
    line (this.x, this.y, this.xPrev, this.yPrev);
  }
  constrainHeading(){
      if(this.heading < 0){
        this.heading += TAU;
      }
      this.heading = this.heading % TAU;
  }
  forceTurn() {
    this.turning = int(random(75, 150));
    //this.c = color(cme.getRandomColor()); //color('red');
    this.turnVel = 0.025 * (random(1) < .5 ? 1 : -1);; // turn left or right
  }
  shiftColor() {
    var r,g,b;
    r = cme.minmax((red(this.c) + int(random(0,3))-1),0,255);
    g = cme.minmax((green(this.c) + int(random(0,3))-1),0,255);
    b = cme.minmax((blue(this.c) + int(random(0,3))-1),0,255);
    this.c = color(r,g,b);
  }
}
// --------------------------------------------------------------------------------

function darkenColor(c, n=1) {
  return color(
    cme.minmax((red(c) - n), 0,255),
    cme.minmax((green(c) - n), 0,255),
    cme.minmax((blue(c) - n), 0,255)
  );
}

function destroyOffscreen() {
  for(const lp of gLoops){
    if (lp.x < 0 || lp.x > width  || lp.y < 0 || lp.y > height ) {
      lp.isAlive = false;
    }
  }
}

function restart() {
  gLoops = [];
  background(0, 0, 128); // noFill() stroke(0);
  for (var i=0; i < gLoopPop; i++) {
    gLoops.push(new Looper());
  }
}

function doShiftColor(c) {
    var r,g,b;
    r = cme.minmax((red(c) + int(random(0,3))-1),0,255);
    g = cme.minmax((green(c) + int(random(0,3))-1),0,255);
    b = cme.minmax((blue(c) + int(random(0,3))-1),0,255);
    c = color(r,g,b);
    return c;
}
// --------------------------------------------------------------------------------

function preload() {
}

function setup() {
  print ("Demo Looper running @"+hour()+":"+minute());
  createCanvas(canvasW, canvasH);

  gDot = color(cme.getRandomColor());

  restart();
}

// --------------------------------------------------------------------------------
function draw() {
  //background(128); // noFill() stroke(0);
  if (gBackground) { background(28, 3); }
  for(const lp of gLoops){
    lp.draw();
    lp.update();
  }
  destroyOffscreen();
  gLoops = gLoops.filter((p) => p.isAlive);
  while (gLoops.length < gLoopPop) {
      gLoops.push(new Looper());
  }
  gDot = doShiftColor(gDot);
  fill(gDot);
  noStroke();
  circle(width-100, height-100, 50);
}
// --------------------------------------------------------------------------------
function keyReleased() {
  switch (key) {
    case '+': ++gLoopPop; break;
    case '-': if (gLoopPop > 0) {--gLoopPop;} break;
    case 'b': gBackground = !gBackground; break;
    case 'd':
      gLoops[int(random(gLoops.length))].isAlive = false;
      break;
    case 'p': print(gLoops.length); break;
    case 'r': restart(); break;
    case 't':
      gLoops[int(random(gLoops.length))].forceTurn();
      break;
    default:
      print ("key pressed value = " + key + "  keyCode = " + keyCode);
      break;
  }
}
