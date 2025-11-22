let mongoose = require("mongoose");

let colorSchema = mongoose.Schema({
    colorName: {
        type: String,
        match: [/^[A-Za-z\s]+$/, 'Color Name should contain only alphabets (A-Z, a-z)'],
        required: [true, 'Color Name is required'],
        minlength: [3, 'Color Name must be at least 3 characters long'],
        maxlength: [20, 'Color Name cannot exceed 20 characters'],
        validate: {
            validator: async function(v) {
                const color = await this.constructor.findOne({ colorName: v,deletedAt:null });
                return !color;
            },
            message: props => `The specified color is already in use.`
        }

      
    },

    colorCode: {
        type: String,
       
        required: [true, 'Color Code is required'],
        minlength: [3, 'Color Code must be at least 3 characters long'],
        maxlength: [20, 'Color Code cannot exceed 20 characters'],

      
      
    },
    colorOrder: Number,
    isDeleted:{
        type:Boolean,
        default:false
    },
    deletedAt:{
        type:Date,
        default:null
    },
    

    colorStatus: {
        type: Boolean,
        default: true
    }
   
});




let colorModel = mongoose.model("color", colorSchema);
module.exports = { colorModel };