const express = require("express");
const { adminRoutes } = require("./App/routes/admin/adminRoutes");
let mongoose = require("mongoose");
let App = express();
let cors=require("cors")
App.use(cors())
require("dotenv").config();
App.use(express.json());

App.use("/admin", adminRoutes);
//http://localhost:8000/admin
//DB+Connection
mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DBNAME}`).then(() => {
  
    App.listen(process.env.PORT, () => {
    console.log("Server Start", process.env.PORT);
  });

  

});
//http://localhost:8000
