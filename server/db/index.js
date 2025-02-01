// ℹ️ package responsible to make the connection with mongodb
// https://www.npmjs.com/package/mongoose
const mongoose = require("mongoose");

// GET THE MongoDB URI from .env 
const MONGODB_URI = process.env.MONGODB_URI;

// CONNECT TO MONGODB
mongoose
  .connect(MONGODB_URI)
  .then((res) =>
    console.log(
      `Connected to Mongo! Database name: "${res.connections[0].name}"`
    )
  )
  .catch((err) => console.error("Error connecting to mongo", err));
