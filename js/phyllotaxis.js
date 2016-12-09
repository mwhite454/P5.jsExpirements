
var n = 0;
var c = 4;
var maxN = 255;
var revolutions = 1;
var dir = 1;
var maxRevs = 10;

function setup() {
 createCanvas(400, 400);
 background(0);
 angleMode(DEGREES);
 colorMode(RGB);
 frameRate(40);
}

function draw() {
  var a = n * 137.5;
  var r = c * sqrt(n);
  var x = r * cos(a) + width/2;
  var y = r * sin(a) + height/2;

  console.log(revolutions/maxRevs);

  fill(n, (revolutions/maxRevs) *  255, (revolutions/maxRevs) *  255);
  //noStroke();
  ellipse(x, y, 8, 8);
  if(n<maxN){
      n++;
  } else {
    n = 0;
    if (revolutions <= maxRevs && dir == 1){
      revolutions++;
    } else if (revolutions > 0 && dir == 0){
      revolutions--;
    }
    else if (revolutions > maxRevs && dir == 1){
      revolutions--;
      dir = 0;
    } else if (revolutions == 0 && dir == 0){
      clear();
      revolutions = 1;
      dir = 1;
      background(0);
    }
  }

}
