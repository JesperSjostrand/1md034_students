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

function getRow(index) {
  return Math.floor(index / 3) + 1;
}

function getColumn(index) {
  return (index % 3) + 1;
}

var vm = new Vue({
  el: "#burgerMenu",
  data: {
    burgers:  burgers
  },
  methods: {
    getGridPos: function (index) {
      return "grid-row: " + getRow(index) + "; grid-collumn: " + getColumn(index) + ";";
    }
  }
})

