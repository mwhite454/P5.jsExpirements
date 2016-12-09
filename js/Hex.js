
var hexSize = 30,
    origin,
    xOff,
    yOff,
    cols,
    rows,
    hexCount,
    Grid = [],
    build = false;

function setup() {
  createCanvas(600, 600);
  cols = Math.ceil(width/(hexSize*3));
  rows = Math.ceil((height/((sqrt(3)/2)*(hexSize*2))) *2);
  hexCount = cols * rows;
  origin = createVector(0,0);

}

function draw() {
  background(65);
  noFill();
  yOff = 0;
  for(var i=0; i<rows; i++){
    yOff = i * ((sqrt(3)/2)*(hexSize));
    var initX;
      if(i%2===0){
        initX = 0 ;
      } else {
        initX = hexSize * 1.5 ;
      }
    for(var j=0; j<cols; j++){
      xOff = j * (3*hexSize) + initX;
      polygon(xOff, yOff, hexSize, 6);
      var msg = i + ', ' + j;
      push();
      fill(255);
      textSize(9);
      text(msg, xOff, yOff);
      fill(0, 0, 255, 50);
      ellipse(xOff, yOff, hexSize*1.7, hexSize*1.7);
      pop();
          if(!build){
            console.log('Yoff: ' + yOff + ', Xoff: ' + xOff );
          }
    }


  }
  build = true;
  //polygon(width/2, height/2, hexSize, 6);
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function polygon(x, y, radius, npoints) {
  var angle = TWO_PI / npoints;
  beginShape();
  for (var a = 0; a < TWO_PI; a += angle) {
    var sx = x + cos(a) * radius;
    var sy = y + sin(a) * radius;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}
