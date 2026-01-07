const { productModel } = require("../../models/productModel");

let productDetails=async (req,res)=>{
    let {slug}=req.params;

    
    let productDetails=await productModel.findOne({_id:slug}).populate("parentCategory", "categoryName")
    .populate("subCategory", "subcategoryName")
    .populate("subsubCategory", "subSubcategoryName")
    .populate("productColor", "colorName");
    res.send({
        _status:true,
        _message:"product Found",
        productDetails,
        path:process.env.PRODUCTIMAGESTATICPATH
    });

}

module.exports={productDetails}