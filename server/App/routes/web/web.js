let express=require("express")
const { AuthRoutes } = require("./AuthRoutes")
let webRoute=express.Router()

webRoute.use("/user",AuthRoutes)


module.exports={webRoute}