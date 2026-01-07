const { categoryModel } = require("../../models/category.model");
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

let megaMenu=async (req,res)=>{
    let categoryData = await categoryModel.find().select(['categoryName','slug'])
    .populate({
        path: 'subcategories',
        select:["subcategoryName"],
        populate: { path: 'subsubcategories' , select:["subSubcategoryName"] }
    })
    let resObj = {
        _status: 1,
        categoryData
    }

    res.send(resObj)
}


module.exports = {
  productTabs,
  megaMenu
};