
var balls = [];
var targets=[];
var ballCount = 5;
var targetCount = 2;

function setup() {
  createCanvas(600, 600);

  for(var i=0; i<ballCount; i++){
    dna = new DNA();
    ball = new Ball(dna);
    balls.push(ball);
  }
/*  for(var j=0; j<targetCount; j++){
    dna = new DNA();
    target = new Ball(dna);
    targets.push(target);
  }*/

}

function draw() {
  background(65,65,65);
  ballCount = balls.length;
  //targetCount = targets.length;
  for(var i=0; i<ballCount; i++){
    balls[i].update();
    balls[i].show();
  }
/*  for(i=0; i<targetCount; i++){
    //balls[i].update();
    targets[i].show(0);
  }*/

}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function DNA(parent){
  if(!parent){
  this.origin = createVector(random(0, width), random(0, height));
  this.MAX_velocity = Math.floor(random(1, 10));
  this.radius = random(10, 25);
  this.MAX_Focus = random(10, 90);
  this.sense = random(3, 25);
  this.MAX_health = random(400, 2000);
  this.skinTone = random(50, 255);
  }
}

function Ball(DNA){
  this.dna = DNA;
  this.currentFocus = this.dna.MAX_Focus;
  this.velocity = createVector(Math.floor(random(-1, 1)), Math.floor(random(-1, 1)));
  this.health = this.dna.MAX_health;
  this.pos = this.dna.origin;
  this.dir = createVector(random(-6, 6), random(-6, 6));
  this.turn = function(){
    this.velocity = Math.floor(random(1, this.dna.MAX_velocity));
    this.dir = createVector(Math.floor(random(-6, 6)), Math.floor(random(-6, 6)));
  };
  this.newFocus = function(){
    this.currentFocus = random(3, this.dna.MAX_Focus);
  };
  this.aboutFace = function(){
    this.dir = this.dir.mult(-1, -1);
  }

  this.update = function(){
    if(this.currentFocus < 1){
      this.turn();
      this.newFocus();
    } else if (this.pos.x < 3 || this.pos.x > width-3 || this.pos.y < 3 || this.pos.y > height-3){
      this.aboutFace();
    }
    this.currentFocus -=1;
    //this.dir.mult(this.velocity.x, this.velocity.y);
    this.pos.add(this.dir.x, this.dir.y);
    //this.pos.mult(this.velocity.x, this.velocity.y);
    this.pos.x = constrain(this.pos.x, 0, width);
    this.pos.y = constrain(this.pos.y, 0, height);
  };
  this.show = function(color){
    push();
    noStroke();
    fill(this.dna.skinTone);
    ellipse(this.pos.x, this.pos.y, this.dna.radius, this.dna.radius);
    pop();
  };

}
