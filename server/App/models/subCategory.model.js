let mongoose = require("mongoose");

let subcategorySchema = mongoose.Schema({
    subcategoryName: {
        type: String,
       
        required: [true, 'subcategory Name is required'],
        minlength: [3, 'subcategory Name must be at least 3 characters long'],
        maxlength: [50, 'subcategory Name cannot exceed 20 characters'],
        validate: {
            validator: async function(v) {
                const subcategory = await this.constructor.findOne({ subcategoryName: v,deletedAt:null });
                return !subcategory;
            },
            message: props => `The specified subcategory is already in use.`
        }

      
    },
    parentCategory:{
        type: mongoose.Schema.Types.ObjectId, //Object Id,
        ref:"category"
    },
    subcategoryImage: String,
    subcategoryOrder: Number,
    isDeleted:{
        type:Boolean,
        default:false
    },
    deletedAt:{
        type:Date,
        default:null
    },
    

    subcategoryStatus: {
        type: Boolean,
        default: true
    }
   
});

subcategorySchema.virtual('subsubcategories', {
    ref: 'subSubcategory',
    localField: '_id',
    foreignField: 'subCategory'
});

subcategorySchema.set('toJSON', { virtuals: true });


let subcategoryModel = mongoose.model("subcategory", subcategorySchema);
module.exports = { subcategoryModel };