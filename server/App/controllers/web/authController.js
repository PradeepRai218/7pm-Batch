const { transporter } = require("../../config/mainConfig");
const bcrypt = require("bcrypt");
const { userModel } = require("../../models/user.model");
const saltRounds = 10;
let myOTP = new Map();
let sendOtp = async (req, res) => {
  let obj = { ...req.body };
  console.log(obj);

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

let login =async (req, res) => {
  let { userEmail, userPassword } = req.body;

  let userCheck=await  userModel.findOne({userEmail}) //data{} 

  if(userCheck){
        let dbPassword=userCheck.userPassword

       if(bcrypt.compareSync(userPassword, dbPassword)){
        return res.send({
            message: "LOGIN SUCCESSFUL",
            status: true,
            userCheck
          });
       } 
       else{
        return res.send({
            message: "INVALID PASSWORD",
            status: false,
          });
       }
  }
  else{
    return res.send({
        message: "Invalid Email",
        status: false,
      });
  }

  
};

module.exports = { sendOtp, createUser, login };
