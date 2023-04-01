//
//

class cmePattern {
  constructor(pattern, x, y, seg, pens=['#8080ff'], crayons=['#ffff80']) {
    this.x = x;
    this.y = y;
    this.seg = seg; // segment size length, assume square
    this.pattern = pattern;
    this.pens = pens;
    this.crayons = crayons;
  }

  
  //static staticCrayon = 1;
  //static staticSetCrayon(x) { cmePattern.staticCrayon = x; }
  // use in a function
  // print ("Static value =" + cmePattern.staticCrayon);
  // cmePattern.staticSetCrayon (5);
  // print ("Static value =" + cmePattern.staticCrayon);

  draw() {
    push()
    strokeWeight(2);
    translate(this.x, this.y);
    scale(this.seg / 100.);

    switch (this.pattern) {
      case 3: this.pattern03(); break;
      case 4: this.pattern04(); break;
      case 6: this.pattern06(); break;
      default:
        console.log("Unknown pattern type", this.pattern);
    }

    pop();
  }
  print() {
    print ("x,y="+this.x +","+ this.y + "    pens=" +this.pens);
  }

  pattern03() {  // an v
    fill(this.crayons[0]);
    stroke(this.pens[0]);
    rect(0, 0, 100, 100);
    line(0, 100, 50, 0);
    line(100, 100, 50, 0);
  }

  pattern04() {  // an x
    fill(this.crayons[0]);
    stroke(this.pens[0]);
    rect(0, 0, 100, 100);
    line(0, 0, 100, 100);
    line(100, 0, 0, 100);
  }

  pattern06() {  // diagonals on half
    fill(this.crayons[0]);
    stroke(this.pens[0]);
    rect(0, 0, 100, 100);
    line (0,0, 100, 100);
    line (25,0, 100, 75);
    line (50,0, 100, 50);
    line (75,0, 100, 25);
  }
}

let boxes = [];

function setup() {
  print ("running @"+hour()+":"+minute());
  var penpal = ['#ff0000','#ff8080'];

  createCanvas(415, 415);
  for (var x=5; x < width; x+= 205) {
    for (var y=5; y < height; y+= 205) {
      boxes.push(new cmePattern(6, x, y, 190, ['orange'], ['blue']));
    }
  }
  boxes[0].print();
}

function draw() {
  background('#f0f0f0');
  stroke(0);
  fill("blue");
  for (var j=0; j< boxes.length; j++) {
    boxes[j].draw();
  }
}
