// ---------- GENERATING THE MENU  ----------
function getRow(index) {
  return Math.floor(index / 3) + 1;
}

function getColumn(index) {
  return (index % 3) + 1;
}

var vm1 = new Vue({
  el: "#burgerMenu",
  data: {
    burgers: items
  },
  methods: {
    getGridPos: function (index) {
      return "grid-row: " + getRow(index) + "; grid-collumn: " + getColumn(index) + ";";
    },

    hasAllergens: function (burger) {
      return burger.allergens.length != 0;
    },

    burgerId: function (index) {
      return "burger" + index;
    }
  }
})


// ---------- FORM SUBMISSION ----------
function readFormData(menuLength) {
  var name = document.getElementById("name").value;
  var email = document.getElementById("email").value;
  var payment = document.getElementById("payment").value;
  var selectedGender = document.querySelector('input[name="gender"]:checked').value;

  var order = [];

  for(var i = 0; i < menuLength; i++) {
    var checkBox = document.getElementById("burger" + i);
    if(checkBox.checked) {
      order.push(checkBox.value);
    }
  }

  return [name, email, payment, selectedGender, order];
}

var vm2 = new Vue({
  el: "#submit",
  data: {
    orderInfo: [""]
  },
  created: function () {
    var div = document.getElementById("orderInfo");
    div.style.display = "block";
  },
  methods: {
    formSubmit: function () {
      var newInfo = readFormData(items.length);

      //Loop necessary to make Vue detect the changes
      for(var i = 0; i < newInfo.length; i++) {
        Vue.set(vm2.orderInfo, i, newInfo[i]);
      }
    }
  }
})
