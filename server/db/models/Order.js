const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  open: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
});

module.exports = Order;
