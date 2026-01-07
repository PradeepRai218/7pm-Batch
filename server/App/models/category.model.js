let mongoose = require("mongoose");

let categorySchema = mongoose.Schema({
    categoryName: {
        type: String,
        match: [/^[A-Za-z\s]+$/, 'category Name should contain only alphabets (A-Z, a-z)'],
        required: [true, 'category Name is required'],
        minlength: [3, 'category Name must be at least 3 characters long'],
        maxlength: [20, 'category Name cannot exceed 20 characters'],
        validate: {
            validator: async function(v) {
                const category = await this.constructor.findOne({ categoryName: v,deletedAt:null });
                return !category;
            },
            message: props => `The specified category is already in use.`
        }

      
    },

    categoryImage: String,
    categoryOrder: Number,
    isDeleted:{
        type:Boolean,
        default:false
    },
    slug:{
        type:String
    },
    deletedAt:{
        type:Date,
        default:null
    },
    

    categoryStatus: {
        type: Boolean,
        default: true
    }
   
});


categorySchema.virtual('subcategories', {
    ref: 'subcategory',
    localField: '_id',
    foreignField: 'parentCategory'
});


categorySchema.set('toJSON', { virtuals: true });



let categoryModel = mongoose.model("category", categorySchema);
module.exports = { categoryModel };