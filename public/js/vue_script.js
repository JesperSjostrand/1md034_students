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
  this.selectedGender = document.querySelector('input[name="gender"]:checked').value;

  var items = [];

  for(var i = 0; i < menuLength; i++) {
    var checkBox = document.getElementById("burger" + i);
    if(checkBox.checked) {
      items.push(checkBox.value);
    }
  }

  this.order = items;
}

var socket = io();

var vm2 = new Vue({
  el: "#contact",
  data: {
    orders: {},
    currentOrder: { orderId: 0,
                    details: { x: 0, y: 0 },
                    orderItems: []},
    orderInfo: {}
  },
  created: function () {
    var div = document.getElementById("orderInfo");
    div.style.display = "block";

    socket.on('initialize', function (data) {
      this.orders = data.orders;
    }.bind(this));

    socket.on('currentQueue', function (data) {
      this.orders = data.orders;
    }.bind(this));
  },
  methods: {
    getNext: function () {
      var lastOrder = Object.keys(this.orders).reduce(function (last, next) {
        return Math.max(last, next);
      }, 0);
      return lastOrder + 1;
    },
    addOrder: function (event) {
      var newInfo = new formData(items.length);
      this.orderInfo = newInfo;
      console.log(this.orderInfo);


      this.currentOrder.orderId = this.getNext();
      this.currentOrder.orderItems = this.orderInfo.order;
      socket.emit("addOrder", this.currentOrder);
    },
    displayOrder: function (event) {
      var offset = { x: event.currentTarget.getBoundingClientRect().left,
                     y: event.currentTarget.getBoundingClientRect().top};
      this.currentOrder.details = { x: event.clientX - 10 - offset.x,
                                    y: event.clientY - 10 - offset.y };
    }


    // addOrder: function (event) {
    //   var offset = {x: event.currentTarget.getBoundingClientRect().left,
    //                 y: event.currentTarget.getBoundingClientRect().top};
    //   socket.emit("addOrder", { orderId: this.getNext(),
    //                             details: { x: event.clientX - 10 - offset.x,
    //                                        y: event.clientY - 10 - offset.y },
    //                             orderItems: ["Beans", "Curry"]
    //                           });
    // }
  }
});
