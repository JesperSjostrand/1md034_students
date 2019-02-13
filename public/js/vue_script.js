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
function formData(menuLength) {
  this.name = document.getElementById("name").value;
  this.email = document.getElementById("email").value;
  this.payment = document.getElementById("payment").value;
  this.gender = document.querySelector('input[name="gender"]:checked').value;
  this.items = [];

  for(var i = 0; i < menuLength; i++) {
    var checkBox = document.getElementById("burger" + i);
    if(checkBox.checked) {
      this.items.push(checkBox.value);
    }
  }
}

var socket = io();

var vm2 = new Vue({
  el: "#contact",
  data: {
    id: 0,
    order: {
      id: -1,
      position: {
        x: -100,
        y: -100
      },
      info: {}
    },
  },
  created: function () {
    var div = document.getElementById("orderInfo");
    div.style.display = "block";
  },
  methods: {
    getId: function () {
      this.id++;
      return this.id;
    },
    addOrder: function (event) {
      this.order.id = this.getId();
      this.order.info = new formData(items.length);
      socket.emit("addOrder", this.order);
    },
    displayOrder: function (event) {
      var offset = { x: event.currentTarget.getBoundingClientRect().left,
                     y: event.currentTarget.getBoundingClientRect().top};

      this.order.position = { x: event.clientX - 10 - offset.x,
                              y: event.clientY - 10 - offset.y };
    }
  }
});
