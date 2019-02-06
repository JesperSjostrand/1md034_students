// ---------- GENERATING THE MENU  ----------

// NOTE: menuItem and getMenu serve no purpose since the data is already in the correct format in menu.js
// They are only kept here because the instructions said so.
function menuItem(name, imgURL, allergens) {
  this.name = name;
  this.imgURL = imgURL;
  this.allergens = allergens;
}

function getMenu() {
  return [
    new menuItem("Standard burger",
      "https://www.simplyrecipes.com/wp-content/uploads/2018/06/HT-Grill-Burger-LEAD-VERTICAL.jpg",
      ["gluten"]),

    new menuItem("Budget burger",
      "https://cdn.arstechnica.net/wp-content/uploads/2018/08/IF-Burger-800x603.jpg",
      ["gluten", "lactose"]),

    new menuItem("Deluxe burger",
      "https://www.tasteofhome.com/wp-content/uploads/2018/01/Gruyere-and-Egg-Burgers_EXPS_THAM18_192202_B12_12_1b-1-696x696.jpg",
      ["lactose", "egg"]),

    new menuItem("Vegan burger",
      "https://www.connoisseurusveg.com/wp-content/uploads/2016/01/vegan-meatloaf-burger-1.jpg",
      ["gluten"]),

    new menuItem("Salad",
      "https://mittkok.expressen.se/wp-content/uploads/2013/05/recept.8187.460x345-700x700.jpg",
      [])
  ];
}



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

  var checkDiv = document.createElement("div");
  checkDiv.appendChild(document.createTextNode("Order:"));
  var checkBox = document.createElement("input");
  checkBox.type = "checkBox";
  checkBox.id = "burger" + index;
  checkBox.value = burger.name;
  checkDiv.appendChild(checkBox);
  div.appendChild(checkDiv);

  var img = document.createElement("img");
  img.classList.add("burgerimg");
  img.src = burger.imgURL;
  img.alt = burger.name;
  div.append(img);

  if(hasAllergens(burger)){
    var allergies = document.createElement("div");
    allergies.classList.add("allergies");

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

function generateMenu(burgers) {
  var menuDiv = document.getElementById("burgerMenu");

  for(var i in burgers) {
    var menuItem = constructMenuItem(burgers[i], i);
    menuDiv.appendChild(menuItem);
  }
}

// ---------- EXECUTION STARTS HERE ----------
// Switch between these to change if menu.js or getMenu() is used
// generateMenu(getMenu());
generateMenu(items);

// ---------- FORM SUBMISSION ----------
function getFormData(menuLength) {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var street = document.getElementById("street").value;
  var house = document.getElementById("house").value;
  var payment = document.getElementById("payment").value;

  var genders = document.getElementsByName('gender');
  var selectedGender;

  for (var i in genders)
  {
    if (genders[i].checked)
    {
      selectedGender = genders[i].id;
      selectedGender = (selectedGender == "no") ? "Do not wish to provide" : selectedGender;
      break;
    }
  }

  var order = [];

  for(var i = 0; i < menuLength; i++) {
    var checkBox = document.getElementById("burger" + i);
    if(checkBox.checked) {
      order.push(checkBox.value);
    }
  }

  return [name, email, street, house, payment, selectedGender, order];
}

var button = document.getElementById("formButton");
button.onclick = function () {
  var div = document.getElementById("orderInfo");
  div.innerHTML = "";

  var orderInfo = getFormData(items.length);

  for(var i in orderInfo) {
    div.appendChild(document.createTextNode(orderInfo[i]));
    div.appendChild(document.createElement("br"));
  }
}
