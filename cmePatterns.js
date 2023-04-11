// 

let boxes = [];


class cmePattern {
  // start with everything on a 0-100 scale until problematic
  constructor (x, y, side, params={}, rot=0) {
    this.x = x;
    this.y = y;
    this.side = side
    this.p = params; // side length, assume square
    this.rot = rot;
  }
  draw_bgn() { // common start for all derived classes
    push()
    translate(this.x, this.y);
    scale(this.side / 100.);
  }
  draw () {  // a default draw, expect that each routine does their own thing
    this.draw_bgn();
    noFill();
    stroke(0);
    rect (0, 0, 100, 100);
    line(0, 0, 100, 100);
    line(0, 100, 100, 0);
    this.draw_end();
  }
  draw_end() {
    pop();
  }
  printMe() { print (this); }
}

class cmePattern00 extends cmePattern {
  draw () {
    this.draw_bgn();
    //fill (this.p.crayOutline);
    //stroke(this.p.penOutline);
    //strokeWeight(1);
    //rect (0, 0, 100, 100);
    fill(this.p.fillBack);
    //strokeWeight(3);
    circle(50, 50, 50);
    this.draw_end();
  }
}

class cmePattern01 extends cmePattern {
  draw() {
    this.draw_bgn();

    let img = createGraphics(100, 100);
    img.noFill();
    if (this.rot) {
      img.translate (50, 50);
      img.rotate(this.rot);
      img.translate (-50, -50);
    }
    img.strokeWeight(3);
    img.stroke('red');
    img.line(0, 100, 50, 0);
    img.line(100, 100, 50, 0);

    let mk = createGraphics(100, 100);
    mk.rect(0, 0, 100, 100);

    let imgClone = img.get();
    imgClone.mask(mk.get());

    image(imgClone, 0, 0);
    this.draw_end();
  }
}

class cmePattern03 extends cmePattern {
  draw() {
    this.draw_bgn();
    if (this.rot) {
      translate (50, 50);
      rotate(this.rot);
      translate (-50, -50);
    }
    strokeWeight(3);
    stroke('red');
    line(0, 100, 50, 0);
    line(100, 100, 50, 0);
    this.draw_end();
  }
}


// --------------------------------------------------------------------------------
function setup() {
  print ("running @"+hour()+":"+minute());

  createCanvas(400, 400);

  // constructor (x, y, side, params, rot=0) {
  boxes.push(new cmePattern00 (100, 100, 100, {fillBack:'black', lineBack:'white'}));
  boxes.push(new cmePattern01 (200, 100, 100, {fillBack:'black', lineBack:'white'}, PI/4));
  boxes[0].printMe();

}

// --------------------------------------------------------------------------------

function draw() {
  background('#f0f0f0');
  noFill()
  stroke(0);
  boxes[1].rot += (PI/180);
  for (var x=0; x < 400; x+= 100) {
    line(x, 0, x, 400);
    line(0, x, 400, x); // the x is y
  }
  for (var j=0; j< boxes.length; j++) {
    boxes[j].draw();
  }
}
