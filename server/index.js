const express = require("express");
const { adminRoutes } = require("./App/routes/admin/adminRoutes");
let mongoose = require("mongoose");
let App = express();
let cors=require("cors");
const { webRoute } = require("./App/routes/web/web");
App.use(cors())
require("dotenv").config();
App.use(express.json());
App.use("/uploads/category",express.static("uploads/category"))
App.use("/uploads/subcategory",express.static("uploads/subcategory"))
App.use("/uploads/subsubcategory",express.static("uploads/subsubcategory"))
App.use("/uploads/products",express.static("uploads/products"))
App.use("/uploads/users",express.static("uploads/users"))
//Frontend mai permission
// App.use("/uploads/slider",express.static("uploads/slider")) //Frontend mai permission
// App.use("/uploads/product",express.static("uploads/product")) //Frontend mai permission
 
App.use("/admin", adminRoutes);
//http://localhost:8000/admin
//DB+Connection
App.use("/web", webRoute);


mongoose.connect(`mongodb://127.0.0.1:27017/${process.env.DBNAME}`).then(() => {
  
    App.listen(process.env.PORT, () => {
    console.log("Server Start", process.env.PORT);
  });

  

});
//http://localhost:8000
