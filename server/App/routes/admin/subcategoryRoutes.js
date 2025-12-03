let express=require("express")
let multer=require("multer")
const { fileUpload } = require("../../middleware/fileUpload")
const { subcategoryCreate, subcategoryView, parentCategory } = require("../../controllers/admin/subCategoryController")

let subcategoryRoutes=express.Router()
let upload=fileUpload("uploads/subcategory")

subcategoryRoutes.post("/create", upload.single('subcategoryImage'),subcategoryCreate)
subcategoryRoutes.get("/view",subcategoryView)
subcategoryRoutes.get("/parent-category",parentCategory)




module.exports={subcategoryRoutes}