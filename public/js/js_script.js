function Burger(name, pictureURL, allergens) {
  this.name = name;
  this.pictureURL = pictureURL;
  this.allergens = allergens;

  this.hasAllergens = function() {
    return allergens.length != 0;
  }
}

var burgers = [
  new Burger("Standard burger", 
    "https://www.simplyrecipes.com/wp-content/uploads/2018/06/HT-Grill-Burger-LEAD-VERTICAL.jpg", 
    ["gluten"]),

  new Burger("Budget burger", 
    "https://cdn.arstechnica.net/wp-content/uploads/2018/08/IF-Burger-800x603.jpg", 
    ["gluten", "lactose"]),

  new Burger("Deluxe burger", 
    "https://www.tasteofhome.com/wp-content/uploads/2018/01/Gruyere-and-Egg-Burgers_EXPS_THAM18_192202_B12_12_1b-1-696x696.jpg", 
    ["lactose", "egg"])
]

function constructMenuItem(burger, index) {
  var div = document.createElement("div");
  div.classList.add("burger")
  div.style.gridColumn = index + 1;

  var header = document.createElement("h3");
  header.appendChild(document.createTextNode(burger.name));
  div.appendChild(header);

  var img = document.createElement("img");
  img.classList.add("burgerimg");
  img.src = burger.pictureURL;
  img.alt = burger.name;
  div.append(img);

  if(burger.hasAllergens()){
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
