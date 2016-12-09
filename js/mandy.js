var frictionVal = -0.03,
    bounceVal = 0.9,
    turns = 7,
    score = 0,
    ball,
    ballCount = 10,
    balls = [];

function setup() {
  createCanvas(600, 600);
  game = new GameArea();
  ball = new Ball(true);
  for(var i = 0; i<ballCount; i++){
    balls[i] = new Ball();
  }

}

function draw() {
  background(65);
  game.show();
  fill(255);
  ball.move();
  ball.show();
  for(var i = 0; i<ballCount; i++){
    fill(0,0,100);
    var d = dist(ball.pos.x, ball.pos.y, balls[i].pos.x, balls[i].pos.y);
    if (d<(balls[i].radius + ball.radius)){
      balls[i].velocity.add(ball.velocity);
      ball.bounce();
    }
    for(var j = 0; j < ballCount; j++){
      if(j!==i){
        var d = dist(balls[j].pos.x, balls[j].pos.y, balls[i].pos.x, balls[i].pos.y);
        if(d<(balls[i].radius*2)){
          balls[j].velocity.add(balls[i].velocity);
          balls[i].bounce();
        }
      }
    }
    balls[i].move();
    balls[i].show();
  }
  game.assessSelf();
  push();
  noStroke();
  fill(0, 200, 0);
  text("Score: " + score, 10, height-30);
  text("Turns: " + turns, 10, height-10);
  pop();
}

function keyPressed() {
  if(keyCode === UP_ARROW){
    ball.force.set(0, -3);
  } else if (keyCode === DOWN_ARROW) {
    ball.force.set(0, 3);
  } else if (keyCode === LEFT_ARROW) {
    ball.force.set(-3, 0);
  } else  if (keyCode === RIGHT_ARROW) {
    ball.force.set(3, 0);
  }
  //console.log(ball.force);
}

function mouseClicked(){
  if(turns>0){
    var mouse = createVector(mouseX, mouseY);
    ball.seek(mouse);
  }
  turns -= 1;
  //ball.force.add(heading);
}

function GameArea(){
  this.pos = createVector(width/2, height/3);
  this.radius = 160;
  this.show = function(){
    push();
    noFill();
    strokeWeight(10);
    stroke(150, 0, 0);
    ellipse(this.pos.x, this.pos.y, this.radius*2, this.radius*2);
    pop();
  };
  this.assessSelf = function(){
    var potentialScore = ballCount;
    for(var i = 0; i<ballCount; i++){
      var d = dist(balls[i].pos.x, balls[i].pos.y, this.pos.x, this.pos.y);
      if(d<this.radius+balls[i].radius){
        potentialScore -= 1;
      }
    }
    score = potentialScore;
    //console.log(score);
  };
}

function Ball(isPrime){
  if(isPrime){
    this.isPrime = isPrime;
    this.pos = createVector(width/2, height - 15);
  } else {
    this.isPrime = false;
    this.pos = createVector(Math.floor(random((game.pos.x - game.radius/2), (game.pos.x + game.radius/2))), Math.floor(random((game.pos.y - game.radius/2), (game.pos.y + game.radius/2))));
  }
  this.velocity = createVector(0,0);
  this.force = createVector(0,0);
  this.friction = createVector(0,0);
  this.radius = 8;
  this.maxforce = 4;
  this.maxspeed = 3;

  this.bounce = function(){
    if(this.pos.x < this.radius){
      this.pos.x = this.radius;
      this.velocity.x = -this.velocity.x;
    } else if (this.pos.x > width - this.radius){
      this.pos.x = width-this.radius;
      this.velocity.x = -this.velocity.x;
    } else if(this.pos.y < this.radius){
      this.pos.y = this.radius;
      this.velocity.y = -this.velocity.y;
    } else if(this.pos.y > (height - this.radius)){
      this.pos.y = height - this.radius;
      this.velocity.y = -this.velocity.y;
    } else {
      this.velocity.mult(-1);
    }
  };

  this.seek = function(target){
    if(this.isPrime){
      var mag = dist(this.pos.x, this.pos.y, target.x, target.y) * 0.1;
      var desired = target.sub(this.pos);
      desired.normalize();
      desired.mult(mag);
      var steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(mag*0.5);
      this.velocity.add(steer);
    }
  };

  this.applyfriction = function(){
    this.friction = this.velocity.copy();
    this.friction.mult(frictionVal);
    this.velocity.add(this.friction);
  };

  this.move = function(){
    if(this.pos.x < this.radius || this.pos.x > width-this.radius || this.pos.y < this.radius || this.pos.y > height-this.radius){
      this.bounce();
    }
    this.velocity.add(this.force);
    this.applyfriction();
    this.force.set(0,0);
    this.pos.add(this.velocity);
  };

  this.show = function(){
    ellipse(this.pos.x, this.pos.y, this.radius*2, this.radius*2);
  };

}
