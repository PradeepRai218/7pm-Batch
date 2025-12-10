const { categoryModel } = require("../../models/category.model"); //parent Data
const { colorModel } = require("../../models/color.model");
const { productModel } = require("../../models/productModel");
const { subcategoryModel } = require("../../models/subCategory.model");
const { subSubcategoryModel } = require("../../models/subSubCategory.model");
//Sub Category

let productCreate = async (req, res) => {
  res.send("Hello");
};
let productView = async (req, res) => {
  // let filterproduct = { {productName:"red"} }; // ==
  // let filterproduct =  {productName: new RegExp("e","i") } ; // Like

  // let filterproduct =  {productOrder: { $gte:1 } } ; // Grenter Then

  let filterproduct = { deletedAt: null }; // Or

  let data = await productModel
    .find(filterproduct)
    .populate("parentCategory", "categoryName")
    .populate("subCategory", "subcategoryName");

  res.send({
    _status: true,
    _message: "product Found",
    path: process.env.productIMAGESTATICPATH,
    data,
  });
};

let parentCategory = async (req, res) => {
  let data = await categoryModel
    .find({ categoryStatus: true })
    .select("categoryName");

  res.send({
    _status: true,
    _message: "Parent Category Found",

    data,
  });
};

let subCategory = async (req, res) => {
  let { parentid } = req.params;

  let data = await subcategoryModel
    .find({ subcategoryStatus: true, parentCategory: parentid })
    .select("subcategoryName");

  res.send({
    _status: true,
    _message: "Sub Category Found",

    data,
  });
};

let subsubCategory = async (req, res) => {
  let { parentid } = req.params; //69304b9a214db644a52a5e9e

  let data = await subSubcategoryModel
    .find({ subSubcategoryStatus: true, subCategory: parentid })
    .select("subSubcategoryName");

  res.send({
    _status: true,
    _message: "Sub sub Category Found",

    data,
  });
};

let getColor= async (req, res) => {

  let data = await colorModel
    .find({ colorStatus: true })
    .select("colorName");

  res.send({
    _status: true,
    _message: "Color Found",

    data,
  });
};



let productDelete = async (req, res) => {
  //Soft Delete | Update
  let { id } = req.params;
  let softDelRes = await productModel.updateOne(
    { _id: id },
    {
      $set: {
        isDeleted: true,
        deletedAt: Date.now(),
      },
    }
  );

  res.send({
    _status: true,
    _message: "product Deleted",
    softDelRes,
  });
};

let multiDelete = async (req, res) => {
  let { ids } = req.body; //Array
  let softDelRes = await productModel.updateMany(
    { _id: ids }, //ids Array
    {
      $set: {
        isDeleted: true,
        deletedAt: Date.now(),
      },
    }
  );

  res.send({
    _status: true,
    _message: "product Deleted",
    softDelRes,
  });
};

let productUpdate = async (req, res) => {
  let { id } = req.body;
  let updateObj = {
    productName,
    productCode,
    productOrder,
  };
  let updateRes = await productModel.updateOne(
    { _id: id },
    {
      $set: updateObj,
    }
  );
  res.send({
    _status: true,
    _message: "product Updated",
    updateRes,
  });
};

let changeStatus = async (req, res) => {
  let { ids } = req.body; //[10,20,30]
  //              //691f23937cd920ae63974d07 = productStatus  =false
  //              //6920753b9511fa6a246d24b5  = productStatus  =true

  let updateRes = await productModel.updateMany(
    { _id: ids }, //Condition
    [
      {
        $set: {
          productStatus: {
            $not: "$productStatus",
          },
        },
      },
    ]
  );
  res.send({
    _status: true,
    _message: "product Status Chnaged",
    updateRes,
  });
};
module.exports = {
  productCreate,
  subCategory,
  productView,
  productDelete,
  multiDelete,
  changeStatus,
  productUpdate,
  parentCategory,
  subsubCategory,
  getColor
};
