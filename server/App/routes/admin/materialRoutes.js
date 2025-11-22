let express=require("express")
let materialRoutes=express.Router()
//http://localhost:8000/admin/material/create
materialRoutes.post('/create',(req,res)=>{
    res.send(
        {
            _status:true,
            _message:"material Added"
        }
    )
})

materialRoutes.get('/view',(req,res)=>{
    res.send(
        {
            _status:true,
            _message:"material Found"
        }
    )
})

materialRoutes.delete('/delete/:id',(req,res)=>{
    res.send(
        {
            _status:true,
            _message:"material Deleted"
        }
    )
})

materialRoutes.put('/update/:id',(req,res)=>{
    res.send(
        {
            _status:true,
            _message:"material Updated"
        }
    )
})




module.exports={materialRoutes}