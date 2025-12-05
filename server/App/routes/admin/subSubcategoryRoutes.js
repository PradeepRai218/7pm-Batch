let express=require("express")

const { fileUpload } = require("../../middleware/fileUpload")
const { subSubcategoryCreate, subSubcategoryView, parentCategory, subCategory } = require("../../controllers/admin/subSubCategoryController")

let subSubcategoryRoutes=express.Router()
let upload=fileUpload("uploads/subsubcategory")

subSubcategoryRoutes.post("/create", upload.single('subSubcategoryImage'),subSubcategoryCreate)
subSubcategoryRoutes.get("/view",subSubcategoryView)
subSubcategoryRoutes.get("/parent-category",parentCategory)
subSubcategoryRoutes.get("/sub-category/:parentid",subCategory)




module.exports={subSubcategoryRoutes}