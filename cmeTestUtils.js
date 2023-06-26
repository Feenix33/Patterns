// cmeTestUtils.js
// Test the cmeUtils file

// --------------------------------------------------------------------------------
function preload() {
}

function setup() {
  print ("Test Utils running @"+hour()+":"+minute());
  createCanvas(400, 250);
  let j = null;
  print (j);
  if (cmeUtils.isNull(j)) {print ("j is null"); }
  else { print ("j is not null"); }

  let a=20;
  print (cmeUtils.minmax(a, 1, 10));
  a=-20;
  print (cmeUtils.minmax(a, 1, 10));
  a= 5;
  print (cmeUtils.minmax(a, 1, 10));

  print ("rangeToPercent");
  print (cmeUtils.rangeToPercent (a, 0, 25));

  print ("percentToRange");
  print (cmeUtils.percentToRange(0.5, 5, 25));

  print (cmeUtils.randomString (10));
  print (cmeUtils.randomString ());

  print ('getRandomColor');
  print (cmeUtils.getRandomColor());
  clrBackground = cmeUtils.getRandomColor();
}
var clrBackground;

// --------------------------------------------------------------------------------
function draw() {
  background (clrBackground);
}
// --------------------------------------------------------------------------------
function keyReleased() {
  switch (key) {
    default:
      print ("key pressed value = " + key + "  keyCode = " + keyCode);
      break;
  }
}
