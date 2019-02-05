function hasAllergens(burger) {
  return burger.allergens.length != 0;
}

function calculateRow(index) {
  return Math.floor(index / 3) + 1;
}

function calculateColumn(index) {
  return (index % 3) + 1;
}

function constructMenuItem(burger, index) {
  var div = document.createElement("div");
  div.classList.add("burger")
  div.style.gridColumn = calculateColumn(index);
  div.style.gridRow = calculateRow(index);

  var header = document.createElement("h3");
  header.appendChild(document.createTextNode(burger.name));
  div.appendChild(header);

  var img = document.createElement("img");
  img.classList.add("burgerimg");
  img.src = burger.imgURL;
  img.alt = burger.name;
  div.append(img);

  if(hasAllergens(burger)){
    var allergies = document.createElement("div");
    div.classList.add("allergies");

    var list = document.createElement("ul");

    for(var i in burger.allergens) {
      var elem = document.createElement("li");
      var text = document.createTextNode("Contains " + burger.allergens[i]);
      elem.appendChild(text);
      list.appendChild(elem);
    }

    allergies.appendChild(list);
    div.appendChild(allergies);
  }

  return div;
}

// ---------- EXECUTION STARTS HERE ----------
var menu = document.getElementById("burgerMenu");

for(var i in burgers) {
  var menuItem = constructMenuItem(burgers[i], i);
  menu.appendChild(menuItem);
}
