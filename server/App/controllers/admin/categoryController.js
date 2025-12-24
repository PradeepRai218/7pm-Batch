const { createSlug } = require("../../config/helper");
const { categoryModel } = require("../../models/category.model");

let categoryCreate = async (req, res) => {
  let insertObj = { ...req.body }; // { categoryName: 'Men', categoryOrder: '1' }
  //req.file
  if (req.file) {
    if (
      req.file.filename != "" &&
      req.file.filename != null &&
      req.file.filename != undefined
    ) {
      insertObj["categoryImage"] = req.file.filename;
    }
  }

  insertObj['slug']=createSlug(req.body.categoryName)


  try {
    let category = await categoryModel(insertObj);
    let categoryRes = await category.save();

    // let categoryRes=await categoryModel.insertOne(inserObj)
    res.send({
      _status: true,
      _message: "category Added",
      categoryRes,
    });
  } catch (err) {
    //MongoServerError //unique

    //  console.log(err);
    let error = {};
    //
    if (err.code == "11000") {
      // unique
      error["categoryName"] = "category name alredy exist...";
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
let categoryView = async (req, res) => {
  // let filterCategory = { {CategoryName:"red"} }; // ==
  // let filterCategory =  {CategoryName: new RegExp("e","i") } ; // Like

  // let filterCategory =  {CategoryOrder: { $gte:1 } } ; // Grenter Then

  let filterCategory = { deletedAt: null }; // Or

  let data = await categoryModel.find(filterCategory);
  res.send({
   
    _status: true,
    _message: "Category Found",
     path:process.env.CATEGORYIMAGESTATICPATH,
    data,
  });
};

let categoryDelete = async (req, res) => {
  //Soft Delete | Update
  let { id } = req.params;
  let softDelRes = await categoryModel.updateOne(
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
    _message: "Category Deleted",
    softDelRes,
  });
};

let multiDelete = async (req, res) => {
  let { ids } = req.body; //Array
  let softDelRes = await categoryModel.updateMany(
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
    _message: "Category Deleted",
    softDelRes,
  });
};

let categoryUpdate = async (req, res) => {
  let { id } = req.body;
  let updateObj = {
    categoryName,
    categoryCode,
    categoryOrder,
  };
  let updateRes = await categoryModel.updateOne(
    { _id: id },
    {
      $set: updateObj,
    }
  );
  res.send({
    _status: true,
    _message: "Category Updated",
    updateRes,
  });
};

let changeStatus = async (req, res) => {
  let { ids } = req.body; //[10,20,30]
  //              //691f23937cd920ae63974d07 = categoryStatus  =false
  //              //6920753b9511fa6a246d24b5  = categoryStatus  =true

  let updateRes = await categoryModel.updateMany(
    { _id: ids }, //Condition
    [
      {
        $set: {
          categoryStatus: {
            $not: "$CategoryStatus",
          },
        },
      },
    ]
  );
  res.send({
    _status: true,
    _message: "Category Status Chnaged",
    updateRes,
  });
};
module.exports = {
  categoryCreate,
  categoryView,
  categoryDelete,
  multiDelete,
  changeStatus,
  categoryUpdate,
};
