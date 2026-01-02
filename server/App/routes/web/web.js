let express=require("express")
const { AuthRoutes } = require("./AuthRoutes")
const homeRouter = require("./homeRoutes")
const { productRoute } = require("./productRoute")
let webRoute=express.Router()

webRoute.use("/user",AuthRoutes)
webRoute.use("/home-api",homeRouter)
webRoute.use("/product",productRoute)


module.exports={webRoute}