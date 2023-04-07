//

let boxes = [];
let param01 = null;

function cmePatternParams (side,
    penOutline = 'black',
    crayOutline = 'lightgrey',
    pens = ['blue','red', 'green'],
    crays = ['orange', 'yellow', 'skyblue'],
  ) {
  this.side = side; 
  this.penOutline = penOutline;
  this.crayOutline = crayOutline;
  this.pens = pens;
  this.crays = crays;
}

class cmePattern {
  // start with everything on a 0-100 scale until problematic
  constructor (x, y, params, rot=0) {
    this.x = x;
    this.y = y;
    this.rot = rot;
    this.p = params; // side length, assume square
  }
  draw_bgn() { // common start for all derived classes
    push()
    translate(this.x, this.y);
    scale(this.p.side / 100.);
  }
  draw () {  // a default draw, expect that each routine does their own thing
    this.draw_bgn();
    noFill();
    stroke(0);
    rect (this.x, this.y, this.p.side, this.p.side);
    this.draw_end();
  }
  draw_end() {
    pop();
  }
  printMe() { print (this); print(  this.p);}
}

class cmePattern00 extends cmePattern {
  draw () {
    this.draw_bgn();
    fill (this.p.crayOutline);
    stroke(this.p.penOutline);
    strokeWeight(1);
    rect (0, 0, 100, 100);
    fill(this.p.crays[0]);
    strokeWeight(3);
    circle(50, 50, 50);
    this.draw_end();
  }
}

class cmePattern03 extends cmePattern { // 03 is a triangle
  draw () {
    this.draw_bgn();
    fill (this.p.crayOutline);
    stroke(this.p.penOutline);
    strokeWeight(1);
    rect (0, 0, 100, 100);

    if (this.rot) {
      translate (50, 50);
      rotate(this.rot);
      translate (-50, -50);
    }

    stroke(this.p.pens[1]);
    strokeWeight(3);
    line (0, 100, 50, 0);
    line (100, 100, 50, 0);
    
    this.draw_end();
  }
}



// --------------------------------------------------------------------------------
function setup() {
  print ("running @"+hour()+":"+minute());
  var penpal = ['#ff0000','#ff8080'];

  createCanvas(400, 400);
  //cmePatternParams (side, penOutline, crayOutline, pens[], crays[]);
  param01 = new cmePatternParams (100);
  param02 = new cmePatternParams (200, 'blue', 'yellow', ['red', 'green'], ['orange','pink']);
  param03 = new cmePatternParams (50, 'red');

  // pattern (x, y, params, rot);
  boxes.push(new cmePattern00 (0, 0, param01));
  boxes.push(new cmePattern03 (100, 0, param02));
  boxes.push(new cmePattern03 (0, 100, param03, PI/2));
  boxes.push(new cmePattern03 (50, 100, param03, PI));
  boxes.push(new cmePattern03 (0, 150, param03, -PI/2));
  boxes.push(new cmePattern03 (50, 150, param03, 0));
}

// --------------------------------------------------------------------------------
function draw() {
  background('#f0f0f0');
  noFill()
  stroke(0);
  for (var x=0; x < 400; x+= 100) {
    line(x, 0, x, 400);
    line(0, x, 400, x); // the x is y
  }
  for (var j=0; j< boxes.length; j++) {
    boxes[j].draw();
  }
}
