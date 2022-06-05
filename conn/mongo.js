require("dotenv").config();

const mongoose = require("mongoose");
mongoose
  .connect(
    `mongodb+srv://${process.env.ATLAS_USERNAME}:${process.env.ATLAS_PASSWORD}@cluster0.sz49gmb.mongodb.net/?retryWrites=true&w=majority`
  )
  .then(() => {
    console.log("Connected To Database");
  })
  .catch((err) => {
    console.log(err);
  });
