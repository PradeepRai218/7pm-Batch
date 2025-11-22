const { colorModel } = require("../../models/color.model");

let colorCreate = async (req, res) => {
  let { colorName, colorCode, colorOrder } = req.body;

  let inserObj = {
    colorName,
    colorCode,
    colorOrder,
  };

  try {
    let color = await colorModel(inserObj);
    let colorRes = await color.save();

    // let colorRes=await colorModel.insertOne(inserObj)
    res.send({
      _status: true,
      _message: "Color Added",
      colorRes,
    });
  } catch (err) {
    //MongoServerError //unique

    //  console.log(err);
    let error = {};
    //
    if (err.code == "11000") {
      // unique
      error["colorName"] = "color name alredy exist...";
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

let colorView = async (req, res) => {
  // let filterColor = { {colorName:"red"} }; // ==
  // let filterColor =  {colorName: new RegExp("e","i") } ; // Like

    // let filterColor =  {colorOrder: { $gte:1 } } ; // Grenter Then

     let filterColor = { deletedAt:null } ; // Or

  let data = await colorModel.find(filterColor);
  res.send({
    _status: true,
    _message: "Color Found",
    data,
  });
};

let colorDelete = async (req, res) => {
  //Soft Delete | Update
  let { id } = req.params;
  let softDelRes = await colorModel.updateOne(
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
    _message: "Color Deleted",
    softDelRes,
  });
};

let multiDelete = async (req, res) => {
  let { ids } = req.body; //Array
  let softDelRes = await colorModel.updateMany(
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
    _message: "Color Deleted",
    softDelRes,
  });
};

let colorUpdate = async (req, res) => {
  let { id } = req.body;
  let updateObj = {
    colorName,
    colorCode,
    colorOrder,
  };
  let updateRes = await colorModel.updateOne(
    { _id: id },
    {
      $set: updateObj,
    }
  );
  res.send({
    _status: true,
    _message: "Color Updated",
    updateRes,
  });
};
module.exports = { colorCreate, colorView, colorDelete, multiDelete,colorUpdate };
