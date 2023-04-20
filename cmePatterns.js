// 

let boxes = [];


class cmePattern {
  // start with everything on a 0-100 scale until problematic
  // params {fillBack, lineBack, fillFore[], lineFore[] }  OLD
  // params {fillBack, lineBack, crayons[], pens[] }  NEW
  constructor (x, y, side, params={}, rot=0) {
    this.x = x;
    this.y = y;
    this.side = side
    this.p = params; // side length, assume square
    this.rot = rot;
    if (!this.p.fillBack) this.p.fillBack = 'black';
    if (!this.p.lineBack) this.p.lineBack = 'white';
    if (!this.p.wtPen) this.p.wtPen = 3;
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
  printMe() { print (this); print(this.p);}
}

class cmePattern00 extends cmePattern {
  draw () {
    this.draw_bgn();
    fill(this.p.fillBack);
    rect (0, 0, 100, 100);

    if (!this.p.crayons) fill(this.p.lineBack);
    else fill(this.p.crayons[0]);
    strokeWeight(3);
    circle(50, 50, 50);
    this.draw_end();
  }
}

// --------------------------------------------------------------------------------
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
    img.fill(this.p.fillBack);
    img.rect(0, 0, 100, 100);

    img.strokeWeight(this.p.wtPen);
    //img.stroke('red');
    img.stroke(this.p.pens[0]);
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

// --------------------------------------------------------------------------------
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
// Pattern 04 is an x
class cmePattern04 extends cmePattern { 
  draw() {
    this.draw_bgn();

    fill(this.p.fillBack);
    rect (0, 0, 100, 100);

    strokeWeight(this.p.wtPen);
    stroke(this.p.pens[0]);
    line(0, 0, 100, 100);
    line(0, 100, 100, 0);

    this.draw_end();
  }
}
// Pattern 04a is an x that is filled in
class cmePattern04a extends cmePattern { 
  draw() {
    this.draw_bgn();

    strokeWeight(this.p.wtPen);

    fill(this.p.crayons[0]);
    stroke(this.p.pens[0]);
    triangle (0,0, 50,50, 0,100);
    triangle (100,0, 50,50, 100,100);

    fill(this.p.crayons[1]);
    stroke(this.p.pens[1]);
    triangle (0,0, 50,50, 100,0);
    triangle (0,100, 50,50, 100,100);

    this.draw_end();
  }
}

// --------------------------------------------------------------------------------

let palAfternoonSinkers = ['#ffc2c7', '#b6e5d8', '#fbe5c8', '#8fdde7'];
let palCheekyMarguerita = ['#0A7029', '#FEDE00', '#C8DF52', '#DBE8D8'];
let palPaperFlowers = [ '#F25CAF', '#048ABF', '#07B2D9', '#B7D996', '#F29F05']; // @top-view-of-colorful-paper-cut-flowers-with-green-leaves-on-blue-background-with-copy-space
let palButterflies = [ '#970FF2', '#0597F2', '#49D907', '#EAF205', '#F24607']; // @Colors-of-rainbow.-Pattern-of-multicolored-butterflies-morpho,-texture-background
let palIntDesign = [ '#A1A2A6', '#024959', '#F2C230', '#F2AE2E', '#593E25']; // @GIN&TONIC---interior-design-/-2018
let palNatlTreasures = [ '#BF3945', '#F2CA7E', '#F28705', '#8C4303', '#F26D3D']; // @National-Treasures:-Series-2

// --------------------------------------------------------------------------------
function setup() {
  print ("running @"+hour()+":"+minute());

  createCanvas(400, 400);

  let p1 = {fillBack:'cornsilk', lineBack:0, 
      crayons:palPaperFlowers, 
      pens:palButterflies, 
      wtPen:5, rot: 0, spin: 0,
  } 
  let p2 = {fillBack:'cornsilk', lineBack:0, 
      crayons:palAfternoonSinkers, 
      pens:palCheekyMarguerita, 
      wtPen:5, rot: 0, spin: 0,
  } 
  let p3 = {fillBack:'cornsilk', lineBack:0, 
      crayons: palIntDesign,
      pens: palNatlTreasures,
      wtPen:5, rot: 0, spin: 0,
  } 
  // constructor (x, y, side, params, rot=0) {
  var typ = [cmePattern00, cmePattern04];
  var pals = [p1, p2, p3];
  var it = 0;
  var ip = 0;
  for (var x=0; x < 400; x+= 100) {
    for (var y=0; y < 400; y+= 100) {
      addBox( typ[it], x, y, 100, pals[ip]);
      it= (it + 1) % typ.length;
      ip= (ip + 1) % pals.length;
    }
    it= (it + 1) % typ.length;
    ip= (ip + 1) % pals.length;
  }

  //addBox( cmePattern04, 0, 100, 100, p2 );
  //addBox( cmePattern04a, 0, 200, 100, p2 );
}

function addBox(type, x, y, side, params, rot=0) {
  boxes.push( new type (x, y, side, params, rot));
  //boxes[boxes.length-1].printMe();
}

// --------------------------------------------------------------------------------

function draw() {
  background('#f0f0f0');
  noFill()
  stroke(0);
  // add some lines so we know what is going on
  for (var x=0; x < 400; x+= 100) {
    line(x, 0, x, 400);
    line(0, x, 400, x); // the x is y
  }
  for (var j=0; j< boxes.length; j++) {
    boxes[j].draw();
  }
}
