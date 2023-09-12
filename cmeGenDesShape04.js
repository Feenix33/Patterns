const cmeProgram = "cmeGenDesShape04.js"
// Recreations of Generative Design, Creative Coding on the Web
// Shape Chapter
// Based on P.2.1.1.04
//
// draw images that follow the moust
// mouse
//   pos x,y = where the shapes look
//
// keys
//   1 round strokecap
//
// variation
//


// --------------------------------------------------------------------------------
// Globals
var gridSz = 50;
var angOffset = 0;
var shapeArray;
var shapeDex;


// --------------------------------------------------------------------------------
function preload() {
}

function setup() {
  const canvasW = 600; // canvas size
  const canvasH = 600; // canvas size
  console.log(cmeProgram + ' @' + cme.timelog());
  createCanvas(canvasW, canvasH);

  shapeArray = [drawShape03, drawShape02, drawShape01];
  shapeDex = 0;
}

function drawShape01() {
      var g2 = gridSz/2;
      var g4 = gridSz/4;
      noStroke();
      fill('pink');
      triangle(g2,gridSz, g4,g4, 3*g4,g4);
      stroke('black');
      strokeWeight(5);
      line(g2,g2, g2,gridSz);
}

function drawShape02() {
      stroke('yellow');
      strokeWeight(3);
      line(0, 0, gridSz, gridSz);
      stroke('red');
      strokeWeight(5);
      line(0, gridSz, gridSz/2, gridSz/2);
}

function drawShape03() {
  var g2 = gridSz/2;
  noStroke();
  fill('white');
  circle(g2, g2, g2*0.9);
  var g3 = gridSz/3;
  fill('brown');
  circle(g2, g3, g2*0.6);
}


// --------------------------------------------------------------------------------

function draw() {
  background('blue');
  var ang; // angle

  for (var y=0; y < height; y+= gridSz) {
    for (var x=0; x < width; x+= gridSz) {
      push();
      translate(x+gridSz/2, y+gridSz/2);
      ang = atan2(mouseY - y, mouseX - x) + (angOffset*PI/180);
      rotate(ang);
      translate(-gridSz/2, -gridSz/2);
      //scale(1.5);
      shapeArray[shapeDex]();
      pop();
    }
  }
}


// --------------------------------------------------------------------------------

function keyReleased() {
  //if (keyCode == DELETE || keyCode == BACKSPACE) background(0, 0, 255);
  //if (keyCode == RIGHT_ARROW) angOffset += 5;
  //if (keyCode == LEFT_ARROW) angOffset -= 5;
  switch (key) {

    case '+':
      shapeDex += 1;
      shapeDex = shapeDex % shapeArray.length;
      break;
    case 'd': // debug
      console.log ("offset angle = " + angOffset);
      break;
    case 'r': // reset
      angOffset = 0;
      break;

    case 'm': console.log ("mouse at ["+ mouseX + "," + mouseY + "]");break;
    case 'S': console.log("saving"); saveCanvas(cme.timestring(), 'png'); break;
      break;
    default:
      switch (keyCode) {
        case RIGHT_ARROW: angOffset += 5; break;
        case LEFT_ARROW: angOffset -= 5; break;
        case UP_ARROW: angOffset += 90; break;
        case DOWN_ARROW: angOffset -= 90; break;

        default:
          print ("key pressed value = " + key + "  keyCode = " + keyCode);
          break;
      }
      break;
  }
}
function mousePressed() {
  console.log ("mouse pressed ["+ mouseX + "," + mouseY + "]");
}

