let express=require("express")
const { AuthRoutes } = require("./AuthRoutes")
const homeRouter = require("./homeRoutes")
const { productRoute } = require("./productRoute")
const { cartRoutes } = require("./cartRoute")
const { orderRouter } = require("./orderRoutes")
let webRoute=express.Router()

webRoute.use("/user",AuthRoutes)
webRoute.use("/home-api",homeRouter)
webRoute.use("/product",productRoute)
webRoute.use("/cart",cartRoutes)
webRoute.use("/order",orderRouter)


module.exports={webRoute}