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
    },

    hasAllergens: function (burger) {
      return burger.allergens.length != 0;
    }
  }
})

