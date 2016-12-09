function HexTile(){
  this.isHovered;
  this.isFilled;
  this.walls = {"wall1":0, "wall2": 0, "wall3": 0, "wall4":0, "wall5": 0, "wall6": 0}
  this.center;
  this.construct = function(coords, center){
    this.center = center;
    for(var i=0; i<coords.length; i++){
      this[walls][wall+(i+1)] = coords[i];
    }
  }
}
