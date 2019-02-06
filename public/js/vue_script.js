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

var vm2 = new Vue({
  el: "#contact",
  data: {
    orderInfo: [""]
  },
  methods: {
    formSubmit: function () {
      var newInfo = getFormData(items.length);
      //Loop necessary to make Vue detect the changes
      for(var i = 0; i < newInfo.length; i++) {
        Vue.set(vm2.orderInfo, i, newInfo[i]);
      }
      console.log("Updated orderInfo: " + vm2.orderInfo);
    }
  }
})
