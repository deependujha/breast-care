require('dotenv').config();

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/test').then(()=>{
      console.log("Connected To Database");
}).catch((err)=>{
      console.log(err);
});