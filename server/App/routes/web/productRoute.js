let express=require("express")
const { productDetails } = require("../../controllers/web/productController")



let productRoute=express.Router()

productRoute.get('/product-details/:slug',productDetails)
  



module.exports={productRoute}  