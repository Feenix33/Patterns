//  squares
//  draw a repeating pattern of squares with variation in colors

let boxes = [];


class cmeSquare {
  constructor (x, y, side, crayons, pens, levels) {
    this.x = x;
    this.y = y;
    this.side = side;
    this.crayons = crayons;
    this.pens = pens;
    this.levels = levels;
    if (this.levels <= 0) {this.levels = 1;}
  }
  draw() {
    var xp = [];
    var side = [];
    var dx = 50 / this.levels;

    for (var j=0; j < this.levels; j++) {
      xp.push( 0 + j*dx );
      side.push (100 - (2*j*dx));
    }

    push()
    translate(this.x, this.y);
    scale(this.side / 100.);
    
    var npen, ncrayon;
    for (var j=0; j < this.levels; j++) {
      npen = j % this.pens.length;
      ncrayon = j % this.crayons.length;
      stroke(this.pens[npen]);
      fill(this.crayons[ncrayon]);
      rect (xp[j], xp[j], side[j], side[j]);
    }

    pop();

  }
  printMe() { print (this); print(this.p);}
  stringMe() { return ("x="+this.x + " y="+this.y 
      + " side="+this.side
      + " levels="+this.levels
      );
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

  createCanvas(800, 400);

  var nl;
  for (var x=0; x < width; x+= 100) {
    for (var y=0; y < height; y+= 100) {
      nl = Math.floor (Math.random()*3) + (Math.random()*3) + 2;
      if ((x+y)%200) {
        boxes.push( new cmeSquare (x, y, 100, palButterflies, palNatlTreasures, nl));
      } else {
        boxes.push( new cmeSquare (x, y, 100, palPaperFlowers, palIntDesign, nl));
      }
    }
  }
  for (var j=0; j<boxes.length; j++) {
    // boxes[j].printMe();
    //print (j + "   " +  boxes[j].stringMe());
  }
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
