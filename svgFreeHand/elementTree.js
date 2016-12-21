function updateElementTree(element){
  var ul = document.getElementById("elementList");
  var li = document.createElement("li");
  li.appendChild(document.createTextNode(element));
  li.setAttribute("name", element+"TreeView"); // added line
  ul.appendChild(li);
}
