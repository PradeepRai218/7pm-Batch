const { productModel } = require("../../models/productModel");


let productTabs = async (req, res) => {
    let filter={productStatus:true};
    if(req.query.type){
        filter.prodcutType=req.query.type; 
    }
    let product =await productModel.find(filter)
    res.send({
        _status:true,
        _message:"Product Tabs Fetched",
        path:process.env.PRODUCTIMAGESTATICPATH,
        data:product
    });

}



module.exports = {
  productTabs,
};