let express=require("express")
const { colorCreate, colorView, colorDelete, multiDelete } = require("../../controllers/admin/colorController")
let colorRoutes=express.Router()
//http://localhost:8000/admin/color/create
colorRoutes.post('/create',colorCreate)

colorRoutes.get('/view',colorView)

colorRoutes.delete('/delete/:id',colorDelete)


colorRoutes.post('/multidelete',multiDelete)





module.exports={colorRoutes}