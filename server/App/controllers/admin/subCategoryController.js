const { categoryModel } = require("../../models/category.model");
const { subcategoryModel } = require("../../models/subCategory.model");


let subcategoryCreate = async (req, res) => {
  let insertObj = { ...req.body }; // { parentCategory:'menId' subcategoryName: 'Topwear', subcategoryOrder: '1' }
  //req.file
  if (req.file) {
    if (
      req.file.filename != "" &&
      req.file.filename != null &&
      req.file.filename != undefined
    ) {
      insertObj["subcategoryImage"] = req.file.filename;
    }
  }
  try {
    let subcategory = await subcategoryModel(insertObj);
    let subcategoryRes = await subcategory.save();

    // let subcategoryRes=await subcategoryModel.insertOne(inserObj)
    res.send({
      _status: true,
      _message: "subcategory Added",
      subcategoryRes,
    });
  } catch (err) {
    //MongoServerError //unique

    //  console.log(err);
    let error = {};
    //
    if (err.code == "11000") {
      // unique
      error["subcategoryName"] = "subcategory name alredy exist...";
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
let subcategoryView = async (req, res) => {
  // let filtersubCategory = { {subCategoryName:"red"} }; // ==
  // let filtersubCategory =  {subCategoryName: new RegExp("e","i") } ; // Like

  // let filtersubCategory =  {subCategoryOrder: { $gte:1 } } ; // Grenter Then

  let filtersubCategory = { deletedAt: null }; // Or

  let data = await subcategoryModel
  .find(filtersubCategory)
  .populate('parentCategory','categoryName');
  res.send({
   
    _status: true,
    _message: "subCategory Found",
     path:process.env.SUBCATEGORYIMAGESTATICPATH,
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

let subcategoryDelete = async (req, res) => {
  //Soft Delete | Update
  let { id } = req.params;
  let softDelRes = await subcategoryModel.updateOne(
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
    _message: "subCategory Deleted",
    softDelRes,
  });
};

let multiDelete = async (req, res) => {
  let { ids } = req.body; //Array
  let softDelRes = await subcategoryModel.updateMany(
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
    _message: "subCategory Deleted",
    softDelRes,
  });
};

let subcategoryUpdate = async (req, res) => {
  let { id } = req.body;
  let updateObj = {
    subcategoryName,
    subcategoryCode,
    subcategoryOrder,
  };
  let updateRes = await subcategoryModel.updateOne(
    { _id: id },
    {
      $set: updateObj,
    }
  );
  res.send({
    _status: true,
    _message: "subCategory Updated",
    updateRes,
  });
};

let changeStatus = async (req, res) => {
  let { ids } = req.body; //[10,20,30]
  //              //691f23937cd920ae63974d07 = subcategoryStatus  =false
  //              //6920753b9511fa6a246d24b5  = subcategoryStatus  =true

  let updateRes = await subcategoryModel.updateMany(
    { _id: ids }, //Condition
    [
      {
        $set: {
          subcategoryStatus: {
            $not: "$subCategoryStatus",
          },
        },
      },
    ]
  );
  res.send({
    _status: true,
    _message: "subCategory Status Chnaged",
    updateRes,
  });
};
module.exports = {
  subcategoryCreate,
  subcategoryView,
  subcategoryDelete,
  multiDelete,
  changeStatus,
  subcategoryUpdate,
  parentCategory
};
