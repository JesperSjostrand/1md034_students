/*jslint es5:true, indent: 2 */
/*global Vue, io */
/* exported vm */
'use strict';
var socket = io();

var vm = new Vue({
  el: '#dots',
  data: {
    orders: {},
    currentOrder: {
      orderId: -1,
      details: {
        x: -100,
        y: -100
      },
      orderItems: []
    }
  },
  created: function () {
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
    // addOrder: function (event) {
    //   var offset = {x: event.currentTarget.getBoundingClientRect().left,
    //                 y: event.currentTarget.getBoundingClientRect().top};
    //   socket.emit("addOrder", { orderId: this.getNext(),
    //                             details: { x: event.clientX - 10 - offset.x,
    //                                        y: event.clientY - 10 - offset.y },
    //                             orderItems: ["Beans", "Curry"]
    //                           });
    // },
    addOrder: function (event) {
      this.currentOrder.orderId = this.getNext();
      this.currentOrder.orderItems = ["Beans", "Curry"];
      socket.emit("addOrder", this.currentOrder);
    },
    displayOrder: function (event) {
      var offset = { x: event.currentTarget.getBoundingClientRect().left,
                     y: event.currentTarget.getBoundingClientRect().top};
      this.currentOrder.details = { x: event.clientX - 10 - offset.x,
                               y: event.clientY - 10 - offset.y };
    }
  }
});
