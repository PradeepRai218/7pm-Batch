let mongoose=require("mongoose")
let materialSchema=mongoose.Schema(
    {
        materialName:{
            type:String,
            required: [ true, 'material Name Is required'],
            minLength:3,
            maxLength:20,
            unique:[true,"material Name Already Exist.."]
        },
        materialOrder:Number,
        materialStatus:{
            type:Boolean,
            default:true
        }
    }
)

let materialModel=mongoose.model("material",materialSchema)
module.exports={materialModel}

