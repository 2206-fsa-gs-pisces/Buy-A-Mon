"use strict";

const {
  db,
  models: { User, Order, Item, OrderItem },
} = require("../server/db");

("use strict");
const pokedex = require("./pokedata");
// import pokedex from "./pokedata";

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
  await db.sync({ force: true }); // clears db and matches models to tables

  console.log("db synced!");

  // Creating Users
  const user = await Promise.all([
    User.create({
      firstName: "mark",
      lastName: "pham",
      email: "markpham@yahoo.com",
      password: "123",
      address: "7252 Court St. Middleburg, FL 32068",
      role: "admin",
    }),
    User.create({
      firstName: "john",
      lastName: "pham",
      email: "johnpham@yahoo.com",
      password: "123",
      address: "45 N. High Noon Ave.Fairfax, VA 22030",
    }),
    User.create({
      firstName: "steven",
      lastName: "pham",
      email: "stevenpham@yahoo.com",
      password: "123",
      address: "857 Oak Valley Rd. Wakefield, MA 01880",
    }),
    User.create({
      firstName: "nick",
      lastName: "angel",
      email: "nickangel@yahoo.com",
      password: "123",
      role: "admin",
    }),
    User.create({
      firstName: "cody",
      lastName: "jackson",
      email: "codyjackson@gmail.com",
      password: "123",
    }),
    User.create({
      firstName: "cliff",
      lastName: "brown",
      email: "cb@yahoo.com",
      password: "123",
    }),
    User.create({
      firstName: "john",
      lastName: "smith",
      email: "johnsmith@yahoo.com",
      password: "123",
    }),
    User.create({
      firstName: "miles",
      lastName: "davis",
      email: "md@gmail.com",
      password: "123",
    }),
    User.create({
      firstName: "silly",
      lastName: "name",
      email: "silly@yahoo.com",
      password: "123",
    }),
    User.create({
      firstName: "voldemort",
      lastName: "riddle",
      email: "marvolo@yahoo.com",
      password: "horcrux!",
    }),
    User.create({
      firstName: "joe",
      lastName: "biden",
      email: "potus@gmail.com",
      password: "password123",
    }),
    User.create({
      firstName: "holly",
      lastName: "brown",
      email: "hb@yahoo.com",
      password: "456",
    }),
    User.create({
      firstName: "ron",
      lastName: "swanson",
      email: "wood@yahoo.com",
      password: "DuckHunter",
    }),
    User.create({
      firstName: "swag",
      lastName: "lord",
      email: "coolcat420@gmail.com",
      password: "SwagLmao6969",
    }),
    User.create({
      firstName: "nils",
      lastName: "frahm",
      email: "nils@hotmail.com",
      password: "AllMelody$@#",
    }),
    User.create({
      firstName: "nelson",
      lastName: "cheng-lin",
      email: "nelsonchenglin@hotmail.com",
      password: "123",
      role: "admin",
    }),
    User.create({
      firstName: "brian",
      lastName: "lee",
      email: "brianlee@hotmail.com",
      password: "123",
      role: "admin",
    }),
  ]);

  console.log(`seeded ${user.length} users`);

  // Creating Orders
  const orders = await Promise.all([
    //creates two empty orders
    Order.create(),
    Order.create(),
  ]);

  console.log(`seeded ${orders.length} orders`);

  // Creating Items

  let items = await Promise.all(
    pokedex.map(async (item) => {
      return Item.create({
        name: item.name.english,
        //price: 1,
        price: Math.floor(Math.random() * (10 * 1000 - 1 * 100) + 1 * 100),
        description: item.description,
        imageUrl: item.image.hires,
      });
    })
  );

  console.log(`seeded ${items.length} items`);

  //testing thorugh table and associations
  const mark = user[0];
  const bulb = items[0];
  const ivy = items[1];
  const order1 = orders[0];
  // add one bulb to order1
  await bulb.addOrder(order1, {
    through: { qty: 1, price: bulb.price, totalPrice: bulb.price * 1 },
  });
  // add two ivy to order1
  await ivy.addOrder(order1, {
    through: { qty: 2, price: ivy.price, totalPrice: ivy.price * 2 },
  });
  // set owner of order1 to mark
  await order1.setUser(mark);

  const person = user[1];
  const item1 = items[69];
  const item2 = items[70];
  const item3 = items[71];
  const order2 = orders[1];
  await item1.addOrder(order2, {
    through: { qty: 1, price: item1.price, totalPrice: item1.price * 1 },
  });
  await item2.addOrder(order2, {
    through: { qty: 2, price: item2.price, totalPrice: item2.price * 2 },
  });
  await item3.addOrder(order2, {
    through: { qty: 7, price: item3.price, totalPrice: item3.price * 7 },
  });
  //add a bulb to order 2 to check if editing/deleting from cart 1 affects cart two
  await bulb.addOrder(order2, {
    through: { qty: 1, price: bulb.price, totalPrice: bulb.price * 1 },
  });
  await order2.setUser(person);

  // testing eager loading

  // attempting to console.log each mon in order1
  // const order1Contents = await OrderItem.findAll({
  //   where: {
  //     orderId: 1,
  //   },
  // });
  // await Promise.all(
  //   order1Contents.map(async item => {
  //     const prod = await Item.findByPk(item.itemId);
  //     // works so gonna stop logging everytime we seed
  //     // console.log(prod);
  //     return prod;
  //   })
  // );

  console.log(`seeded successfully`);
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
  console.log("seeding...");
  try {
    await seed();
  } catch (err) {
    console.error(err);
    process.exitCode = 1;
  } finally {
    console.log("closing db connection");
    await db.close();
    console.log("db connection closed");
  }
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/

if (module === require.main) {
  runSeed();
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed;
