let express=require("express")

const { fileUpload } = require("../../middleware/fileUpload")
const { parentCategory, productView, productCreate, subCategory, subsubCategory, getColor, productDetails } = require("../../controllers/admin/productController")

let productRoutes=express.Router()
let upload=fileUpload("uploads/products")

productRoutes.post(
    "/create", 
    upload.fields([
        {
            name:'productImage',
            maxCount:1
        },
        {
            name:'productbackImage',
            maxCount:1
        },
        {
            name:'productGallery',
            maxCount:10
        }
    ]),
    productCreate
)
productRoutes.get("/view",productView)
productRoutes.get("/parent-category",parentCategory)
productRoutes.get("/sub-category/:parentid",subCategory)

productRoutes.get("/sub-sub-category/:parentid",subsubCategory)
productRoutes.get("/color",getColor)


productRoutes.get("/details/:id",productDetails)

module.exports={productRoutes}