const express = require("express");
const app = express();
const connectDb = require("./src/db/connection");
const Clientes = require("./src/models/Clientes.model");
const cors = require("cors");
const moment = require("moment");

app.use(cors());

app.get("/", (req, res) => {
  res.send("Utilize o caminho /clientes-inadimplentes para acessar a lista dos Clientes com data de pagamento vencidas");
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
