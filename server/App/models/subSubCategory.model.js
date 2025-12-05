let mongoose = require("mongoose");

let subSubcategorySchema = mongoose.Schema({
    subSubcategoryName: { // T-Shirts
        type: String,
       
        required: [true, 'subSubcategory Name is required'],
        minlength: [3, 'subSubcategory Name must be at least 3 characters long'],
        maxlength: [50, 'subSubcategory Name cannot exceed 20 characters'],
        validate: {
            validator: async function(v) {
                const subSubcategory = await this.constructor.findOne({ subSubcategoryName: v,deletedAt:null });
                return !subSubcategory;
            },
            message: props => `The specified subSubcategory is already in use.`
        }

      
    },
    parentCategory:{ //men - id
        type: mongoose.Schema.Types.ObjectId, //Object Id,
        ref:"category"
    },
    subCategory:{ //Topwear - id
        type: mongoose.Schema.Types.ObjectId, //Object Id,
        ref:"subcategory"
    },
    subSubcategoryImage: String, 
    subSubcategoryOrder: Number,
    isDeleted:{
        type:Boolean,
        default:false
    },
    deletedAt:{
        type:Date,
        default:null
    },
    

    subSubcategoryStatus: {
        type: Boolean,
        default: true
    }
   
});




let subSubcategoryModel = mongoose.model("subSubcategory", subSubcategorySchema);
module.exports = { subSubcategoryModel };