const Sequelize = require("sequelize");
const db = require("../db");

const Item = db.define("item", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
  },
  price: {
    type: Sequelize.INTEGER,
    allowNull: false,
    validate: {
      min: 0,
    },
  },
  imageUrl: {
    type: Sequelize.TEXT,
    defaultValue:
      "https://ecdn.teacherspayteachers.com/thumbitem/Pokemon-Theme-Amazing-Work-Coming-Soon-Signs-7112257-1628095729/original-7112257-1.jpg",
  },
  description: {
    type: Sequelize.TEXT,
    defaultValue: "coming soon",
  },
});

module.exports = Item;
