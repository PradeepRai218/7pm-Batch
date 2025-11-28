let express=require("express")
let multer=require("multer")
const { categoryCreate, categoryView } = require("../../controllers/admin/categoryController")
let categoryRoutes=express.Router()

// let upload=multer({dest:"uploads/category"}) //Full Control
//upload.single()
//upload.field()

let storage=multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,"uploads/category")
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname) //25555588881.jpg //25555588891.jpg
    }
})

let upload=multer({storage:storage})

categoryRoutes.post("/create", upload.single('categoryImage'),categoryCreate)
categoryRoutes.get("/view",categoryView)



module.exports={categoryRoutes}