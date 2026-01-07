let mongoose = require("mongoose");

let cartSchema = mongoose.Schema({
  productId: String,
  productName: String,
  productImage: String,
  productPrice: Number,
  productQuantity: Number,
  userID: {
    type: mongoose.Schema.Types.ObjectId, 
    ref: "user",
  },
});

let cartModel = mongoose.model("cart", cartSchema);
module.exports = { cartModel };
