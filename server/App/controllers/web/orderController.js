let jwt = require("jsonwebtoken");
const Razorpay = require('razorpay')
const orderModel = require("../../models/orderModel");
const { cartModel } = require("../../models/cart.model");

const razorpayInstance = new Razorpay({
    key_id: 'rzp_test_WAft3lA6ly3OBc', // Get from your Dashboard
    key_secret: '68E17CNWY8SemCvZ6ylOkuOY', // Get from your Dashboard
  });
  

let createOrder= async(req,res)=>{
    let token = req.headers.authorization.split(" ")[1];
    var decoded = jwt.verify(token, process.env.TOKENKEY);
    let { userID } = decoded;
    let orderObj={...req.body}
    
    if(orderObj.paymentMethod==1){
        orderObj['userID']=userID
        orderObj['orderStatus']="process"
        let order=new orderModel(orderObj)
        let data= await order.save()
        await cartModel.deleteMany({userID})

        res.send({
            _status:1,
            _message:"Order Placed",
            data
        })
    }
    else{
        //Online payment
        orderObj['userID']=userID
        let order=new orderModel(orderObj)
        let data= await order.save() //Db Create
        //
        let razObj={
            amount: orderObj.orderAmount*100, 
            currency: "INR",
            receipt:data.OrderID
        }
        const razOrder = await razorpayInstance.orders.create(razObj); // razorpay Order Create
       
       await orderModel.updateOne({_id:order._id},{
        $set:{
            razorpayOrderId:razOrder.id
        }
       })
        res.send(
            {
                _status:true,
                razOrder
            }
        )

    }
    res.send("order placed")
    
}

module.exports={createOrder}