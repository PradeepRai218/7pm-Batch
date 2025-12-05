const { categoryModel } = require("../../models/category.model"); //parent Data
const { subcategoryModel } = require("../../models/subCategory.model");
 //Sub Category
const { subSubcategoryModel } = require("../../models/subSubCategory.model");


let subSubcategoryCreate = async (req, res) => {
  let insertObj = { ...req.body }; // { parentCategory:'menId' subSubcategoryName: 'Topwear', subSubcategoryOrder: '1' }
  //req.file
  if (req.file) {
    if (
      req.file.filename != "" &&
      req.file.filename != null &&
      req.file.filename != undefined
    ) {
      insertObj["subSubSubcategoryImage"] = req.file.filename;
    }
  }
  try {
    let subSubcategory = await subSubcategoryModel(insertObj);
    let subSubcategoryRes = await subSubcategory.save();

    // let subSubcategoryRes=await subSubcategoryModel.insertOne(inserObj)
    res.send({
      _status: true,
      _message: "subSubcategory Added",
      subSubcategoryRes,
    });
  } catch (err) {
    //MongoServerError //unique

    //  console.log(err);
    let error = {};
    //
    if (err.code == "11000") {
      // unique
      error["subSubcategoryName"] = "subSubcategory name alredy exist...";
    }
    for (let key in err.errors) {
      error[key] = err.errors[key].message;
      console.log(key, err.errors[key].message);
    }

    res.send({
      _status: false,
      _message: "Error Found",
      error,
    });
  }
};
let subSubcategoryView = async (req, res) => {
  // let filtersubSubCategory = { {subSubCategoryName:"red"} }; // ==
  // let filtersubSubCategory =  {subSubCategoryName: new RegExp("e","i") } ; // Like

  // let filtersubSubCategory =  {subSubCategoryOrder: { $gte:1 } } ; // Grenter Then

  let filtersubSubCategory = { deletedAt: null }; // Or

  let data = await subSubcategoryModel
  .find(filtersubSubCategory)
  .populate('parentCategory','categoryName')
  .populate('subCategory','subcategoryName');


  res.send({
   
    _status: true,
    _message: "subSubCategory Found",
     path:process.env.SUBSubCATEGORYIMAGESTATICPATH,
    data,
  });
};

let parentCategory= async (req,res)=>{
     let data = await categoryModel
  .find({categoryStatus:true}).select('categoryName')
  
  res.send({
   
    _status: true,
    _message: "Parent Category Found",
    
    data,
  });
}



let subCategory=async (req, res) => {

    let {parentid}=req.params;

       let data = await subcategoryModel
  .find({subcategoryStatus:true,parentCategory:parentid}).select('subcategoryName')
  
  res.send({
   
    _status: true,
    _message: "Sub Category Found",
    
    data,
  });
}

let subSubcategoryDelete = async (req, res) => {
  //Soft Delete | Update
  let { id } = req.params;
  let softDelRes = await subSubcategoryModel.updateOne(
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
    _message: "subSubCategory Deleted",
    softDelRes,
  });
};

let multiDelete = async (req, res) => {
  let { ids } = req.body; //Array
  let softDelRes = await subSubcategoryModel.updateMany(
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
    _message: "subSubCategory Deleted",
    softDelRes,
  });
};

let subSubcategoryUpdate = async (req, res) => {
  let { id } = req.body;
  let updateObj = {
    subSubcategoryName,
    subSubcategoryCode,
    subSubcategoryOrder,
  };
  let updateRes = await subSubcategoryModel.updateOne(
    { _id: id },
    {
      $set: updateObj,
    }
  );
  res.send({
    _status: true,
    _message: "subSubCategory Updated",
    updateRes,
  });
};

let changeStatus = async (req, res) => {
  let { ids } = req.body; //[10,20,30]
  //              //691f23937cd920ae63974d07 = subSubcategoryStatus  =false
  //              //6920753b9511fa6a246d24b5  = subSubcategoryStatus  =true

  let updateRes = await subSubcategoryModel.updateMany(
    { _id: ids }, //Condition
    [
      {
        $set: {
          subSubcategoryStatus: {
            $not: "$subSubCategoryStatus",
          },
        },
      },
    ]
  );
  res.send({
    _status: true,
    _message: "subSubCategory Status Chnaged",
    updateRes,
  });
};
module.exports = {
  subSubcategoryCreate,
  subCategory,
  subSubcategoryView,
  subSubcategoryDelete,
  multiDelete,
  changeStatus,
  subSubcategoryUpdate,
  parentCategory
};
