// cmeTableDemo.js
// show how to read a table

let table;
let palFile = [];

function preload() {
  table = loadTable('assets/aLego.csv', 'csv', 'header');
}

function setup() {
  print ("TableDemo running @"+hour()+":"+minute());
  createCanvas(1000, 550);

  print (table.getRowCount() + ' total rows');
  print (table.getColumnCount() +  ' cols');
  //print (table.getColumn('Hex');

  for (let r = 0; r < table.getRowCount(); r++) {
    let row = table.getRow(r);
    //for (let c = 0; c < table.getColumnCount(); c++) { print (row.getString(c)); }
    //print (row);
  }
  let col = table.getColumn("Hex");
  //print (col);

  for (let i=0; i < table.getRowCount(); i++) {
    //print (table.get(i, 'Hex'));
    palFile.push (table.get(i, 'Hex'));
  }
  for (let i=0; i < palFile.length; i++) {
    print ('pf[' + i + ']= ' + palFile[i]);
  }
}

function draw() {
  background(128);

  noFill()
  stroke(0);

  let theimage;

  let x = 0;
  let y = 0;
  let d = 100;
  for (var i=0; i < palFile.length; i++) {
    fill(palFile[i]);
    rect (x, y, d, d);
    x += d;
    if (x >= 600) { x = 0; y += d; }
  }
}
