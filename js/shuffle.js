var margin = 20,
    tablecolor,
    deck = [],
    deckSize = 8,
    slots = [],
    vals=[],
    board;

function setup() {
  createCanvas(600, 600);
  tablecolor = color(65,65,65);
  slots=[createVector(20, 20), createVector(170, 20), createVector(320, 20), createVector(470, 20), createVector(20, 300), createVector(170, 300), createVector(320, 300), createVector(470, 300)];
  board = new Board();
  vals = [1,1,2,2,3,3,4,4];
  for(var i=vals.length; i > 0; i--){
    var cv = vals.pop(i);
    //var pos = createVector(slots[i].x, slots[i].y);
        console.log(i + ' : ' + cv);
    card = new Card(cv, pos);
    deck.push(card);
  }

  board.refillValues();
}

function draw() {
  background(tablecolor);
  //targetCount = targets.length;
 for(var i=0; i<deckSize; i++){
    deck[i].update();
    deck[i].show();
  }

}

function Board(){
  this.shuffle = function(){
    var i = deck.length,
        j = 0,
        temp;
    while(i--){
      j = Math.floor(Math.random()*(i+1));
      temp = deck[i];
      deck[i] = deck[j];
      deck[j] = temp;
    }
  };
  this.refillValues = function(){
    vals = [1,1,2,2,3,3,4,4];
  };
}

function Card(i, origin){
  this.value = i;
  this.pos = origin;
  this.h = 260;
  this.w = 130;
  this.slot =
  this.flipped = false;
  this.matched = false;
  this.shade = color(this.value * 30, 50, 50);

  this.update = function(){
  //  this.pos = this.pos.add(origin);
  };

  this.show = function(){
    noStroke();
    fill(this.shade);
    rect(this.pos.x, this.pos.y, this.w, this.h);
  };


}
