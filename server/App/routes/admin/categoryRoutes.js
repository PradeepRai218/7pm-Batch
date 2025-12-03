let express=require("express")
let multer=require("multer")
const { categoryCreate, categoryView } = require("../../controllers/admin/categoryController")
const { fileUpload } = require("../../middleware/fileUpload")
let categoryRoutes=express.Router()

// let upload=multer({dest:"uploads/category"}) //Full Control
//upload.single()
//upload.field()

let upload=fileUpload("uploads/category")


categoryRoutes.post("/create", upload.single('categoryImage'),categoryCreate)
categoryRoutes.get("/view",categoryView)



module.exports={categoryRoutes}