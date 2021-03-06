const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

//Import routes
const routes = require("./routes/route");

//Database connection
mongoose.connect(
  process.env.DB_CONNECTION,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => {
    console.log("Connected to DB Successfully");
  }
);

//Middlewares
app.use(express.json());

//Route Middlewares
app.use("/users", routes);

//Routes
app.get("/", (req, res) => {
  res.send("We are on the homepage");
});

//Start server on this port
app.listen(3000, () => console.log("Server started on port 3000"));
