
let multer=require("multer")
let fileUpload=(folderName)=> {

    let storage= multer.diskStorage({
    destination:(req,file,cb)=>{
        cb(null,folderName)
    },
    filename:(req,file,cb)=>{
        cb(null,Date.now()+file.originalname) //25555588881.jpg //25555588891.jpg
    }
 
}) 
   
  return  multer({storage:storage})

}

module.exports={fileUpload}