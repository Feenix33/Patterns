//
// more patterns
// add rotation
// color changing
// control how to use colors
//

let boxes = [];
let param01 = null;

function cmePatternParams (side, rot=0,
    pens= {0: 'black', outline: 'blue'},
    crayons= {0: 'lightgrey', background: 'whitesmoke'}
  ) {
  // use with var item = new Item(params);
  this.side = side; 
  this.rotate = rot;
  this.pens = pens;
  this.crayons = crayons;
}

class cmePattern {
  // start with everything on a 0-100 scale until problematic
  constructor (pattern, x, y, params) {
    this.pattern = pattern;
    this.x = x;
    this.y = y;
    this.p = params; // side length, assume square
  }
  draw_bgn() { // common start for all derived classes
    push()
    translate(this.x, this.y);
    scale(this.side / 100.);
  }
  draw () {  // a default draw, expect that each routine does their own thing
    this.draw_bgn();
    fill('#d3d3d3');
    stroke('8b4513');
    strokeWeight(3);
    rect (this.x, this.y, this.p.side, this.p.side);
    this.draw_end();
  }
  draw_end() {
    pop();
  }
}

class cmePattern00 extends cmePattern {
  draw () {
    this.draw_bgn();
    fill (this.p.crayons.background);
    stroke(this.p.pens[0]);
    strokeWeight(1);
    rect (this.x, this.y, this.p.side, this.p.side);
    fill(this.p.crayons[0]);
    stroke('darkviolet');
    strokeWeight(3);
    circle(this.x+50, this.y+50, 50);
    this.draw_end();
  }
}



// --------------------------------------------------------------------------------
function setup() {
  print ("running @"+hour()+":"+minute());
  var penpal = ['#ff0000','#ff8080'];

  createCanvas(400, 400);
  param01 = new cmePatternParams (100);
  boxes.push(new cmePattern00 (1, 25, 25, param01));
  boxes.push(new cmePattern00 (1, 125, 25, param01));

  var dict = {
    FirstName: "Chris",
    "one": 1,
    1: "some value"
  };
  dict["one"] = 10;
  print ("dict = " + dict.FirstName + " " + dict["one"]);
  print ("tests t/f =" + ("one" in dict) + " / " + ("fart" in dict));
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
