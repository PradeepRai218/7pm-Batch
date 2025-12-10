let mongoose = require("mongoose");

let productSchema = mongoose.Schema({
  productName: {
    type: String,

    required: [true, "product Name is required"],
    minlength: [3, "product Name must be at least 3 characters long"],
    maxlength: [50, "product Name cannot exceed 20 characters"],
    validate: {
      validator: async function (v) {
        const product = await this.constructor.findOne({
          productName: v,
          deletedAt: null,
        });
        return !product;
      },
      message: (props) => `The specified product is already in use.`,
    },
  },
  parentCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "category",
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subcategory",
  },
  subsubCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "subSubcategory",
  },
  productMeterial: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "material",
    },
  ],
  productColor: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "color",
    },
  ],
  prodcutType: {
    type: String,

    enum: ["1", "2", "3"],
  },
  prodcutBestSelling: Boolean,
  prodcutTopRated: Boolean,
  prodcutIsUpsell: Boolean,
  productPrice: Number,
  productSalePrice: Number,
  productStock: Number,
  productDescription: String,
  productImage: String,
  productbackImage: String,
  productGallery: Array,
  productOrder: Number,
  isDeleted: {
    type: Boolean,
    default: false,
  },
  deletedAt: {
    type: Date,
    default: null,
  },

  productStatus: {
    type: Boolean,
    default: true,
  },
});

let productModel = mongoose.model("product", productSchema);
module.exports = { productModel };
