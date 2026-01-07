let jwt = require("jsonwebtoken");
const { cartModel } = require("../../models/cart.model");

let addToCart = (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  var decoded = jwt.verify(token, process.env.TOKENKEY);
  let { userID } = decoded;
  let obj = { ...req.body, userID };
  let cartData = new cartModel(obj);
  cartData.save();
  res.send({
    _status: true,
    _message: "Product added to cart successfully",
  });
};

let viewCart =async (req, res) => {
  let token = req.headers.authorization.split(" ")[1];
  var decoded = jwt.verify(token, process.env.TOKENKEY);
  let { userID } = decoded;
 
  let cartData = await cartModel.find({userID})
    res.send({  
    _status: true,
    _message: "Cart data fetched successfully",
    cartData
    })
};

let changeQty =async (req, res) => {
    let {cartId,quantity}=req.body;

 
  let cartData = await cartModel.updateOne({_id:cartId},{productQuantity:quantity})
    res.send({  
    _status: true,
    _message: "Cart Qty updated successfully",
    
    })
};

let deleteCart =async (req, res) => {
    let {cartId}=req.body;

 
  let cartData = await cartModel.deleteOne({_id:cartId})
    res.send({  
    _status: true,
    _message: "Cart Item deleted successfully",
    
    })
};



module.exports = { addToCart,viewCart,changeQty,deleteCart };
