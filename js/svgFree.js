var globals = {
                "isDrawing": false,
                "points" : [],
                "drawing" : [],
                "currDraw" : "",
                "smoothing": "4",
                "currentElement" : 0
              };


///Event listeners
window.addEventListener("load", function(){
  globals.currDraw = document.getElementById("svgPort").innerHTML;
});

document.getElementById("svgPort").addEventListener("mousedown", startDraw);
document.getElementById("svgPort").addEventListener("mouseup", endDraw);
document.getElementById("svgPort").addEventListener("mousemove", collectPoints);

function startDraw(){
  globals.isDrawing = true;
  globals.currDraw = document.getElementById("svgPort").innerHTML;
}

function endDraw(){
  var thisDraw = document.getElementById("currentDrawing");
  thisDraw.setAttribute("points", "0,300 300,300");
  var poly = "";
  for(var i=0; i<globals.points.length; i++){
    if(i===0 || i===globals.points.length-1 || i%globals.smoothing === 0){
      poly = poly + globals.points[i];
    }
  }
  poly = "<polyline id='el" + globals.currentElement + "' points='" + poly + "' style='stroke:black; stroke-width:1; fill: none' />";
  globals.drawing.push(globals.points);
  globals.points = [];
  document.getElementById("svgPort").innerHTML = globals.currDraw + poly;
  globals.currentElement +=1;
  globals.isDrawing = false;
}

function collectPoints(){
  if(globals.isDrawing){
    var point = " " + event.clientX + "," + event.clientY;
    globals.points.push(point);
  }
  refreshDraw();
}

function refreshDraw(){
    var thisDraw = document.getElementById("currentDrawing");
    var poly = thisDraw.getAttribute("points");
    var i = globals.points.length-1;
    if(globals.points.length<2){
      poly = poly;
    } else if(globals.points.length===2){
      poly = "";
      poly = globals.points[0] + " " + globals.points[1];
    } else {
      for(var i=1; i<globals.points.length-1; i++){
        poly = poly + globals.points[i];
      }
    }
    thisDraw.setAttribute("points", poly);
}
