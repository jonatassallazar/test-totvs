// connection.js
const mongoose = require("mongoose");

const connection = "mongodb://mongo:27017/test-totvs-db";

const connectDb = () => {
  return mongoose.connect(connection, {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false,
  });
};

module.exports = connectDb;
