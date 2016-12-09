
var flock;
var counter = 1;

var textBlock;
var fr;

function setup() {
  createCanvas(640,360);
  createP("Drag the mouse to generate new boids.");

  flock = new Flock();
  // Add an initial set of boids into the system
  for (var i = 0; i < 25; i++) {
    var b = new Boid(random(1,width),random(0,height));
    flock.addBoid(b);
  }
}
 
function draw() {
  textBlock = flock.boids.length;
  fr = frameRate();
  background(51);
  flock.cull();
  flock.run();
  push();
  noStroke();
  fill(255);
  text(textBlock + " , " + counter + " , " + fr, 15, 15);
  pop();

}

// Add a new boid into the System
function mouseDragged() {
  flock.addBoid(new Boid(mouseX,mouseY));
}

function mouseClicked(){
  flock.boids.pop(random(0,10));
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Flock object
// Does very little, simply manages the array of all the boids

function Flock() {
  // An array for all the boids
  this.boids = []; // Initialize the array
  this.cull = function(){
    for (var i = 0; i < this.boids.length; i++) {
      if(this.boids[i].health < 1){
        console.log("somebody died: " + this.boids[i].id);
        this.boids.splice(i, 1);
       }
  // Passing the entire list of boids to each boid individually
    }
  };

}

Flock.prototype.run = function() {
  for (var i = 0; i < this.boids.length; i++) {
    this.boids[i].run(this.boids);  // Passing the entire list of boids to each boid individually
  }
}

Flock.prototype.addBoid = function(b) {
  this.boids.push(b);
      counter++;
}

// The Nature of Code
// Daniel Shiffman
// http://natureofcode.com

// Boid class
// Methods for Separation, Cohesion, Alignment added

function Boid(x,y) {
  this.id = counter;
  this.acceleration = createVector(0,0);
  this.velocity = createVector(random(-1,1),random(-1,1));
  this.position = createVector(x,y);
  this.r = 3.0;
  this.maxspeed = floor(random(1,3));    // Maximum speed
  this.maxforce = 0.05; // Maximum steering force
  //this.skinTone = floor(random(50, 175));
  this.health = 200;
  this.fightOrFuck = false;
  this.attack = floor(random(1,10));
  this.aggression = floor(random(1, 100));
  this.skinTone = floor(random(0, 255));
  this.socialbubble = 100 - this.aggression;
  this.mate = function(boid){
    var b = new Boid(this.position.x,this.position.y);
    flock.addBoid(b);
    console.log("somebody boinked!");
  };
}

Boid.prototype.run = function(boids) {
  this.flock(boids);
  this.update();
  this.borders();
  this.render();
}

Boid.prototype.applyForce = function(force) {
  // We could add mass here if we want A = F / M
  this.acceleration.add(force);
}

// We accumulate a new acceleration each time based on three rules
Boid.prototype.flock = function(boids) {
  var sep = this.separate(boids);   // Separation
  var ali = this.align(boids);      // Alignment
  var coh = this.cohesion(boids);   // Cohesion
  // Arbitrarily weight these forces
  sep.mult(1.5);
  ali.mult(1.0);
  coh.mult(1.0);
  // Add the force vectors to acceleration
  this.applyForce(sep);
  this.applyForce(ali);
  this.applyForce(coh);
}

// Method to update location
Boid.prototype.update = function() {
  // Update velocity
  this.velocity.add(this.acceleration);
  // Limit speed
  this.velocity.limit(this.maxspeed);
  this.position.add(this.velocity);
  // Reset accelertion to 0 each cycle
  this.acceleration.mult(0);
}

// A method that calculates and applies a steering force towards a target
// STEER = DESIRED MINUS VELOCITY
Boid.prototype.seek = function(target) {
  var desired = p5.Vector.sub(target,this.position);  // A vector pointing from the location to the target
  // Normalize desired and scale to maximum speed
  desired.normalize();
  desired.mult(this.maxspeed);
  // Steering = Desired minus Velocity
  var steer = p5.Vector.sub(desired,this.velocity);
  steer.limit(this.maxforce);  // Limit to maximum steering force
  return steer;
}

Boid.prototype.render = function() {
  // Draw a triangle rotated in the direction of velocity
  var theta = this.velocity.heading() + radians(90);
  fill(this.aggression, this.skinTone, this.skinTone);
  stroke(200);
  push();
  translate(this.position.x,this.position.y);
  rotate(theta);
  beginShape();
  vertex(0, -this.r*2);
  vertex(-this.r, this.r*2);
  vertex(this.r, this.r*2);
  endShape(CLOSE);
  pop();
}

// Wraparound
Boid.prototype.borders = function() {
 // if (this.position.x < -this.r)  this.position.x = width +this.r;
 // if (this.position.y < -this.r)  this.position.y = height+this.r;
 // if (this.position.x > width +this.r) this.position.x = -this.r;
 // if (this.position.y > height+this.r) this.position.y = -this.r;

  if (this.position.x < -width)  this.position.x = width * 2 ;
  if (this.position.x > width * 2) this.position.x = -width;
  if (this.position.y < -height) this.position.y = height * 2;
  if (this.position.y > height * 2) this.position.y = -height;
}

// Separation
// Method checks for nearby boids and steers away
Boid.prototype.separate = function(boids) {
  var desiredseparation = this.socialbubble;
  var steer = createVector(0,0);
  var count = 0;
  //this.fightOrFuck = false;
  // For every boid in the system, check if it's too close
  for (var i = 0; i < boids.length; i++) {
    var d = p5.Vector.dist(this.position,boids[i].position);
    // If the distance is greater than 0 and less than an arbitrary amount (0 when you are yourself)
    if ((d > 0) && (d < desiredseparation)) {
      // fuck or fight check
      if(d<5){
        var aggressionFactor = (this.aggression + boids[i].aggression)/2;
        var socialCheck = (this.social + boids[i].social)/2
      if(!this.fightOrFuck){
              if(aggressionFactor > socialCheck){
        this.health = this.health - boids[i].attack;
        boids[i].health = boids[i].health - this.attack;
        this.fightOrFuck = true;
        boids[i].fightOrFuck = true;
        console.log("Fight! " + this.id + " : " + this.health + " | " + boids[i].id + " : " + boids[i].health);
      }
    //   else {
     //   this.mate(boids[i]);
     //  this.fightOrFuck = true;
     //  boids[i].fightOrFuck = true;
     // }
      }

      }


      // Calculate vector pointing away from neighbor
      var diff = p5.Vector.sub(this.position,boids[i].position);
      diff.normalize();
      diff.div(d);        // Weight by distance
      steer.add(diff);
      count++;            // Keep track of how many
    }
    this.fightOrFuck = false;
  }
  // Average -- divide by how many
  if (count > 0) {
    steer.div(count);
  }

  // As long as the vector is greater than 0
  if (steer.mag() > 0) {
    // Implement Reynolds: Steering = Desired - Velocity
    steer.normalize();
    steer.mult(this.maxspeed);
    steer.sub(this.velocity);
    steer.limit(this.maxforce);
  }
  return steer;
}

// Alignment
// For every nearby boid in the system, calculate the average velocity
Boid.prototype.align = function(boids) {
  var neighbordist = 50;
  var sum = createVector(0,0);
  var count = 0;
  for (var i = 0; i < boids.length; i++) {
    var d = p5.Vector.dist(this.position,boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].velocity);
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    sum.normalize();
    sum.mult(this.maxspeed);
    var steer = p5.Vector.sub(sum,this.velocity);
    steer.limit(this.maxforce);
    return steer;
  } else {
    return createVector(0,0);
  }
}

// Cohesion
// For the average location (i.e. center) of all nearby boids, calculate steering vector towards that location
Boid.prototype.cohesion = function(boids) {
  var neighbordist = 50;
  var sum = createVector(0,0);   // Start with empty vector to accumulate all locations
  var count = 0;
  for (var i = 0; i < boids.length; i++) {
    var d = p5.Vector.dist(this.position,boids[i].position);
    if ((d > 0) && (d < neighbordist)) {
      sum.add(boids[i].position); // Add location
      count++;
    }
  }
  if (count > 0) {
    sum.div(count);
    return this.seek(sum);  // Steer towards the location
  } else {
    return createVector(0,0);
  }
}
