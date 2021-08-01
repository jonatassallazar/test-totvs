// connection.js
const mongoose = require("mongoose");
const Clientes = require("../models/Clientes.model")
const faker = require("faker/locale/pt_BR");
const moment = require("moment");

function randomIntFromInterval(min, max) {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
}

async function seedDB() {
  const connectionUri = "mongodb://localhost:27017/test-totvs-db";
  
  await mongoose.connect(connectionUri, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  });

  try {
    await Clientes.deleteMany({});

    let timeSeriesData = [];
    for (let i = 0; i < 100; i++) {
      const nome = faker.name.firstName() + " " + faker.name.lastName();
      let newClient = {
        dataVencimento: moment("2021-07-01").add(i, "day").valueOf(),
        valor: randomIntFromInterval(10000, 50000),
        nome,
      };

      timeSeriesData.push(newClient);
    }
    Clientes.insertMany(timeSeriesData)
    console.log("Database seeded! :)");
  } catch (err) {
    console.log(err.stack);
  }
}

seedDB();

module.exports = seedDB;
