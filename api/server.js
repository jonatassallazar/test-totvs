const express = require("express");
const app = express();
const connectDb = require("./src/db/connection");
const Clientes = require("./src/models/Clientes.model");
const cors = require("cors");
const moment = require("moment");

app.use(cors());

app.get("/", (req, res) => {
  const dataDia = new Date();
  res.send(JSON.stringify(`${dataDia}`));
});

app.get("/clientes-inadimplentes", async (req, res) => {
  const nowUnix = moment.now().valueOf();

  const clientesInadimplentes = [];

  try {
    await Clientes.find({}, (err, docs) => {
      const filtered = docs.filter((a) => a.dataVencimento < nowUnix);
      clientesInadimplentes.push(filtered);
    });
    res.json(clientesInadimplentes);
  } catch (err) {
    console.log("Error:", err);
  }
});

app.listen(process.env.PORT, function () {
  console.log(`Listening on ${process.env.PORT}`);

  connectDb().then(() => {
    console.log("MongoDb connected");
  });
});
