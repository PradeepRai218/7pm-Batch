let express=require("express")
const { addToCart, viewCart, changeQty, deleteCart } = require("../../controllers/web/cartController")

let cartRoutes=express.Router()


cartRoutes.post('/add-to-cart',addToCart)
cartRoutes.post('/view-cart',viewCart)

cartRoutes.post('/change-qty',changeQty)
cartRoutes.post('/delete',deleteCart)

module.exports={cartRoutes}