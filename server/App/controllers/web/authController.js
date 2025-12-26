const { transporter } = require("../../config/mainConfig");
const bcrypt = require("bcrypt");
const { userModel } = require("../../models/user.model");
let jwt = require('jsonwebtoken');
const saltRounds = 10;
let myOTP = new Map();
let sendOtp = async (req, res) => {
  let obj = { ...req.body };
  console.log(obj);

  let checkUser = await userModel.findOne({ userEmail: obj.userEmail });

  if (checkUser) {
    res.send({
      message: "USER ALREADY EXISTS",
      status: false,
    });
  } else {
    let otp = Math.floor(Math.random() * 999999)
      .toString()
      .slice(0, 4); //9566

    myOTP.set("BACKENDOTP", otp); //Backend OTP STORE
    await transporter.sendMail({
      from: '"MONSTA WEB" <pradeep.9997@gmail.com>',
      to: obj.userEmail,
      subject: "OTP MAIL",
      text: "Hello world?", // Plain-text version of the message
      html: `<b>OTP ${otp} </b>`, // HTML version of the message
    });

    res.send({
      message: "OTP SENT SUCCESSFULLY",
      status: true,
    });
  }
};

let createUser = async (req, res) => {
  let { userName, userEmail, userPhone, userPassword, OTP } = { ...req.body };

  let backendOTP = myOTP.get("BACKENDOTP");

  if (backendOTP == OTP) {
    //CREATE USER
    const hash = bcrypt.hashSync(userPassword, saltRounds);

    let userOBJ = {
      userName,
      userEmail,
      userPhone,
      userPassword: hash,
    };
    try {
      let userData = new userModel(userOBJ);
      await userData.save();
      res.send({
        message: "USER CREATED SUCCESSFULLY",
        status: true,
      });
    } catch (err) {
      res.send({
        message: "USER CREATION FAILED",
        status: false,
        error: err.message,
      });
    }
  } else {
    res.send({
      message: "INVALID OTP",
      status: false,
    });
  }
};

let login = async (req, res) => {
  let { userEmail, userPassword } = req.body;

  let userCheck = await userModel.findOne({ userEmail }); //data{}

  if (userCheck) {
    let dbPassword = userCheck.userPassword;



    if (bcrypt.compareSync(userPassword, dbPassword)) {

      var token = jwt.sign({ userID: userCheck._id }, process.env.TOKENKEY);

      return res.send({
        message: "LOGIN SUCCESSFUL",
        status: true,
        token
       
      });
    } else {
      return res.send({
        message: "INVALID PASSWORD",
        status: false,
      });
    }
  } else {
    return res.send({
      message: "Invalid Email",
      status: false,
    });
  }
};


let changePassword=async (req,res)=>{

  console.log(req.body);
  let {oldPassword,newPassword,confirmPassword}=req.body
  let token=req.headers.authorization.split(" ")[1];

  
  var decoded = jwt.verify(token, process.env.TOKENKEY);
  
  let {userID}=decoded


  let userData=await  userModel.findOne({_id:userID})
  let dbPassword=userData.userPassword //DB Password

  if (bcrypt.compareSync(oldPassword, dbPassword)) {
    if(newPassword===confirmPassword){
      const hash = bcrypt.hashSync(newPassword, saltRounds); //Pradeep321
      await userModel.updateOne({_id:userID},{userPassword:hash})
      return res.send({
        message: "PASSWORD CHANGED SUCCESSFULLY",
        status: true,
      });
    }
    else{
      return res.send({
        message: "NEW PASSWORD AND CONFIRM PASSWORD DO NOT MATCH",
        status: false,
      });
    }

  }
  else{
    return res.send({
      message: "INVALID OLD PASSWORD",
      status: false,
    });
  }
  
}

module.exports = { sendOtp, createUser, login,changePassword };
