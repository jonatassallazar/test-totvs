const mongoose = require("mongoose");

const clientesSchema = new mongoose.Schema({
  id: {
    type: String,
  },
  nome: {
    type: String,
  },
  valor: {
    type: Number,
  },
  dataVencimento: {
    type: Number,
  },
});

const Clientes = mongoose.model("clientes", clientesSchema);

module.exports = Clientes;
